import { Link } from 'react-router-dom';
import { formatPrice } from '../../constants/products';
import type { Product } from '../../types';

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart }: Props) {
  return (
    <article className="product-card" key={product.id}>
      <div className="product-image-wrap">
        <span className="product-badge">{product.badge}</span>
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-body">
        <div className="meta-row">
          <span>{product.category}</span>
          <span>★ {product.rating}</span>
        </div>

        <Link to={`/product/${product.id}`} className="product-link">
          <h3>{product.name}</h3>
        </Link>

        <p>{product.description}</p>
        <div className="price-row">
          <div className="price-stack">
            <strong>{formatPrice(product.price)}</strong>
            <span>{formatPrice(product.originalPrice)}</span>
            {typeof product.bulkPrice === 'number' && (
              <small className="bulk-price-tag">Bulk from {formatPrice(product.bulkPrice)} / pc</small>
            )}
          </div>
          <button type="button" onClick={() => onAddToCart(product)}>
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
