
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Please add products to your cart first!");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty 🛒</h2>
          <p>Looks like you haven't added anything yet.</p>

          <Link to="/products">
            <button className="shop-btn">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h3>{item.name}</h3>

                  <p className="cart-price">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </p>

                  <div className="qty-box">
                    <button
                      type="button"
                      onClick={() => decreaseQty(item._id)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQty(item._id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="item-subtotal">
                  ₹
                  {(
                    Number(item.price) * Number(item.quantity)
                  ).toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h2>
              Total: ₹{Number(totalPrice).toLocaleString("en-IN")}
            </h2>

            <div className="cart-actions">
              <button
                type="button"
                className="clear-btn"
                onClick={clearCart}
              >
                Empty Cart
              </button>

              <button
                type="button"
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;