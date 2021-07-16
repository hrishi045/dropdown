import { PropsWithChildren, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "./auth";

const PrivateRoute = ({ children, ...rest }: PropsWithChildren<any>) => {
  let auth = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token !== "" ? (
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
