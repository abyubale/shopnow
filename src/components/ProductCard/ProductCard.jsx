import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import route from "../../routes/route.json";
import { addItem } from "../AddSubItem/AddSubSlice";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { UserDataContext } from "../../contexts/UserDataContexts";

const ProductCard = ({ title, imgsrc, rating, price, productID }) => {
  const dispatch = useDispatch();

  const { ToastShowHandler, showToast } = useContext(UserDataContext);

  const cardStyle = {
    maxWidth: "300px",
    padding: "20px",
    backgroundColor: "#ddd",
    color: "black",
    border: "4px solid #000",
    display: "inline-block",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    margin: "10px",
  };

  const imgStyle = {
    height: "200px",
    width: "100%",
    objectFit: "cover",
    marginBottom: "10px",
  };

  const titleStyle = {
    margin: "10px 0",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#000",
  };

  const ratingStyle = {
    marginBottom: "5px",
    fontSize: "1rem",
    color: "#555",
  };

  const priceStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  return (
    <div style={cardStyle}>
      <img src={imgsrc} style={imgStyle} alt={title} />
      <NavLink to={`/${route.PRODUCTS}/${productID}`} style={titleStyle}>
        {title}
      </NavLink>
      <p style={ratingStyle}>Rating: {rating}</p>
      <p style={priceStyle}>Price: $ {price}</p>
      <div>
        <Button
          variant="warning"
          disabled={showToast}
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
