/** @format */
import '../src/App.css';
import React, { useEffect,useState } from "react";
import { NavBar } from "./components";
import { createBrowserHistory } from "history";
import {
  Login,
  Register,
  PhoneLogin,
  PhoneSignUp,
  UserHome,
  Home,
  Faq,
  PostCreate,
  PostEdit,
  TermsAndCondition,
  Edit,
  RSManager,
  EarningsOverview,
  UserProfile,
  Membership,
  StepOne,
  StepTwo,
  Footer,
} from "./pages";

import ForCreator from "../src/pages/ForCreator";
import EarningCalculator from "../src/pages/EarningCalculator";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useRouteMatch,
  useParams,
  useLocation,
} from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Profile from "./pages/creator/Profile";
import CheckOutModel from "./components/CheckoutModel";
import { PaymentFail, PaymentSuccess } from "./pages/Payment";
import PageNFound from "./components/PageNFound";
import { PaymentHistory } from "./pages/creator/PaymentHistory";
import { FindCreators } from "./pages/creator/FindCreators";
import "bootstrap/dist/css/bootstrap.min.css";

const Public = () => {
  return "i am public";
};

const CreatorHomePage = () => {
  return <div>I am creator Home</div>;
};

const PageNotFound = () => {
  return (
    <div>
      <PageNFound />
    </div>
  );
};

const ShareLayout = () => {
  const params = useParams();

  return <div>I am share layout {params.slug}</div>;
};

const Creator = () => {
  let { path } = useRouteMatch();

  const { state: locationState } = useLocation();

  const { user } = useAuthContext();

  if (user.role !== "creator") {
    return <Redirect to={locationState?.from || "/*"} />;
  }

  return (
    <Switch>
      <Route path={`${path}/post-create`} exact>
        <PostCreate />
      </Route>
      <Route path={`${path}/rsmanager`} exact>
        <RSManager />
      </Route>
      <Route path={`${path}/payment-history`} exact>
        <PaymentHistory />
      </Route>
      <Route path={`${path}/earnings-overview`} exact>
        <EarningsOverview />
      </Route>
      <Route path={`${path}/post-edit/:id`} exact>
        <PostEdit />
      </Route>
      <Route path={`${path}/find-creator`} exact>
        <FindCreators />
      </Route>
    </Switch>
  );
};

const User = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/profile`} exact>
        <UserProfile />
      </Route>

      <Route path={`${path}/membership`} exact>
        <Membership />
      </Route>
    </Switch>
  );
};

const Step = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/1`} exact>
        <StepOne />
      </Route>

      <Route path={`${path}/2`} exact>
        <StepTwo />
      </Route>
    </Switch>
  );
};

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthenticated === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

function App() {
  const { token } = useAuthContext();

  const isAuthenticated = token.length > 0 ? true : false;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
    {loading ? (
      <div className="loader-container">
      	  <div className="spinner"></div>
        </div>
      ) : (
   
    
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
    
      <NavBar />
      
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/earningcalculator" component={EarningCalculator} />
        <Route path="/forcreators" component={ForCreator} />
        <Route path="/public" component={Public} />
        <Route path="/login" component={Login} exact />
        <Route path="/login/phone" component={PhoneLogin} />
        <Route path="/register" component={Register} exact />
        <Route path="/register/phone" component={PhoneSignUp} />
        <Route path="/faq" component={Faq} exact />
        <Route path="/policy/termsAndCondition" component={TermsAndCondition} />

        <PrivateRoute
          path="/page-setup"
          isAuthenticated={isAuthenticated}
          exact
        >
          <Edit />
        </PrivateRoute>

        <PrivateRoute path="/creator" isAuthenticated={isAuthenticated}>
          <Creator />
        </PrivateRoute>

        <PrivateRoute path="/user" isAuthenticated={isAuthenticated}>
          <User />
        </PrivateRoute>

        <PrivateRoute path="/home" isAuthenticated={isAuthenticated} exact>
          <UserHome />
        </PrivateRoute>
        <PrivateRoute
          path="/payment/success"
          isAuthenticated={isAuthenticated}
          exact
        >
          <PaymentSuccess />
        </PrivateRoute>
        <PrivateRoute
          path="/payment/fail"
          isAuthenticated={isAuthenticated}
          exact
        >
          <PaymentFail />
        </PrivateRoute>

        <Route path="/creators/:username" exact>
          <Profile />
        </Route>

        <PrivateRoute
          path="/join/:username/checkout/:rid"
          isAuthenticated={isAuthenticated}
          exact
        >
          <CheckOutModel />
        </PrivateRoute>

        <Route path="/step">
          <Step />
        </Route>

        <Route path="*" component={PageNotFound} />
      </Switch>
     
      <Footer style={{position: 'fixed',bottom: '0'}}/>
    </div>
   
    )}
    </>

  );
}
//vhudyma-blog.eu/dynamic-and-nested-routes-in-react-router-v5/
export default App;
