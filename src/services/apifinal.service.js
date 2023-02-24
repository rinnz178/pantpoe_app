/** @format */

import axios from "axios";
import TokenService from "./token.service";
import { BaseUrl } from "../helpers/Constant.js";
const axiosApiInstance = axios.create({
  baseURL: BaseUrl,
  timeout: 10000,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = await TokenService.getLocalAccessToken();
    console.log(config);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // return config;
    return new Promise((resolve) => {
      return resolve(config);
    });
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    if (response.data.status !== 200) {
      throw "404";
    }
    return response;
  },
  (err) => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config;
      // console.log(err.response.data);
      if (
        err.response.status === 401 &&
        err.config &&
        !err.config.__isRetryRequest
      ) {
        originalReq._retry = true;

        let res = fetch(BaseUrl + "/auth/refresh", {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Device: "device",
            Authorization: `Bearer ${TokenService.getLocalRefreshToken()}`,
          },
          redirect: "follow",
          referrer: "no-referrer",
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            TokenService.updateLocalAccessToken(res.data.access_token);
            originalReq.headers["Authorization"] = res.data.access_token;
            originalReq.headers["Device"] = "device";

            return axiosApiInstance(originalReq);
          });

        resolve(res);
      }

      return Promise.resolve(err);
    });
  }
);
export default axiosApiInstance;
