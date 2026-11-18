
import { Link } from 'react-router-dom';
import CartBadge from './CartBadge';

function ShopNav() {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow">
      <Link to="/" className="text-xl font-bold">
        ShopHub
      </Link>

      <div className="flex items-center gap-5">
        <Link to="/">Home</Link>

        <Link to="/cart">Cart</Link>

        <CartBadge />
      </div>
    </nav>
  );
}

export default ShopNav;
