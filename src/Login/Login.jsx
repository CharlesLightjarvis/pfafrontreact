import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Logique d'authentification ici (si nécessaire)
    navigate("/dashboard"); // Redirige vers le Dashboard après le login
  };

  return (
    <div>
      <p>Login Page</p>
      <button onClick={handleLogin}>Login</button> // Ajout de l'événement
      onClick
    </div>
  );
};

export default Login;
