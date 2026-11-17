
import { useState, useContext } from 'react';
import { CartContext } from '../Context/CartContext.jsx';

function Checkout() {
  const { cart, total, removeFromCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    payment: ''
  });

  const [order, setOrder] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: formData,
      items: [...cart],
      total: total,
      date: new Date().toLocaleString()
    };

    const savedOrders = JSON.parse(
      localStorage.getItem('orders') || '[]'
    );

    savedOrders.push(newOrder);

    localStorage.setItem(
      'orders',
      JSON.stringify(savedOrders)
    );

    cart.forEach((item) => removeFromCart(item.id));

    setOrder(newOrder);
  };

  if (order) {
    return (
      <div>
        <h1>🎉 Order Confirmed!</h1>

        <p>Thank you, {order.customer.name}!</p>

        <p>Your order has been placed successfully.</p>

        <p>Order Number: {order.id}</p>

        <p>Total: KSh {order.total}</p>

        <p>Payment: {order.customer.payment}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          pattern="0[0-9]{9}"
          required
        />

        <br /><br />

        <label>Delivery Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Payment Method</label>
        <select
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          required
        >
          <option value="">Select payment</option>
          <option value="M-Pesa">M-Pesa</option>
          <option value="Cash on Delivery">
            Cash on Delivery
          </option>
        </select>

        <br /><br />

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
