import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="brand footer-brand">
        <div className="brand-mark">E</div>
        <div className="brand-text">
          <span>Edible Tableware</span>
          <small>Eco tableware</small>
        </div>
      </div>

      <div className="footer-links">
        <div>
          <h4>Shop</h4>
          <Link to="/#shop">Best sellers</Link>
          <Link to="/#shop">Cups</Link>
          <Link to="/checkout">Packaging</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/#story">About</Link>
          <Link to="/#benefits">Sustainability</Link>
          <Link to="/#contact">Contact</Link>
        </div>
        <div>
          <h4>Help</h4>
          <Link to="/#bundles">Shipping</Link>
          <Link to="/checkout">Bulk Orders</Link>
          <Link to="/checkout">Support</Link>
        </div>
      </div>
    </footer>
  );
}
