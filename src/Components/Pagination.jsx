import { ChevronLeft, ChevronRight } from "lucide-react";

// Slice a list down to the items on one page.
export function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

// Page numbers to show, with "..." for gaps, e.g. [1, "...", 4, 5, 6, "...", 10]
function getPages(page, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages = [1];
  if (page > 3) pages.push("...");
  for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) pages.push(p);
  if (page < totalPages - 2) pages.push("...");
  pages.push(totalPages);
  return pages;
}

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const btn =
    "flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E9A23B] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        className={`${btn} text-slate-600 hover:bg-slate-100`}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {getPages(page, totalPages).map((p, i) =>
        p === "..." ? (
          <span key={`gap-${i}`} className="px-1 text-slate-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${btn} ${
              p === page ? "bg-[#12332F] font-medium text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        className={`${btn} text-slate-600 hover:bg-slate-100`}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
