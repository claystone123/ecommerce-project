import { Menu, Search, Bell, ShoppingBag } from "lucide-react";

export default function TopBar({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 lg:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <h1 className="hidden text-lg font-semibold text-slate-900 sm:block">{title}</h1>

      <div className="relative ml-auto w-full max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search products or orders"
          className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#12332F] focus:bg-white"
        />
      </div>

      <button className="relative rounded-md p-2 text-slate-600 hover:bg-slate-100" aria-label="Notifications">
        <Bell size={20} />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#E9A23B]" />
      </button>
      <button className="rounded-md p-2 text-slate-600 hover:bg-slate-100" aria-label="Cart">
        <ShoppingBag size={20} />
      </button>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#12332F] text-sm font-medium text-white">
        AD
      </div>
    </header>
  );
}