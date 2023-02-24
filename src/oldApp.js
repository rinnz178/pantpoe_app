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
import { Switch, Route } from "react-router-dom";

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
    <>
      <NavBar />
      {/*<Footer /> */}
      <Switch>
        <Route exact={true} path="/" component={Home} />

        <Route exact={true} path="/login" component={Login} />

        <Route exact={true} path="/register" component={Register} />
        <Route exact={true} path="/register/phone" component={PhoneSignUp} />
        <Route exact={true} path="/login/phone" component={PhoneLogin} />

        <Route exact={true} path="/edit" component={Edit} />
        <Route exact={true} path="/rsmanager" component={RSManager} />
        <Route
          exact={true}
          path="/earnings-overview"
          component={EarningsOverview}
        />
        <Route exact={true} path="/report/membership" component={Membership} />
        <Route
          path="/earnings-overview-detail"
          component={EarningsOverviewDetail}
        />
        <Route exact={true} path="/report/membership" component={Membership} />

        <Route exact={true} path="/home">
          <UserHome />
        </Route>

        <Route exact={true} path="/user-profile">
          <UserProfile />
        </Route>

        <Route exact={true} path="/creator-home">
          <CreatorHome />
        </Route>

        <Route exact={true} path="/:username">
          <CreatorProfile />
        </Route>

        <Route exact={true} path="/join/:username/checkout/:rid">
          <CheckOutModel />
        </Route>

        <Route exact={true} path="/creator-edit/">
          <EditProfile />
        </Route>

        <Route exact={true} path="/post-create" component={PostCreate} />

        <Route exact={true} path="/post-detail/:id">
          <PostDetail />
        </Route>

        <Route exact={true} path="/post-edit/:id">
          <PostEdit />
        </Route>

        <Route extact={true} path="/step/1">
          <StepOne />
        </Route>
        <Route path="/step/2">
          <StepTwo />
        </Route>

        <Route exact={true} path="/policy/faq">
          <Faq />
        </Route>
        <Route exact={true} path="/policy/legal">
          <TermsAndCondition />
        </Route>

        <Route component={Error} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
