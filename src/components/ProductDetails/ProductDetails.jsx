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
import style from "../ProductDetails/ProductDetails.module.css";

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

  return (
    <div className={style.containerStyle}>
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
          <div className={style.imageContainerStyle}>
            <img
              src={product.image}
              className={style.imageStyle}
              alt={product.title}
            />
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
            <div className={style.quantityContainerStyle}>
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
                className={style.quantityButtonStyle}
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
                className={style.quantityButtonStyle}
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
          <p className={style.descriptionStyle}>{product.description}</p>
        </div>
      )}
    </div>
  );
};

ProductDetails.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductDetails;
