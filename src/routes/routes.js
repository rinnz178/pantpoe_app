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
} from "../pages";
import forCreator from '../pages/ForCreator'
import EarningCalculator from '../pages/EarningCalculator'

export const authLayoutPaths = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/forcreators",
    component: forCreator,
    exact: true,
  },
  {
    path: "/earningcalculator",
    component: EarningCalculator,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/login/phone",
    component: PhoneLogin,
    exact: false,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
  },
  {
    path: "/register/phone",
    component: PhoneSignUp,
    exact: false,
  },
  {
    path: "/policy/faq",
    component: Faq,
    exact: false,
  },
  {
    path: "/policy/termsAndCondition",
    component: TermsAndCondition,
    exact: false,
  },
];
