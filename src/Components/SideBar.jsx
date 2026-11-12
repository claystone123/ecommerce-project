import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, BarChart3, Settings, X } from "lucide-react";

export const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/discounts", label: "Discounts", icon: Tag },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const linkClass = ({ isActive }) =>
  `flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E9A23B] ${
    isActive
      ? "bg-white/10 font-medium text-white"
      : "text-white/70 hover:bg-white/5 hover:text-white"
  }`;

function SidebarLink({ item, onClose }) {
  const { to, label, icon: Icon, end } = item;
  return (
    <NavLink to={to} end={end} onClick={onClose} className={linkClass}>
      {({ isActive }) => (
        <>
          <Icon size={18} className={isActive ? "text-[#E9A23B]" : ""} />
          {label}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ open, onClose }) {
  const main = NAV_ITEMS.slice(0, -1);
  const settings = NAV_ITEMS[NAV_ITEMS.length - 1];

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#12332F] text-white transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <NavLink to="/" className="text-lg font-semibold tracking-tight">
            Shop<span className="text-[#E9A23B]">Hub</span>
          </NavLink>
          <button onClick={onClose} className="lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {main.map((item) => (
            <SidebarLink key={item.to} item={item} onClose={onClose} />
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <SidebarLink item={settings} onClose={onClose} />
        </div>
      </aside>
    </>
  );
}
