export async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store", // SSR on every request
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories", {
    cache: "force-cache", // categories rarely change
  });
  if (!res.ok) return [];
  return res.json();
}
