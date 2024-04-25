import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = localStorage.getItem("token");
  if (user) {
    return <Navigate to={"/dashboard"}/>;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
