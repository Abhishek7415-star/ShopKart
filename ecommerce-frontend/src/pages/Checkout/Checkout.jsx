
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: { from: "/checkout" },
      });
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity || 1,
          })),
          shippingAddress: {
            address: form.address,
            city: form.city,
            state: form.state,
            postalCode: form.postalCode,
            country: form.country,
          },
          paymentMethod: "Cash on Delivery",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to place order.");
      }

      clearCart();
      setOrderSuccess(data.order);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you, {form.fullName}! Your order has been received.</p>
        <p>
          Order ID: <strong>{orderSuccess._id}</strong>
        </p>
        <p>Payment Method: Cash on Delivery</p>
        <button onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products before checkout.</p>
        <button onClick={() => navigate("/products")}>
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-heading">
        <h1>Checkout</h1>
        <p>Complete your delivery details to place your order.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery Address</h2>

          <label>Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label>Mobile Number</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            pattern="[0-9]{10}"
            title="Enter a 10-digit mobile number"
            required
          />

          <label>Full Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="House number, street, area"
            required
          />

          <div className="checkout-form-row">
            <div>
              <label>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>State</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="checkout-form-row">
            <div>
              <label>PIN Code</label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]{6}"
                title="Enter a 6-digit PIN code"
                required
              />
            </div>

            <div>
              <label>Country</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="checkout-payment">
            <h3>Payment Method</h3>
            <label className="cod-option">
              <input type="radio" checked readOnly />
              Cash on Delivery (COD)
            </label>
            <p>Pay when your order is delivered.</p>
          </div>

          {error && <p className="checkout-error">{error}</p>}

          <button
            className="place-order-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="checkout-summary-item" key={item._id}>
              <div>
                <strong>{item.name}</strong>
                <p>Quantity: {item.quantity || 1}</p>
              </div>

              <span>
                ₹
                {(Number(item.price) * (item.quantity || 1)).toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
          ))}

          <div className="checkout-total">
            <span>Total Amount</span>
            <strong>
              ₹{Number(totalPrice).toLocaleString("en-IN")}
            </strong>
          </div>

          <p className="checkout-secure">
            🔒 Secure order processing
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;