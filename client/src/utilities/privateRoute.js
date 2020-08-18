import React, { component, Component } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...rest} />
        ) : (
          <Redirect tp="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
