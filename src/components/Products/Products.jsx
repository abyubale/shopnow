import { useEffect, useState } from "react";
import { getProductDetails } from "../../services/getProductDetails";
import ProductCard from "../ProductCard/ProductCard";
import { Spinner } from "react-bootstrap";

const Products = () => {
  const [productDetails, SetProductDetails] = useState([{}]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsLoader(true);
    setIsError(false);
    getProductDetails()
      .then((data) => {
        SetProductDetails(data);
        setIsLoader(false);
      })
      .catch(() => {
        setIsLoader(false);
        setIsError(true);
      });
  }, []);

  const product = productDetails.map((data, index) => {
    if (data.category === `men's clothing` || data.category === "jewelery") {
      return (
        <ProductCard
          key={index}
          title={data.title}
          imgsrc={data.image}
          rating={data.rating && data.rating.rate}
          price={data.price}
          productID={data.id}
        />
      );
    }
    return null;
  });

  return (
    <>
      {isLoader && (
        <div>
          <Spinner
            animation="border"
            role="status"
            style={{ width: "200px", height: "200px", marginTop: "50px" }}
          ></Spinner>
        </div>
      )}

      {isError && (
        <p className="text-danger fs-4 mt-5">
          Something Went Wrong Please Try Again Later !!!
        </p>
      )}
      {!isLoader && !isError && product}
    </>
  );
};

export default Products;
