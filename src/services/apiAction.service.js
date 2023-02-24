/** @format */

import axios from "axios";
import TokenService from "./token.service";
import { BaseUrl } from "../helpers/Local";
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
    // if(response.data.data.code);
    return response;
  },
  async function (error) {
    const originalConfig = error.config;
    if (originalConfig.url !== "/auth/login" && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const res = await axiosApiInstance.get("/auth/refresh");
        TokenService.updateLocalAccessToken(res.data.data.access_token);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.data.access_token;
        return axiosApiInstance(originalConfig);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosApiInstance;
