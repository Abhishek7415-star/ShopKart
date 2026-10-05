
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error("Unable to load products");
        }

        const data = await response.json();
        setProducts((data.products || []).slice(0, 4));
      } catch (err) {
        console.error("Featured products error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="featured-section">
      <div className="featured-container">
        <div className="featured-heading">
          <div>
            <span className="featured-eyebrow">
              OUR COLLECTION
            </span>

            <h2>
              Featured <span>Products</span>
            </h2>

            <p>
              Discover handpicked favourites for your everyday needs.
            </p>
          </div>

          <Link to="/products" className="featured-view-all">
            View All Products <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div className="featured-message">
            <div className="featured-loader"></div>
            <p>Loading amazing products...</p>
          </div>
        ) : error ? (
          <div className="featured-message">
            <p>Products load nahi ho paaye. Please try again.</p>
            <Link to="/products" className="featured-retry-btn">
              Browse Products
            </Link>
          </div>
        ) : products.length > 0 ? (
          <div className="featured-grid">
            {products.map((product, index) => (
              <div
                className="featured-item"
                key={product._id}
                style={{ "--card-index": index }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="featured-message">
            <p>Abhi koi product available nahi hai.</p>
            <Link to="/products" className="featured-retry-btn">
              Explore Products
            </Link>
          </div>
        )}

        <div className="featured-bottom">
          <span>✦</span>
          <p>Find your favourites. Love every purchase.</p>
          <span>✦</span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;