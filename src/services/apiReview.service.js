/** @format */

import axios from "axios";
import TokenService from "./token.service";
import { BaseUrl } from "../helpers/Constant";
const instance = axios.create({
  baseURL: BaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
const requestArray = [];

instance.interceptors.request.use(
  async (config) => {
    const token = await TokenService.getLocalAccessToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        // Do your network success handler function or other stuff
        return resolve(config);
      }, 1000);
    });
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (requestArray.length !== 0) {
      // console.log(requestArray);
      requestArray.forEach(function (x, i) {
        if (response.config.url === x.url) {
          requestArray.splice(i, 1);
        }
      });
    }
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    console.log(requestArray);

    requestArray.push(originalConfig);
    if (originalConfig.url !== "/auth/login" && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        if (axios.wait) await axios.wait;
        originalConfig._retry = true;
        return await instance
          .get("auth/refresh", {
            refreshToken: TokenService.getLocalRefreshToken(),
          })
          .then((res) => {
            TokenService.updateLocalAccessToken(res.data.data.access_token);
            console.log(requestArray);
            if (requestArray.length !== 0) {
              requestArray.forEach((x) => {
                try {
                  x.headers.Authorization = `Bearer ${res.data.data.access_token}`;
                  x.headers["Content-Type"] = "application/json";
                  instance.defaults.headers.common[
                    "Authorization"
                  ] = `Bearer ${res.data.data.access_token}`;
                  instance(x);
                } catch (e) {
                  console.log(e);
                }
              });
            }
            return instance(originalConfig);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
);

export default instance;
