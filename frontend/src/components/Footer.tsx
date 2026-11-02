import { Link } from 'react-router-dom';

const shopLinks = [
  { to: '/#shop', label: 'Best sellers', detail: 'Signature cups & cutlery' },
  { to: '/#shop', label: 'Cups', detail: 'Hot, cold & smoothie-ready' },
  { to: '/checkout', label: 'Packaging kits', detail: 'Event-ready bundle sets' },
];

const companyLinks = [
  { to: '/#story', label: 'About', detail: 'Crafted for cleaner dining' },
  { to: '/#benefits', label: 'Sustainability', detail: 'Low-waste materials' },
  { to: '/#contact', label: 'Contact', detail: 'Talk to our team' },
];

const helpLinks = [
  { to: '/#bundles', label: 'Shipping', detail: 'Fast fulfilment for orders' },
  { to: '/checkout', label: 'Bulk orders', detail: 'Cafés, events & hotels' },
  { to: '/checkout', label: 'Support', detail: 'Order help & custom quotes' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="brand footer-brand">
        <div className="brand-mark footer-mark" aria-hidden="true">
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="brandGradientFooter" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#A7D9B0" />
                <stop offset="48%" stopColor="#4A9B71" />
                <stop offset="100%" stopColor="#1F513D" />
              </linearGradient>
            </defs>
            <rect x="4" y="4" width="56" height="56" rx="18" fill="#F8F3EA" />
            <path d="M18 18h28v8H27v7h17v8H27v7h19v8H18z" fill="url(#brandGradientFooter)" />
            <path d="M39 15c6 0 11 5 11 11 0 9-8 13-15 19-3-5-5-9-5-13 0-8 4-17 9-17z" fill="#EACD8D" opacity="0.9" />
            <path d="M42 21c4 0 7 3 7 7 0 5-4 9-9 13-2-3-4-6-4-9 0-6 3-11 6-11z" fill="#F7EED8" />
            <path d="M31 12c3 3 3 9 1 13-2 6-7 12-13 15 5 0 10-2 14-7 4-5 4-13 0-21z" fill="#CFE8D1" opacity="0.9" />
          </svg>
        </div>
        <div className="brand-text">
          <span>Edible Tableware</span>
          <small>Biodegradable tableware</small>
        </div>
      </div>

      <div className="footer-links">
        <div className="footer-column">
          <h4>Shop</h4>
          {shopLinks.map((link) => (
            <Link key={link.label} to={link.to} className="footer-link-item">
              <span>{link.label}</span>
              <small>{link.detail}</small>
            </Link>
          ))}
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          {companyLinks.map((link) => (
            <Link key={link.label} to={link.to} className="footer-link-item">
              <span>{link.label}</span>
              <small>{link.detail}</small>
            </Link>
          ))}
        </div>
        <div className="footer-column">
          <h4>Help</h4>
          {helpLinks.map((link) => (
            <Link key={link.label} to={link.to} className="footer-link-item">
              <span>{link.label}</span>
              <small>{link.detail}</small>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
