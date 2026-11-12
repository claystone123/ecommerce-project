import { Star } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  const { name, image, rating = 0, price } = product;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="aspect-square bg-slate-100">
        {image && <img src={image} alt={name} className="h-full w-full object-cover" />}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-slate-900">{name}</h3>

        <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={14}
              className={n <= Math.round(rating) ? "fill-[#E9A23B] text-[#E9A23B]" : "text-slate-300"}
            />
          ))}
        </div>

        <p className="text-base font-semibold text-slate-900">${price.toFixed(2)}</p>

        <button
          onClick={() => onAddToCart?.(product)}
          className="mt-auto rounded-md bg-[#12332F] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d2724] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E9A23B]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
