import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsClient from "@/components/ProductsClient";
import {  fetchCategories } from "@/lib/api";

export default async function Page() {
  // const [products, categories] = await Promise.all([
  //   fetchProducts(),
  //   fetchCategories(),
  // ]);
  // const products = await fetchProducts();
  const categories = await fetchCategories();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Discover Our Products",
    description:
      "SSR product listing page with filter sidebar and responsive grid.",
  };

  return (
    <>
      <Header />

      <main className="page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <section className="hero">
          <h1 className="hero__title">DISCOVER OUR PRODUCTS</h1>
          <p className="hero__desc">
            Browse curated products with a variety of Categories.
          </p>
        </section>
        {/* ✅ Client-side filter + sort */}

        <ProductsClient products={[]} categories={categories} />
      </main>

      <Footer />
    </>
  );
}
