import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import route from "../../routes/route.json";
import AddSubItem from "../AddSubItem/AddSubItem";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { UserDataContext } from "../../contexts/UserDataContexts";
import { emptyCart } from "../AddSubItem/addSubSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.addsub.items);
  const { isUser } = useContext(UserDataContext);
  const dispatch = useDispatch();

  let subTotal;

  if (cartData.length > 0) {
    subTotal = cartData
      .map((data) => data.price * data.quantity)
      .reduce((accum, currentValue) => (accum += currentValue));
  }

  const checkoutBtnHandler = () => {
    if (isUser) {
      dispatch(emptyCart());
      navigate(`/${route.ORDERSUCCESS}`);
    } else {
      navigate(`/${route.LOGIN}`);
    }
  };

  const cartList = cartData.map((item, index) => (
    <div key={index} className="mb-3">
      <div className="bg-light p-3 rounded">
        <div className="d-flex flex-column flex-sm-row align-items-sm-center">
          <img
            src={item.imgsrc}
            alt={item.title}
            className="mb-3 mb-sm-0 me-sm-3"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <Button
              onClick={() => navigate(`/${route.PRODUCTS}/${item.id}`)}
              variant="link"
              className="fs-5 text-dark"
            >
              {item.title}
            </Button>
            <p className="fs-5 mt-2 text-dark">$ {item.price}</p>
          </div>
          <div className="d-flex flex-column align-items-sm-end mt-2">
            <div className="d-flex align-items-center mb-2 text-dark">
              <AddSubItem quantity={item.quantity} id={item.id} />
            </div>
            <p className="fs-5 mb-0 text-dark">
              Total: $ {item.price * item.quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="container mt-4" style={{ padding: "100px" }}>
      {cartData.length === 0 && (
        <>
          <h2 className="text-center">Your Cart is Empty</h2>
          <div className="text-center mt-3">
            <Button
              className="fs-5"
              onClick={() => navigate(`/${route.PRODUCTS}`)}
            >
              Continue Shopping
            </Button>
          </div>
          {!isUser && (
            <>
              <p className="text-center mt-3 fs-5">Have an Account?</p>
              <div className="text-center mt-3 fs-5">
                <Button
                  variant="link"
                  className="fs-5"
                  onClick={() => navigate(`/${route.LOGIN}`)}
                >
                  Login
                </Button>
                <span className="ms-2 mt-2">to checkout faster</span>
              </div>
            </>
          )}
        </>
      )}

      {cartData.length > 0 && (
        <div>
          <div className="bg-red p-3 rounded text-center text-white fs-4 mb-3">
            Your Cart
          </div>
          {cartList}
          <div className="d-flex justify-content-end mt-3 mb-3 fs-4">
            <p>Subtotal $ {subTotal}</p>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="success"
              className="fs-5 mb-5"
              onClick={checkoutBtnHandler}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
