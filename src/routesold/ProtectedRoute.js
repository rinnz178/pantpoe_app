import { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "./route"; // Route list
import Loader from ".././components/Loading";

const ProtectedRoutes = ({ user }) => {
  const { role: userRole } = user;
  return (
    <Switch>
      <Suspense fallback={<Loader />}>
        {routes.map(({ component: Component, path, exact, role }) =>
          role.includes(userRole) ? (
            <Route path={`/${path}`} key={path} exact={exact}>
              <Component />
            </Route>
          ) : (
            <Redirect to="/" />
          )
        )}
      </Suspense>
    </Switch>
  );
};

export default ProtectedRoutes;
