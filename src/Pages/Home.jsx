import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import Pagination, { paginate } from "../Components/Pagination";
import products from "../data/products";

function ProductSection({ title, items, pageSize, resetKey, onAddToCart }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / pageSize);

  useEffect(() => setPage(1), [resetKey]);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

      {items.length === 0 ? (
        <p className="text-sm text-slate-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {paginate(items, page, pageSize).map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
}

export default function Home() {
  // Search text comes from the URL (?q=shoes). Ann's SearchBar only needs to set "q".
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  const matches = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(query)),
    [query]
  );
  const bestProducts = useMemo(() => matches.filter((p) => p.rating >= 4.5), [matches]);

  // TODO Ann: replace with addToCart from CartContext
  const handleAddToCart = (product) => console.log("Add to cart:", product.name);

  return (
    <div className="space-y-12">
      <ProductSection
        title="Product"
        items={matches}
        pageSize={8}
        resetKey={query}
        onAddToCart={handleAddToCart}
      />
      <ProductSection
        title="Best Product"
        items={bestProducts}
        pageSize={4}
        resetKey={query}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
