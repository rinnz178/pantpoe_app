/** @format */

import React, { useEffect } from "react";
import Echo from "laravel-echo";

import { NavBar } from "./components";
import {
  Home,
  Footer,
  Login,
  Register,
  Edit,
  PhoneSignUp,
  PhoneLogin,
  UserHome,
  CreatorHome,
  CreatorProfile,
  PostCreate,
  PostDetail,
  StepOne,
  StepTwo,
  EditProfile,
  UserProfile,
  Membership,
  PostEdit,
  Faq,
  TermsAndCondition,
} from "./pages/";

import RSManager from "./pages/creator/RSManager";
import EarningsOverview from "./pages/creator/EarningsOverview";
import EarningsOverviewDetail from "./pages/creator/EarningsOverviewDetail";
import CheckOutModel from "./components/CheckoutModel";
import "./App.css";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";

function App() {
  const listen = () => {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "cbae929ae26fb6b1d072",
      cluster: "ap1",
      encrypted: true,
    });

    window.Echo.channel("comment-channel").listen("newComment", function (e) {
      console.log(e);
    });
  };
  useEffect(() => {
    listen();
  });
  return (
    <div>
      <NavBar />
      <Switch>
        // common route
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/phone" component={PhoneSignUp} />
        <Route exact path="/login/phone" component={PhoneLogin} />
        <Route extact={true} path="/step/1" component={StepOne} />
        <Route path="/step/2" component={StepTwo} />
        <Route path="/policy/faq" component={Faq} />
        <Route path="/policy/termsAndcondition" component={TermsAndCondition} />
        <Route path="/page-account/edit" component={Edit} />
        <Route path="/report/membership" component={Membership} />
        <Route path="/home">
          <UserHome />
        </Route>
        <Route path="/join/:username/checkout/:rid" component={CheckOutModel} />
        //post of creator
        <Route exact={true} path="/post/edit/:id" component={PostEdit} />
        <Route path="/post/detail/:id" component={PostDetail} />
        // creator
        <Route path="/creator-edit/">
          {/*<EditProfile />*/}i am edit of creator
        </Route>
        <Route path="/creator/home" component={CreatorHome} />
        <Route path="/creator/post-create" component={PostCreate} />
        <Route path="/creator/earnings-overview" component={EarningsOverview} />
        <Route
          path="/earnings-overview-detail"
          component={EarningsOverviewDetail}
        />
        <Route path="/creator/rsmanager" component={RSManager} />
        // user route
        <Route path="/user/profile">
          <UserProfile />
        </Route>
        // sensitive routes
        <Route exact path="/:username" component={CreatorProfile} />
        <Route path="/" component={Home} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
