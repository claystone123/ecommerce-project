import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar, { NAV_ITEMS } from "./SideBar";
import TopBar from "./TopBar";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const title = NAV_ITEMS.find((n) => n.to === pathname.replace(/\/$/, ""))?.label ?? "";

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title={title} onMenuClick={() => setMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
