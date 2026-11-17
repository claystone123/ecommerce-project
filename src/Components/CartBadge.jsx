
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { CartContext } from '../Context/CartContext.jsx';

function CartBadge() {
  const { cart } = useContext(CartContext);

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Link to="/cart" className="relative inline-flex items-center p-2">
      <ShoppingBag size={24} />

      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

export default CartBadge;
