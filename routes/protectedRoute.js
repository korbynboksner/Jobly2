import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "./userContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const currentUser = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;