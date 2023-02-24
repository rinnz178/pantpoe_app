/** @format */

import React, { useEffect, lazy, Suspense } from "react";
import Echo from "laravel-echo";

import { NavBar } from "./components";

import "./App.css";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";

import Loader from "./components/Loading";
import ProtectedRoutes from "./routes/ProtectedRoute"; //Authenticated routes
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Footer from "./pages/Footer";
import { useAuthContext } from "./context/AuthContext";
import { checkAuth } from "./helpers/Constant";
import AccessDenied from "./components/AccessDeined";

const LoginPage = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NoFoundComponent = lazy(() => import("./pages/Error"));
const Faq = lazy(() => import("./pages/static/Faq"));
const Legal = lazy(() => import("./pages/static/TermsAndCondition"));
const HomePage = lazy(() => import("./pages/Home"));
const PhoneSignUp = lazy(() => import("./pages/phoneAuth/Signup"));
const PhoneLogin = lazy(() => import("./pages/phoneAuth/Login"));
function App() {
  const { user } = useAuthContext();
  const isAuthenticated = checkAuth();
  console.log(isAuthenticated);
  React.useEffect(() => {
    console.log("say hello", "aye chan oo");
  }, []);
  return (
    <div>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute path="/login/phone" isAuthenticated={isAuthenticated}>
            <PhoneLogin />
          </PublicRoute>

          <PublicRoute exact path="/login" isAuthenticated={isAuthenticated}>
            <LoginPage />
          </PublicRoute>

          <PublicRoute path="/register/phone" isAuthenticated={isAuthenticated}>
            <PhoneSignUp />
          </PublicRoute>

          <PublicRoute path="/register" isAuthenticated={isAuthenticated}>
            <Register />
          </PublicRoute>

          <PrivateRoute path="/" isAuthenticated={isAuthenticated}>
            <ProtectedRoutes user={user} />
          </PrivateRoute>

          <PublicRoute isAuthenticated={isAuthenticated} path="/faq">
            <Faq />
          </PublicRoute>
          <Route path="/policy/termsAndcondition">
            <Legal />
          </Route>

          <Route path="/">
            <HomePage />
          </Route>

          <Route path="*">
            <AccessDenied />
          </Route>
        </Switch>
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;
