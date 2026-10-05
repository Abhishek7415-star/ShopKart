
import { Link } from "react-router-dom";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="wishlist-page">
      <div className="wishlist-heading">
        <FaHeart className="wishlist-heading-icon" />
        <div>
          <h1>My Wishlist</h1>
          <p>Your favourite products, all in one place.</p>
        </div>
      </div>

      <p className="wishlist-count">
        {wishlistItems.length} product(s) saved
      </p>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <FaHeart className="empty-heart" />
          <h2>Your Wishlist is Empty</h2>
          <p>Save your favourite products by clicking the heart icon.</p>
          <Link to="/products" className="wishlist-shop-btn">
            Explore Products →
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <div className="wishlist-card" key={product._id}>
              <Link to={`/products/${product._id}`}>
                <img src={product.image} alt={product.name} />
              </Link>

              <div className="wishlist-card-info">
                <h3>{product.name}</h3>
                <p className="wishlist-price">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

                <div className="wishlist-actions">
                  <button
                    className="wishlist-add-cart"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>

                  <button
                    className="wishlist-remove"
                    onClick={() => removeFromWishlist(product._id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    title="Remove from Wishlist"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;