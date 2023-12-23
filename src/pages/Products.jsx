import AllProducts from "../components/AllProducts/AllProducts";

const Products = () => {
  return (
    <div style={{ minHeight: "80vh" }}>
      <h2 className="text-center m-3">Products</h2>
      <div className="d-flex justify-content-center">
        <div
          className="d-flex justify-content-center"
          style={{
            height: "fit-content",
            flexWrap: "wrap",
            maxWidth: "1400px",
          }}
        >
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default Products;
