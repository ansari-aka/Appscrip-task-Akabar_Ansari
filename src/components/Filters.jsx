"use client";

export default function Filters({
  categories = [],
  filters,
  setFilters,
  shownCount,
  totalCount,
}) {
  const setField = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const reset = () =>
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
    });

  return (
    <div className="filters">
      <div className="filters__top">
        <p className="muted">
          Showing <b>{shownCount}</b> of <b>{totalCount}</b>
        </p>
        <button className="btnLink" type="button" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="filterBlock">
        <h3 className="filterTitle">SEARCH</h3>
        <input
          className="input"
          value={filters.search}
          onChange={(e) => setField("search", e.target.value)}
          placeholder="Search..."
        />
      </div>

      <div className="filterBlock">
        <h3 className="filterTitle">CATEGORY</h3>
        <select
          className="input"
          value={filters.category}
          onChange={(e) => setField("category", e.target.value)}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="filterBlock">
        <h3 className="filterTitle">PRICE</h3>
        <div className="row2">
          <input
            className="input"
            type="number"
            value={filters.minPrice}
            onChange={(e) => setField("minPrice", e.target.value)}
            placeholder="Min"
          />
          <input
            className="input"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setField("maxPrice", e.target.value)}
            placeholder="Max"
          />
        </div>
      </div>

      <div className="filterBlock">
        <h3 className="filterTitle">MIN RATING</h3>
        <select
          className="input"
          value={filters.minRating}
          onChange={(e) => setField("minRating", e.target.value)}
        >
          <option value="">Any</option>
          <option value="4">4+</option>
          <option value="3">3+</option>
          <option value="2">2+</option>
        </select>
      </div>
    </div>
  );
}
