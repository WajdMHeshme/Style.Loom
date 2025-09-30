// src/utils/PrivateRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;

