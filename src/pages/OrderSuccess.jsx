const OrderSuccess = () => {
  return (
    <div style={{ minHeight: "64vh", marginTop: "30px" }}>
      <div className="container-fluid">
        <div className="container text-center">
          <h1>Thank you.</h1>
          <p className="lead w-lg-50 mx-auto">
            Your order has been placed successfully.
          </p>
          <p className="w-lg-50 mx-auto fs-5">
            Your order number is #ITW9237427634826. We will immediatelly process
            your order and it will be delivered in 2 - 5 business days.
          </p>
        </div>
      </div>
    </div>
  );
};
export default OrderSuccess;
