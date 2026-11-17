
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div>
      <h3>{item.name}</h3>

      <p>Price: KSh {item.price}</p>

      <button
        onClick={() =>
          updateQuantity(item.id, item.quantity - 1)
        }
        disabled={item.quantity <= 1}
      >
        -
      </button>

      <span>{item.quantity}</span>

      <button
        onClick={() =>
          updateQuantity(item.id, item.quantity + 1)
        }
      >
        +
      </button>

      <p>
        Subtotal: KSh {item.price * item.quantity}
      </p>

      <button onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
