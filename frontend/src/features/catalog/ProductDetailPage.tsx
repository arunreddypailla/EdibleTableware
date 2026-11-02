import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatPrice, productCatalog } from '../../constants/products';
import type { User } from '../../types';
import { useCart } from '../cart/CartContext';

type Props = {
  user: User | null;
  onLoginRequired: () => void;
};

export function ProductDetailPage({ user, onLoginRequired }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(
    () => productCatalog.find((item) => item.id === Number(id)),
    [id],
  );

  if (!product) {
    return (
      <main className="page-content centered-page">
        <div className="status-box">Product not found.</div>
      </main>
    );
  }

  const relatedProducts = productCatalog.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <main className="page-content product-detail-page">
      <Link to="/" className="link-back">
        ← Back to store
      </Link>

      <section className="product-detail section-card">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-copy">
          <span className="eyebrow">{product.badge}</span>
          <h1>{product.name}</h1>
          <div className="detail-meta">
            <span>{product.category}</span>
            <span>★ {product.rating} ({product.reviews} reviews)</span>
          </div>
          <p>{product.description}</p>

          <div className="detail-price-row">
            <div>
              <strong>{formatPrice(product.price)}</strong>
              <span>{formatPrice(product.originalPrice)}</span>
            </div>
            <div className="quantity-picker">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="detail-actions">
            <button type="button" className="primary-btn" onClick={() => addToCart(product, quantity)}>
              Add to cart
            </button>
            <button
              type="button"
              className="ghost-btn"
              onClick={() => {
                addToCart(product, quantity);
                if (!user) {
                  onLoginRequired();
                  return;
                }
                navigate('/checkout');
              }}
            >
              Buy now
            </button>
          </div>

          <ul className="detail-features">
            <li>Compostable and plastic-free</li>
            <li>Strong enough for hot meals, desserts and daily serving</li>
            <li>Ideal for cafes, events, corporate gifting and bulk orders</li>
          </ul>
        </div>
      </section>

      <section className="related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">You may also like</span>
            <h2>More serving essentials</h2>
          </div>
        </div>

        <div className="product-grid">
          {relatedProducts.map((item) => (
            <article key={item.id} className="product-card">
              <div className="product-image-wrap">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="product-body">
                <h3>{item.name}</h3>
                <div className="price-row">
                  <strong>{formatPrice(item.price)}</strong>
                  <Link to={`/product/${item.id}`} className="small-btn inline-button">
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
