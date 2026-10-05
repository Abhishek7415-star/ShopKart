
import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thanks for your interest in ShopKart!");
  };

  return (
    <footer className="shop-footer">
      <div className="footer-main">
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">
              <FaShoppingBag />
            </span>
            <span>
              Shop<span>Kart</span>
            </span>
          </Link>

          <p className="footer-description">
            Discover quality products at great prices.
            Your favourite shopping destination, all in one place.
          </p>

          <div className="footer-socials">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-column">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/products?search=mobile">Mobiles</Link></li>
            <li><Link to="/products?search=electronics">Electronics</Link></li>
            <li><Link to="/products?search=fashion">Fashion</Link></li>
            <li><Link to="/products?search=shoes">Shoes</Link></li>
            <li><Link to="/products">Explore More</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column footer-contact">
          <h3>Contact Us</h3>

          <p>
            <FaEnvelope />
            <span>support@shopkart.com</span>
          </p>

          <p>
            <FaPhoneAlt />
            <span>+91 00000 00000</span>
          </p>

          <p>
            <FaMapMarkerAlt />
            <span>India</span>
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <div className="footer-newsletter">
        <div>
          <h3>Stay in the loop!</h3>
          <p>Get updates about new products and special offers.</p>
        </div>

        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            required
          />
          <button type="submit" aria-label="Subscribe">
            Subscribe <FaArrowRight />
          </button>
        </form>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopKart. All Rights Reserved.</p>
        <p>Made with <span className="footer-heart">♥</span> for shoppers</p>
      </div>
    </footer>
  );
};

export default Footer;