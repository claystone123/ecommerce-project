
import { useEffect, useMemo, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import Pagination, { paginate } from "../Components/Pagination";
import { getProducts } from "../data/products";
import { CartContext } from "../Context/CartContext";

function ProductSection({ title, items, pageSize, resetKey, onAddToCart }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / pageSize);

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">
        {title}
      </h2>

      {items.length === 0 ? (
        <p className="text-sm text-slate-500">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {paginate(items, page, pageSize).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}

export default function Home() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState(() => getProducts());
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const query = (searchParams.get("q") ?? "")
    .trim()
    .toLowerCase();

  const matches = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(query)
      ),
    [products, query]
  );

  const bestProducts = useMemo(
    () => matches.filter((product) => product.rating >= 4.5),
    [matches]
  );

  const handleAddToCart = (product) => {
    addToCart(product);
  };

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
