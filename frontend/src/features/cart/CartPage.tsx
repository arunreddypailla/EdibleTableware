import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../constants/products';
import type { User } from '../../types';
import { useCart } from './CartContext';

type Props = {
  user: User | null;
  onLoginRequired: () => void;
};

export function CartPage({ user, onLoginRequired }: Props) {
  const navigate = useNavigate();
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="page-content centered-page">
        <div className="status-box">Your cart is empty. Start building your eco tableware order.</div>
      </main>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      onLoginRequired();
      return;
    }

    navigate('/checkout');
  };

  return (
    <main className="page-content cart-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Your cart</span>
          <h2>Ready for checkout</h2>
        </div>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <strong>{formatPrice(item.price)}</strong>
              </div>

              <div className="cart-controls">
                <div className="quantity-picker">
                  <button type="button" onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <button type="button" className="text-button" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="checkout-summary section-card">
          <h3>Order summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <strong>{subtotal > 799 ? 'Free' : formatPrice(49)}</strong>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>{formatPrice(subtotal > 799 ? subtotal : subtotal + 49)}</strong>
          </div>

          <button type="button" className="primary-btn checkout-link" onClick={handleCheckout}>
            Proceed to checkout
          </button>
        </aside>
      </div>
    </main>
  );
}
