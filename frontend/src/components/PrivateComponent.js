import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateComponent() {
  const token = localStorage.getItem("library_token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
