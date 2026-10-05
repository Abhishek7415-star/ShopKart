
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge">
          ✨ Best Deals <span>•</span> Latest Collection
        </div>

        <h1>
          Welcome to
          <br />
          <span>ShopKart</span>
        </h1>

        <p className="hero-description">
          Discover the latest fashion, electronics, mobiles
          and accessories at unbeatable prices.
        </p>

        <div className="hero-features">
          <div>
            <span className="feature-icon">🚚</span>
            <div>
              <strong>Free Shipping</strong>
              <small>On your orders</small>
            </div>
          </div>

          <div>
            <span className="feature-icon">🔒</span>
            <div>
              <strong>Secure Shopping</strong>
              <small>Shop with confidence</small>
            </div>
          </div>
        </div>

        <div className="hero-actions">
          <Link to="/products" className="hero-shop-btn">
            Shop Now <span>→</span>
          </Link>

          <Link to="/products" className="hero-explore-btn">
            Explore Products
          </Link>
        </div>

        <div className="hero-trust">
          <span className="trust-stars">★★★★★</span>
          <span>Everything you need, in one place</span>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-image-circle"></div>

        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=85"
            alt="Shopping and fashion collection"
          />
        </div>

        <div className="floating-card floating-card-top">
          <div className="floating-icon">🎧</div>
          <div>
            <strong>Trending Products</strong>
            <p>Discover something new</p>
          </div>
        </div>

        <div className="floating-card floating-card-bottom">
          <div className="floating-icon">🛍️</div>
          <div>
            <strong>Great Deals</strong>
            <p>Find your favourites</p>
          </div>
        </div>

        <div className="hero-decoration hero-decoration-one"></div>
        <div className="hero-decoration hero-decoration-two"></div>
      </div>
    </section>
  );
};

export default Hero;