
import { useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaCheck } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [added, setAdded] = useState(false);

  const wishlisted = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div className="product-card">
      <button
        type="button"
        className={`wishlist ${wishlisted ? "wishlisted" : ""}`}
        onClick={handleWishlist}
        aria-label={
          wishlisted ? "Remove from wishlist" : "Add to wishlist"
        }
        title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <FaHeart />
      </button>

      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p className="price">
        ₹{Number(product.price).toLocaleString("en-IN")}
      </p>

      <div className="rating">⭐⭐⭐⭐☆</div>

      <div className="buttons">
        <Link to={`/products/${product._id}`}>
          <button className="details-btn">
            View Details
          </button>
        </Link>

        <button
          className={`cart-btn ${added ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {added ? (
            <>
              <FaCheck style={{ marginRight: "6px" }} />
              Added ✓
            </>
          ) : (
            <>
              <FaShoppingCart style={{ marginRight: "6px" }} />
              Add Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;