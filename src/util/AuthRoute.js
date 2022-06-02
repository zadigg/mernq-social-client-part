import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/auth";

function AuthRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default AuthRoute;
