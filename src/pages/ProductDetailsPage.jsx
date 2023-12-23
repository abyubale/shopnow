import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";

const ProductDetailsPage = () => {
  const { pid } = useParams();
  return (
    <>
      <h2 className="text-center m-3">ProductDetails</h2>
      <div
        className="d-flex justify-content-center"
        style={{ minHeight: "70vh" }}
      >
        <ProductDetails productId={pid} />
      </div>
    </>
  );
};

export default ProductDetailsPage;
