import { useContext, useEffect, useState } from "react";
import { getProductDetails } from "../../services/getProductDetails";
import PropTypes from "prop-types";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemByCount,
  decreaseQuantityByCount,
  increaseQuantityByCount,
} from "../AddSubItem/addSubSlice";
import { UserDataContext } from "../../contexts/UserDataContexts";
import { useNavigate } from "react-router-dom";
import route from "../../routes/route.json";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.addsub.quantity);
  const navigate = useNavigate();

  const { ToastShowHandler, showToast, isUser } = useContext(UserDataContext);

  useEffect(() => {
    setIsLoader(true);
    setIsError(false);
    getProductDetails(productId)
      .then((res) => {
        setIsLoader(false);
        setProduct(res);
      })
      .catch(() => {
        setIsLoader(false);
        setIsError(true);
      });
  }, [productId]);

  const buyNowBtnHandler = () => {
    if (!isUser) {
      navigate(`/${route.LOGIN}`);
    } else {
      navigate(`/${route.ORDERSUCCESS}`);
    }
  };

  const containerStyle = {
    maxWidth: "100%",
    padding: "20px",
  };

  const imageContainerStyle = {
    width: "100%",
    textAlign: "center",
  };

  const imageStyle = {
    width: "50%",
    height: "auto",
    marginBottom: "15px",
    display: "inline-block",
  };

  const quantityContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0",
  };

  const quantityButtonStyle = {
    fontSize: "1.5rem",
    padding: "5px 10px",
    marginBottom: "5px",
    marginRight: "20px",
  };

  const descriptionStyle = {
    marginTop: "20px",
    fontSize: "1.2rem",
  };

  return (
    <div style={containerStyle}>
      {isLoader && (
        <div style={{ textAlign: "center" }}>
          <Spinner
            animation="border"
            role="status"
            style={{
              width: "50px",
              height: "50px",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          ></Spinner>
        </div>
      )}

      {isError && (
        <p
          style={{
            color: "red",
            fontSize: "1rem",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Something went wrong. Please try again later.
        </p>
      )}

      {!isLoader && !isError && (
        <div>
          <div style={imageContainerStyle}>
            <img src={product.image} style={imageStyle} alt={product.title} />
          </div>
          <div>
            <p
              style={{
                fontSize: "1.5rem",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {product.title}
            </p>
            <div style={quantityContainerStyle}>
              <span
                style={{
                  fontSize: "1rem",
                  marginBottom: "5px",
                  marginRight: "20px",
                }}
              >
                Quantity
              </span>
              <Button
                style={quantityButtonStyle}
                onClick={() => dispatch(decreaseQuantityByCount())}
              >
                -
              </Button>
              <span
                style={{
                  fontSize: "1rem",
                  marginBottom: "5px",
                  marginRight: "20px",
                }}
              >
                {count}
              </span>
              <Button
                style={quantityButtonStyle}
                onClick={() => dispatch(increaseQuantityByCount())}
              >
                +
              </Button>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                variant="warning"
                style={{ margin: "0px 20px" }}
                onClick={() => {
                  dispatch(
                    addItemByCount({
                      id: +productId,
                      title: product.title,
                      price: product.price,
                      imgsrc: product.image,
                    })
                  );

                  ToastShowHandler();
                }}
                disabled={showToast}
              >
                Add to Cart
              </Button>
              <Button
                variant="success"
                style={{ margin: "0px 20px" }}
                onClick={buyNowBtnHandler}
              >
                Buy now
              </Button>
            </div>
          </div>
          <p style={descriptionStyle}>{product.description}</p>
        </div>
      )}
    </div>
  );
};

ProductDetails.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductDetails;
