export async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 300 },
      // optional but helps with some hosts/APIs:
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!res.ok) {
      console.error("fetchProducts failed:", res.status, res.statusText);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("fetchProducts error:", err);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories", {
      cache: "force-cache",
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("fetchCategories error:", err);
    return [];
  }
}
