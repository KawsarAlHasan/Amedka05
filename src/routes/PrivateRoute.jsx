import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetMyProfile } from "../api/api";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { myProfile, isLoading, isError, error, refetch } = useGetMyProfile();

  const location = useLocation();
  const token = localStorage.getItem("token");

  if (isLoading) {
    return <Loading />;
  }

  if (isError || error || !myProfile || !token) {
    localStorage.removeItem("token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
