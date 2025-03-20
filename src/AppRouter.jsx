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
    </Routes>
  );
};

export default AppRouter;
