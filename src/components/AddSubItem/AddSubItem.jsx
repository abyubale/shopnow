import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeItem } from "./AddSubSlice";
import PropTypes from "prop-types";

const AddSubItem = ({ quantity, id }) => {
  const dispatch = useDispatch();

  const buttonStyle = {
    fontSize: "1rem",
    padding: "5px 10px",
    marginBottom: "5px",
  };

  const deleteButtonStyle = {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div className="m-3 p-2 d-flex flex-column align-items-center">
      <div className="d-flex">
        <Button
          style={buttonStyle}
          className="me-2"
          onClick={() => dispatch(decreaseQuantity({ id }))}
        >
          -
        </Button>
        <span style={{ fontSize: "1rem", margin: "0 10px" }}>{quantity}</span>
        <Button
          style={buttonStyle}
          className="ms-2"
          onClick={() => dispatch(increaseQuantity({ id }))}
        >
          +
        </Button>
      </div>
      <button
        style={deleteButtonStyle}
        onClick={() => dispatch(removeItem({ id }))}
      >
        <i className="bi bi-trash-fill fs-4 text-dark"></i>
      </button>
    </div>
  );
};

AddSubItem.propTypes = {
  quantity: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default AddSubItem;
