import React from "react";
import { Redirect, Route } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, ...props }) => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        localStorage.getItem("user") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
