"use client";

import { useEffect, useMemo, useState } from "react";
import Filters from "@/components/Filters";
import ProductGrid from "@/components/ProductGrid";

function normalize(s = "") {
  return s.toLowerCase().trim();
}

function filterProducts(products, f) {
  const s = normalize(f.search);

  return products.filter((p) => {
    const title = normalize(p.title);
    const desc = normalize(p.description);

    const matchSearch = !s || title.includes(s) || desc.includes(s);
    const matchCategory = !f.category || p.category === f.category;

    const matchMin = f.minPrice === "" || Number(p.price) >= Number(f.minPrice);
    const matchMax = f.maxPrice === "" || Number(p.price) <= Number(f.maxPrice);

    const rating = p?.rating?.rate ?? 0;
    const matchRating =
      f.minRating === "" || Number(rating) >= Number(f.minRating);

    return matchSearch && matchCategory && matchMin && matchMax && matchRating;
  });
}

function recommendedScore(p) {
  const rate = p?.rating?.rate ?? 0;
  const count = p?.rating?.count ?? 0;
  const price = Number(p.price) || 0;

  const popularity = Math.log10(count + 1);
  const pricePenalty = Math.log10(price + 10);

  return rate * 2.2 + popularity * 1.4 - pricePenalty * 0.3;
}

function sortProducts(list, sortKey) {
  const arr = [...list];

  switch (sortKey) {
    case "recommended":
      return arr.sort((a, b) => recommendedScore(b) - recommendedScore(a));
    case "price-low":
      return arr.sort((a, b) => a.price - b.price);
    case "price-high":
      return arr.sort((a, b) => b.price - a.price);
    case "rating-high":
      return arr.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
    case "most-reviewed":
      return arr.sort(
        (a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0)
      );
    default:
      return arr;
  }
}

export default function ProductsClient({
  products: initialProducts = [],
  categories = [],
}) {
  // ✅ local products state to support client-fetch fallback
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [loadError, setLoadError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
  });

  const [sortKey, setSortKey] = useState("recommended");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDesktopFilterVisible, setIsDesktopFilterVisible] = useState(true);

  // ✅ If SSR couldn't provide products (Netlify 403), fetch in browser
  useEffect(() => {
    let alive = true;

    async function load() {
      if (initialProducts.length > 0) return; // already have SSR data

      try {
        setLoading(true);
        setLoadError("");

        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`Products fetch failed (${res.status})`);

        const data = await res.json();
        if (!alive) return;

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!alive) return;
        setProducts([]);
        setLoadError("Products are temporarily unavailable.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [initialProducts.length]);

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  const finalList = useMemo(
    () => sortProducts(filtered, sortKey),
    [filtered, sortKey]
  );

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setIsFilterOpen(false);
    }
    if (isFilterOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFilterOpen]);

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);

  // ✅ lightweight states (minimal DOM)
  if (loading) {
    return (
      <section className="content loading" aria-label="Products">
        <p>Loading products…</p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="content emptyState" aria-label="Products">
        <h2>Products</h2>
        <p>{loadError || "No products found."}</p>
      </section>
    );
  }

  return (
    <section
      className={`layout ${
        isDesktopFilterVisible ? "layout--withFilter" : "layout--noFilter"
      }`}
    >
      {/* Desktop Sidebar */}
      <aside
        className={`sidebar sidebar--desktop ${
          isDesktopFilterVisible ? "" : "sidebar--hidden"
        }`}
        aria-label="Filters"
      >
        <Filters
          categories={categories}
          filters={filters}
          setFilters={setFilters}
          shownCount={finalList.length}
          totalCount={products.length}
        />
      </aside>

      <div className={`filterDrawer ${isFilterOpen ? "isOpen" : ""}`}>
        <div
          className="filterDrawer__overlay"
          onClick={() => setIsFilterOpen(false)}
        />
        <aside className="filterDrawer__panel">
          <div className="filterDrawer__header">
            <h3 className="filterDrawer__title">FILTERS</h3>
            <button className="iconBtn" onClick={() => setIsFilterOpen(false)}>
              ✕
            </button>
          </div>

          <Filters
            categories={categories}
            filters={filters}
            setFilters={setFilters}
            shownCount={finalList.length}
            totalCount={products.length}
          />

          <button className="applyBtn" onClick={() => setIsFilterOpen(false)}>
            APPLY
          </button>
        </aside>
      </div>

      <section className="content" aria-label="Products">
        <div className="toolbar">
          <span className="toolbar__count">{finalList.length} ITEMS</span>

          <button
            className="toolbar__toggleBtn"
            type="button"
            onClick={() => setIsDesktopFilterVisible((prev) => !prev)}
          >
            {isDesktopFilterVisible ? "HIDE FILTER" : "SHOW FILTER"}
          </button>

          <button
            className="toolbar__filterBtn"
            type="button"
            onClick={() => setIsFilterOpen(true)}
          >
            FILTER
          </button>

          <label className="toolbar__sort">
            <span className="sr-only">Sort</span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="recommended">RECOMMENDED</option>
              <option value="rating-high">RATING: HIGH TO LOW</option>
              <option value="most-reviewed">MOST REVIEWED</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </label>
        </div>

        <ProductGrid products={finalList} />
      </section>
    </section>
  );
}
