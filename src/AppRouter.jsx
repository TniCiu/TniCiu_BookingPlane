import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Components/AppBar/Account/login";
import SignUp from "./Components/AppBar/Account/signUp";
import OrderPalne from "./Components/AppBar/Menu/OrderPlane";
import Location from "./Home/location";
import Tour from "./Components/AppBar/Menu/Tour";
import Hotels from "./Components/AppBar/Hotels";
import { useAuth } from "./Components/AppBar/Account";
import HotelDetail from "./Components/AppBar/Hotels/HotelDetail";
import ShoppingCart from "./Components/AppBar/Menu/ShoppingCart";
import Checkout from "./Components/AppBar/Menu/ShoppingCart/Checkout";
import Information from "./Components/AppBar/Menu/ShoppingCart/Checkout/information";
import Flight from "./Components/AppBar/Menu/OrderPlane/Flight";
import CheckoutFlight from "./Components/AppBar/Menu/OrderPlane/Flight/checkout";
import InformationSuccess from "./Components/AppBar/Menu/OrderPlane/Flight/checkout/informationSuccess";
const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<OrderPalne />} />
      <Route
        path="/account/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/account/SignUp"
        element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
      />
      <Route path="/account/OrderPlane" element={<OrderPalne />} />
      <Route path="/account/Location" element={<Location />} />
      <Route path="/account/Tour" element={<Tour />} />
      <Route path="/account/Hotels" element={<Hotels />} />
      <Route path="/account/HotelDetail/:id" element={<HotelDetail />} />
      <Route path="/account/shoppingCart" element={<ShoppingCart />} />
      <Route path="/account/checkout" element={<Checkout />} />
      <Route path="/account/information" element={<Information />} />
      <Route path="/account/flight" element={<Flight />} />
      <Route path="/account/checkoutFlight" element={<CheckoutFlight />} />
      <Route path="/account/InformationSuccess" element={<InformationSuccess />} />
    </Routes>
  );
};

export default AppRouter;
