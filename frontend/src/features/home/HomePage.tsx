import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  benefits,
  bulkDiscountTiers,
  bulkOrderQuoteItems,
  bundles,
  categories,
  formatPrice,
  productCatalog,
  testimonials,
  volumeSensitivityRows,
} from '../../constants/products';
import { ProductCard } from '../catalog/ProductCard';
import { useCart } from '../cart/CartContext';

export function HomePage() {
  const { addToCart } = useCart();
  const featuredProducts = productCatalog.filter((product) => product.featured);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  const [orderQuantities, setOrderQuantities] = useState<Record<number, number>>(() =>
    Object.fromEntries(bulkOrderQuoteItems.map((item) => [item.id, item.suggestedQty]))
  );

  const quoteSummary = useMemo(() => {
    const subtotal = bulkOrderQuoteItems.reduce((sum, item) => {
      const qty = orderQuantities[item.id] ?? 0;
      return sum + qty * item.price;
    }, 0);

    const totalUnits = bulkOrderQuoteItems.reduce((sum, item) => {
      return sum + (orderQuantities[item.id] ?? 0);
    }, 0);

    const discountRate = bulkDiscountTiers.reduce((bestRate, tier) => {
      if (totalUnits >= tier.min) {
        return tier.rate;
      }
      return bestRate;
    }, 0);

    const discount = subtotal * discountRate;
    const finalAmount = subtotal - discount;

    return {
      subtotal,
      totalUnits,
      discount,
      discountRate,
      finalAmount,
    };
  }, [orderQuantities]);

  const updateQuantity = (productId: number, delta: number) => {
    setOrderQuantities((current) => {
      const nextValue = Math.max(0, (current[productId] ?? 0) + delta);
      return {
        ...current,
        [productId]: nextValue,
      };
    });
  };

  return (
    <main className="page-content">
      <section className="hero section-card">
        <div className="hero-copy">
          <span className="eyebrow">Nothing left but a smile</span>
          <h1>Tableware that leaves no waste: eat it, feed it, compost it.</h1>
          <p>
            Designed for cafés, caterers and hotels replacing single-use plastic with edible cups, cutlery and straws made from millet, wheat, rice and jaggery.
          </p>
          <div className="cta-row">
            <a href="#shop" className="primary-btn large-btn">
              Shop essentials
            </a>
            <Link to="/checkout" className="ghost-btn large-btn light-ghost">
              Explore bundles
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>B2B</strong>
              <span>first model</span>
            </div>
            <div>
              <strong>Plastic-free</strong>
              <span>compliant range</span>
            </div>
            <div>
              <strong>Weeks</strong>
              <span>to compost</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Featured product showcase">
          <div className="feature-card main-feature">
            <span className="feature-chip">Top pick</span>
            <div className="feature-plate">
              <img src={featuredProducts[0]?.image ?? '/images/edible-cups.jpeg'} alt={featuredProducts[0]?.name ?? 'Edible tableware'} />
            </div>
            <div className="feature-info">
              <h3>{featuredProducts[0]?.name}</h3>
              <div className="feature-row">
                <strong>{formatPrice(featuredProducts[0]?.price ?? 0)}</strong>
                <span>4.8 ★</span>
              </div>
            </div>
          </div>

          <div className="floating-note note-left">
            <span>New</span>
            <strong>Eco line</strong>
          </div>
          <div className="floating-note note-right">
            <span>Natural</span>
            <strong>5 items</strong>
          </div>
        </div>
      </section>

      <section id="story" className="editorial-story section-card">
        <div className="story-copy">
          <span className="eyebrow">Designed for a cleaner future</span>
          <h2>Luxury, utility and sustainability for food-service businesses that need a smarter answer to single-use plastic.</h2>
          <p>
            We build edible tableware for cafés, caterers and hotels with a cleaner promise: practical everyday use, honest animal-safe lines, and a full lifecycle that ends in food, feed or compost.
          </p>
          <Link to="/checkout" className="primary-btn large-btn">
            Build your order
          </Link>
        </div>

        <div className="story-metrics">
          <div className="story-metric-card">
            <span>Ingredient base</span>
            <strong>Millet, wheat, rice, jaggery</strong>
          </div>
          <div className="story-metric-card">
            <span>Best fit</span>
            <strong>Cafés, events, hotels</strong>
          </div>
          <div className="story-metric-card accent">
            <span>Brand promise</span>
            <strong>Nothing left but a smile</strong>
          </div>
        </div>
      </section>

      <section className="category-strip">
        {categories.map((category) => (
          <div className="category-pill" key={category.name}>
            <span>{category.icon}</span>
            {category.name}
          </div>
        ))}
      </section>

      <section className="product-showcase" id="shop">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Best sellers</span>
            <h2>Popular picks from our tableware range</h2>
          </div>
          <a href="#shop" className="view-link">
            View all
          </a>
        </div>

        <div className="product-grid">
          {productCatalog.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="bulk-quote-panel section-card">
        <div className="section-heading align-start">
          <div>
            <span className="eyebrow">Bulk order calculator</span>
            <h2>Estimate pricing for event, restaurant and hospitality orders.</h2>
          </div>
          <Link to="/checkout" className="view-link">
            Request a quote
          </Link>
        </div>

        <div className="bulk-quote-layout">
          <div className="quote-table-wrap">
            <div className="quote-table-header">
              <span>Item</span>
              <span>Unit price</span>
              <span>Qty</span>
              <span>Line total</span>
            </div>

            {bulkOrderQuoteItems.map((item) => {
              const quantity = orderQuantities[item.id] ?? 0;
              const lineTotal = quantity * item.price;

              return (
                <div className="quote-row" key={item.id}>
                  <div className="quote-item-name">
                    <strong>{item.name}</strong>
                    <small>{item.category}</small>
                  </div>
                  <span>{formatPrice(item.price)}</span>
                  <div className="qty-stepper" aria-label={`Adjust quantity for ${item.name}`}>
                    <button type="button" onClick={() => updateQuantity(item.id, -250)} aria-label={`Decrease ${item.name}`}>
                      −
                    </button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 250)} aria-label={`Increase ${item.name}`}>
                      +
                    </button>
                  </div>
                  <strong>{formatPrice(lineTotal)}</strong>
                </div>
              );
            })}
          </div>

          <aside className="quote-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal</span>
              <strong>{formatPrice(quoteSummary.subtotal)}</strong>
            </div>
            <div className="summary-line muted">
              <span>Discount ({(quoteSummary.discountRate * 100).toFixed(0)}%)</span>
              <strong>-{formatPrice(quoteSummary.discount)}</strong>
            </div>
            <div className="summary-total">
              <span>Total units</span>
              <strong>{quoteSummary.totalUnits.toLocaleString('en-IN')}</strong>
            </div>
            <div className="summary-total">
              <span>Final quote</span>
              <strong>{formatPrice(quoteSummary.finalAmount)}</strong>
            </div>
            <Link to="/checkout" className="primary-btn large-btn full-width-btn">
              Proceed to checkout
            </Link>
          </aside>
        </div>
      </section>

      <section className="volume-sensitivity-panel section-card">
        <div className="section-heading align-start">
          <div>
            <span className="eyebrow">Bulk order insights</span>
            <h2>How pricing improves with order size</h2>
          </div>
        </div>

        <div className="insight-summary-grid">
          {[
            { scenario: 'Small Event / Sample', quantity: 100, icon: '✨', profit: 150 },
            { scenario: 'Standard Café Order', quantity: 500, icon: '☕', profit: 550 },
            { scenario: 'Medium Event Caterer', quantity: 2000, icon: '🍽️', profit: 1800 },
            { scenario: 'Large Banquet / Festival', quantity: 5000, icon: '🎉', profit: 3500 },
            { scenario: 'Institutional Bulk Supply', quantity: 10000, icon: '🏢', profit: 7000 },
          ].map((row) => (
            <article key={row.scenario} className="insight-card">
              <div className="insight-card-top">
                <span className="insight-icon">{row.icon}</span>
                <span className="insight-label">{row.scenario}</span>
              </div>
              <strong>{row.quantity.toLocaleString('en-IN')} pcs</strong>
              <div className="insight-meta">
                <span>Volume tier</span>
                <span>{row.quantity >= 5000 ? 'High scale' : row.quantity >= 500 ? 'Growing' : 'Starter'}</span>
              </div>
              <div className="insight-metric">
                <small>Profit</small>
                <b>{formatPrice(row.profit)}</b>
              </div>
            </article>
          ))}
        </div>

        <div className="insight-bottom">
          <div className="insight-chart-wrap">
            <h3>Gross profit across order sizes</h3>
            <div className="mini-chart" aria-label="Gross profit chart">
              {volumeSensitivityRows.map((row, index) => (
                <div key={row.scenario} className="chart-column-wrap">
                  <span className="chart-value">{formatPrice(row.totalOrderProfit)}</span>
                  <div className="chart-column" style={{ height: `${Math.min(100, (row.totalOrderProfit / 7000) * 100)}%` }} />
                  <span className="chart-label">{['Small Event', 'Café Order', 'Event Caterer', 'Festival', 'Bulk Supply'][index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="insight-highlight-card">
            <span className="eyebrow">Strategic insight</span>
            <p>
              Larger order volumes improve profitability through better discount tiers, while keeping a healthy operating margin across bulk supply programs.
            </p>
          </div>
        </div>
      </section>

      <section id="benefits" className="benefits-panel">
        <div className="section-heading align-start">
          <div>
            <span className="eyebrow">Why choose us</span>
            <h2>Purpose-built for greener dining, serving and gifting.</h2>
          </div>
        </div>

        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.title}>
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="bundles" className="bundle-panel section-card">
        <div className="bundle-copy">
          <span className="eyebrow">Curated bundles</span>
          <h2>Smart bundles for homes, events and hospitality.</h2>
          <p>
            Mix practical serving essentials into ready-to-order packs for daily dining and large gatherings.
          </p>
        </div>

        <div className="bundle-grid">
          {bundles.map((bundle) => (
            <div className="bundle-card" key={bundle.name}>
              <div className="bundle-header">
                <span>{bundle.name}</span>
                <strong>{bundle.price}</strong>
              </div>
              <p>{bundle.items}</p>
              <Link to="/checkout" className="small-btn">
                Shop bundle
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonial-panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Testimonials</span>
            <h2>Our community keeps coming back</h2>
          </div>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.name}>
              <div className="stars">★★★★★</div>
              <p>“{item.quote}”</p>
              <strong>{item.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="newsletter section-card">
        <div>
          <span className="eyebrow">Stay updated</span>
          <h2>New eco tableware drops, seasonal offers and bulk order updates.</h2>
        </div>
        <form
          className="newsletter-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!newsletterEmail.trim()) {
              setNewsletterStatus('Please enter a valid email address.');
              return;
            }
            setNewsletterStatus('Thanks! You are subscribed for updates.');
            setNewsletterEmail('');
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            value={newsletterEmail}
            onChange={(event) => {
              setNewsletterEmail(event.target.value);
              if (newsletterStatus) {
                setNewsletterStatus(null);
              }
            }}
            required
          />
          <button type="submit" className="primary-btn">
            Join now
          </button>
        </form>
        {newsletterStatus && <p className="newsletter-status">{newsletterStatus}</p>}
      </section>
    </main>
  );
}
