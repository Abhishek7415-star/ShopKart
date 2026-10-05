import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
    </div>
  );
};

export default ProductDetails;