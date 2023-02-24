/** @format */

import React, { useEffect, lazy, Suspense } from "react";
import { NavBar } from "./components";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { authLayoutPaths } from "./routes/routes";
import { protectedPaths } from "./routes/protectedroutes";
import "./App.css";
import Footer from "./pages/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import {
  Login,
  Register,
  PhoneLogin,
  PhoneSignUp,
  UserHome,
  Home,
  Faq,
  TermsAndCondition,
  CreatorProfile,
} from "./pages";

import AuthLayout from "./routes/AuthLayout";
import MainLayout from "./routes/MainLayout";

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  console.log(authLayoutPaths.map((x) => x.path));
  return (
    <div>
      <NavBar />
      <Route path={authLayoutPaths.map((x) => x.path)}>
        <AuthLayout>
          {authLayoutPaths.map((x) => (
            <Route
              key={x.path}
              exact={x.exact}
              path={x.path}
              component={x.component}
            />
          ))}
        </AuthLayout>
      </Route>

      <MainLayout>
        {protectedPaths.map((x, i) => (
          <RouteWithSubRoutes key={i} {...x} />
        ))}
      </MainLayout>

      <Footer />
    </div>
  );
}

export default App;
