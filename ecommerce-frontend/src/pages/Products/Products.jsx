
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const [search, setSearch] = useState(() => {
    return new URLSearchParams(location.search).get("search") || "";
  });

  const [category, setCategory] = useState("all");

  // Navbar se search query read karo
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get("search") || "");
  }, [location.search]);

  // Backend se products fetch karo
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Products fetch failed");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  // Search aur category filter
  const filteredProducts = products.filter((product) => {
    const searchMatch = (product.name || "")
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    const categoryMatch =
      category === "all" ||
      (product.category || "").toLowerCase() === category.toLowerCase();

    return searchMatch && categoryMatch;
  });

  return (
    <div className="products-page">
      <h1>All Products</h1>

      <div className="filter-box">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="mobile">Mobile</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>

      <p className="products-result-count">
        {filteredProducts.length} product(s) found
      </p>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <h2 style={{ textAlign: "center", gridColumn: "1 / -1" }}>
            No Products Found
          </h2>
        )}
      </div>
    </div>
  );
};

export default Products;