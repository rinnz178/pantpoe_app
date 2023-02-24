import { lazy } from "react";

const routes = [
  {
    path: "post-edit/:id",
    component: lazy(() => import(".././pages/post/PostEdit")),
    exact: true,
    role: ["creator"],
  },
  {
    path: "creator/post-create",
    component: lazy(() => import(".././pages/post/Create")),
    exact: true,
    role: ["creator"],
  },
  {
    path: "creator/home",
    component: lazy(() => import(".././pages/creator/Home")),
    exact: true,
    role: ["creator"],
  },
  {
    path: "creator/earnings-overview",
    component: lazy(() => import(".././pages/creator/EarningsOverview")),
    exact: true,
    role: ["creator"],
  },
  {
    path: "creator/earnings-overview-detail",
    component: lazy(() => import(".././pages/creator/EarningsOverviewDetail")),
    exact: true,
    role: ["creator"],
  },
  {
    path: "creator/rsmanager",
    component: lazy(() => import(".././pages/creator/RSManager")),
    exact: true,
    role: ["creator"],
  },

  {
    path: "user/profile",
    component: lazy(() => import(".././components/UserProfile")),
    exact: true,
    role: ["user"],
  },

  {
    path: "step/1",
    component: lazy(() => import(".././pages/creator/steps/StepOne")),
    exact: true,
    role: ["creator", "user"],
  },
  {
    path: "step/2",
    component: lazy(() => import(".././pages/creator/steps/StepTwo")),
    exact: true,
    role: ["creator", "user"],
  },
  {
    path: "home/posts",
    component: lazy(() => import(".././pages/user/Home")),
    exact: true,
    role: ["creator", "user"],
  },
  {
    path: "report/membership",
    component: lazy(() => import(".././pages/user/Membership")),
    exact: true,
    role: ["creator", "user"],
  },
  {
    path: "page-account/edit",
    component: lazy(() => import(".././pages/Edit")),
    exact: true,
    role: ["creator", "user"],
  },
  {
    path: "join/:username/checkout/:rid",
    component: lazy(() => import(".././components/CheckoutModel")),
    exact: true,
    role: ["creator", "user"],
  },
  {
    path: ":username",
    component: lazy(() => import(".././pages/creator/Profile")),
    exact: true,
    role: ["creator", "user"],
  },
];

export default routes;
