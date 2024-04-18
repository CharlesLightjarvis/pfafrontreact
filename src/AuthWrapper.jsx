import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthWrapper = () => {
  const isAuthenticated = true; // Votre logique pour vérifier si l'utilisateur est connecté

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Rend les composants enfants si authentifié
};

export default AuthWrapper;
