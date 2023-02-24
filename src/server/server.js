/** @format */

import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { BaseUrl } from "../helpers/Constant";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();

const options = {
  broadcaster: "pusher",
  key: "cbae929ae26fb6b1d072",
  cluster: "ap1",
  encrypted: false,
  //authEndpoint is your apiUrl + /broadcasting/auth
  //authEndpoint: `${BaseUrl}/broadcasting/auth`,
  authEndpoint: `http://localhost:8000/`,
  // As I'm using JWT tokens, I need to manually set up the headers.
  auth: {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      Accept: "application/json",
    },
  },
};

export const echo = new Echo(options);
