import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../constants/products';
import type { CheckoutFormValues, User } from '../../types';
import { useCart } from '../cart/CartContext';
import { submitPayment } from './paymentService';

type Props = {
  user: User | null;
  onLoginRequired: () => void;
};

const defaultValues: CheckoutFormValues = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  paymentMethod: 'Card',
};

export function CheckoutPage({ user, onLoginRequired }: Props) {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [formValues, setFormValues] = useState<CheckoutFormValues>(defaultValues);
  const [status, setStatus] = useState<string | null>(null);

  if (!user) {
    return (
      <main className="page-content centered-page">
        <div className="status-box">
          <div>
            <p>Please login to proceed with your order.</p>
            <button type="button" className="primary-btn" onClick={onLoginRequired}>
              Login to continue
            </button>
          </div>
        </div>
      </main>
    );
  }

  const orderTotal = subtotal > 799 ? subtotal : subtotal + 49;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (items.length === 0) {
      setStatus('Your cart is empty.');
      return;
    }

    const response = await submitPayment({
      customerName: formValues.fullName,
      email: formValues.email,
      address: formValues.address,
      city: formValues.city,
      postalCode: formValues.postalCode,
      paymentMethod: formValues.paymentMethod,
      total: orderTotal,
      items,
    });

    setStatus(`${response.message} Ref: ${response.reference}`);
    clearCart();

    window.setTimeout(() => {
      navigate('/');
    }, 1800);
  };

  return (
    <main className="page-content checkout-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Checkout</span>
          <h2>Secure your order</h2>
        </div>
      </div>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form section-card">
          <label>
            Full name
            <input
              value={formValues.fullName}
              onChange={(event) => setFormValues({ ...formValues, fullName: event.target.value })}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={formValues.email}
              onChange={(event) => setFormValues({ ...formValues, email: event.target.value })}
              required
            />
          </label>

          <label>
            Delivery address
            <textarea
              value={formValues.address}
              onChange={(event) => setFormValues({ ...formValues, address: event.target.value })}
              required
            />
          </label>

          <div className="checkout-split">
            <label>
              City
              <input
                value={formValues.city}
                onChange={(event) => setFormValues({ ...formValues, city: event.target.value })}
                required
              />
            </label>
            <label>
              Postal code
              <input
                value={formValues.postalCode}
                onChange={(event) => setFormValues({ ...formValues, postalCode: event.target.value })}
                required
              />
            </label>
          </div>

          <label>
            Payment method
            <select
              value={formValues.paymentMethod}
              onChange={(event) =>
                setFormValues({
                  ...formValues,
                  paymentMethod: event.target.value as CheckoutFormValues['paymentMethod'],
                })
              }
            >
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </label>

          <button type="submit" className="primary-btn">
            Pay {formatPrice(orderTotal)}
          </button>
          {status && <p className="checkout-status">{status}</p>}
        </form>

        <aside className="checkout-summary section-card">
          <h3>Order summary</h3>
          {items.map((item) => (
            <div key={item.id} className="summary-row">
              <span>
                {item.name} × {item.quantity}
              </span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </div>
          ))}
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>{subtotal > 799 ? 'Free' : formatPrice(49)}</strong>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>{formatPrice(orderTotal)}</strong>
          </div>

          <Link to="/cart" className="ghost-btn checkout-link">
            Edit cart
          </Link>
        </aside>
      </div>
    </main>
  );
}
