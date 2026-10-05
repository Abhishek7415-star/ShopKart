import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaShoppingBag,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaUser,
  FaHome,
  FaBoxOpen,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const wishlistCount = wishlistItems.length;

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/products");
    }

    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setMenuOpen(false);

    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="shop-navbar">
      <div className="navbar-inner">

        {/* Logo */}
        <Link to="/home" className="shop-logo" onClick={closeMenu}>
          <span className="logo-icon">
            <FaShoppingBag />
          </span>

          <span className="logo-text">
            Shop<span>Kart</span>
            <small>SHOP SMART. LIVE BETTER.</small>
          </span>
        </Link>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <FaSearch className="search-icon" />

          <input
            type="search"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />

          <button type="submit">
            Search
          </button>
        </form>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation */}
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>

          {/* Home */}
          <Link to="/home" onClick={closeMenu}>
            <FaHome />
            <span>Home</span>
          </Link>

          {/* Products */}
          <Link to="/products" onClick={closeMenu}>
            <FaBoxOpen />
            <span>Products</span>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="nav-wishlist-link"
            onClick={closeMenu}
          >
            <span className="wishlist-icon-wrap">
              <FaHeart />

              {wishlistCount > 0 && (
                <span className="wishlist-badge">
                  {wishlistCount}
                </span>
              )}
            </span>

            <span>Wishlist</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="nav-cart-link"
            onClick={closeMenu}
          >
            <span className="cart-icon-wrap">
              <FaShoppingCart />

              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount}
                </span>
              )}
            </span>

            <span>Cart</span>
          </Link>

          {/* Login + Register */}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="nav-login"
                onClick={closeMenu}
              >
                <FaUser />
                <span>Login</span>
              </Link>

              <Link
                to="/register"
                className="nav-register"
                onClick={closeMenu}
              >
                Register <span>→</span>
              </Link>
            </>
          )}

          {/* Logout */}
          {isLoggedIn && (
            <button
              type="button"
              className="nav-logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;