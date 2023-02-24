import CheckOutModel from "../components/CheckoutModel";
import {
  UserHome,
  CreatorProfile,
  PostCreate,
  EarningsOverview,
  CreatorHome,
  UserProfile,
  RSManager,
  StepOne,
  StepTwo,
  Membership,
  PostEdit,
  Edit,
} from "../pages";
import { FindCreators } from "../pages/creator/FindCreators";
import { PaymentHistory } from "../pages/creator/PaymentHistory";
import Profile from "../pages/creator/Profile";
import ShareLayout from "../pages/creator/ShareLayout";
import { PaymentFail, PaymentSuccess } from "../pages/Payment";
export const protectedPaths = [
  {
    path: "/creator",
    component: ShareLayout,
    routes: [
      {
        path: "/creator/post-create",
        component: PostCreate,
      },
      {
        path: "/creator/earnings-overview",
        component: EarningsOverview,
      },
      {
        path: "/creator/rsmanager",
        component: RSManager,
      },
      {
        path: "/creator/payment-history",
        component: PaymentHistory,
      },
      {
        path: "/creator/find-creator",
        component: FindCreators,
      },
    ],
  },
  {
    path: "/step",
    component: ShareLayout,
    routes: [
      {
        path: "/step/1",
        component: StepOne,
      },
      {
        path: "/step/2",
        component: StepTwo,
      },
    ],
  },
  {
    path: "/post-edit/:id",
    component: PostEdit,
  },
  {
    path: "join/:username/checkout/:rid",
    component: CheckOutModel,
  },
  {
    path: "/profile/:username",
    component: Profile,
    exact: true,
  },
  {
    path: "user/profile",
    component: UserProfile,
    exact: true,
  },
  {
    path: "/home",
    component: UserHome,
  },
  {
    path: "/report/membership",
    component: Membership,
  },
  {
    path: "/page-account/edit",
    component: Edit,
  },
  {
    path: "/payment/success",
    component: PaymentSuccess,
  },
  {
    path: "/payment/fail",
    component: PaymentFail,
  },
];
