
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import CartItem from '../components/CartItem';

function Cart() {
  const { cart, total } = useContext(CartContext);

  return (
    <div>
      <h1>My Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <h2>Total: KSh {total}</h2>
        </>
      )}
    </div>
  );
}

export default Cart;
