import { useContext } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import route from "../../routes/route.json";
import { addItem } from "../AddSubItem/addSubSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { UserDataContext } from "../../contexts/UserDataContexts";
import styles from "./ProductCard.module.css";

const ProductCard = ({ title, imgsrc, rating, price, productID }) => {
  const dispatch = useDispatch();
  const { ToastShowHandler, showToast } = useContext(UserDataContext);

  return (
    <div className={styles.cardContainer}>
      <NavLink
        to={`/${route.PRODUCTS}/${productID}`}
        className={styles.productTitle}
      >
        <img src={imgsrc} className={styles.productImage} alt={title} />
        {title}
      </NavLink>
      <p className={styles.productRating}>Rating: {rating}</p>
      <p className={styles.productPrice}>Price: $ {price}</p>
      <div>
        <Button
          variant="warning"
          disabled={showToast}
          className={styles.addToCartButton}
          onClick={() => {
            ToastShowHandler();
            dispatch(addItem({ id: productID, title, price, imgsrc }));
          }}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string,
  imgsrc: PropTypes.string,
  rating: PropTypes.number,
  price: PropTypes.number,
  productID: PropTypes.number,
};

export default ProductCard;
