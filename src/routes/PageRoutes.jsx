import { Route, Routes } from "react-router-dom";
import route from "../routes/route.json";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import ErrorPage from "../pages/ErrorPage";
import ProductDetails from "../pages/ProductDetailsPage";
import Signup from "../pages/Signup";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import Support from "../pages/Support";
import OrderSuccess from "../pages/OrderSuccess";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ReturnPolicy from "../pages/ReturnPolicy";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path={route.HOME} element={<Home />} />
      <Route path={route.PRODUCTS}>
        <Route index element={<Products />} />
        <Route path=":pid" element={<ProductDetailsPage />} />
      </Route>
      <Route path={route.CONSTACT_US} element={<ContactUs />} />
      <Route path={route.LOGIN} element={<Login />} />
      <Route path={route.SIGNUP} element={<Signup />} />
      <Route path={route.CART} element={<Cart />} />
      <Route path={route.PRODUCT_DETAILS} element={<ProductDetails />} />
      <Route path={route.SUPPORT} element={<Support />} />
      <Route path={route.ORDERSUCCESS} element={<OrderSuccess />} />
      <Route path={route.PRIVACY_POLICY} element={<PrivacyPolicy />} />
      <Route path={route.RETURN_POLICY} element={<ReturnPolicy />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default PageRoutes;
