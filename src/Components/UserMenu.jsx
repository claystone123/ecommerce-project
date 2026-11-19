
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="font-medium text-slate-700 hover:text-[#12332F]"
        >
          Sign In
        </Link>

        <Link
          to="/register"
          className="rounded-md bg-[#12332F] px-4 py-2 font-medium text-white hover:bg-[#0d2724]"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="font-semibold text-slate-800">{user.name}</p>
        <p className="text-xs capitalize text-slate-500">{user.role}</p>
      </div>

      {user.role === "admin" && (
        <Link
          to="/admin"
          className="rounded-md border px-3 py-2 text-sm font-medium"
        >
          Admin
        </Link>
      )}

      <button
        onClick={handleLogout}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
