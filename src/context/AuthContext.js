/** @format */
/** @format */

import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import reducer from "../reducers/authReducers";

import { BaseUrl } from "./../helpers/Constant";
import api from "./../services/apifinal.service";
import axio from "axios";
import tokenService from "../services/token.service";

const AuthContext = React.createContext();

const initialStates = {
  isAuthenticated: false,
  token: tokenService.getLocalAccessToken() || "",
  loading: false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  subscriptions: [],
  regions: [],
  searchCreator: null,
  errors: [],
  failed_status: false,
  success_status: false,
  msg: "",
};

const adminToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC92MVwvbG9naW4iLCJpYXQiOjE2MzQ1NDQzMTAsIm5iZiI6MTYzNDU0NDMxMCwianRpIjoicmdpMjFiYXF6eVJZZHlQdCIsInN1YiI6MSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.BDK4k4MmNb6fy_S3AabTughzzkvldQrAudt60XH88sA";

const AuthProvider = ({ children }) => {
  let cancelToken;
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialStates);

  const checkLogin = () => {
    dispatch({ type: "IS_AUTHENTICATED" });
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const resetAlert = () => {
    // console.log("now reset");
    dispatch({
      type: "Alert_RESET",
    });
  };

  const loginbyAccount = async (formdata) => {
    //console.log(formdata)

    try {
      const response = await axios({
        method: "post",
        url: `${BaseUrl}/auth/login`,
        data: formdata,
      });
      const data = response.data.data;
      console.log(data);
      if (data.status === "Active") {
        let lastSeen = Date.now();
        localStorage.setItem("token", JSON.stringify(data.access_token));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data, seen: lastSeen })
        );

        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        // history.push("/home/posts");
      }
    } catch (error) {
      let data = "";
      if (error.response.status === 400) {
        data = error.response.data.errors;
        dispatch({
          type: "LOGIN_FAILED",
          payload: {
            ...data,
            message: "Account is not found!",
          },
        });
      }

      if (error.response.status === 422) {
        data = error.response.data.errors;
        dispatch({
          type: "LOGIN_FAILED",
          payload: {
            ...data,
            message: "Account is invalid at the moment!Try again!",
          },
        });
      }

      return data;
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${BaseUrl}/logout`,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${state.token}`,
      },
    });

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT_ACTION" });
    history.push("/");
    // window.location.reload()
  };

  const loginByPovider = async (data, provider) => {
    const formData = data;
    // console.log(formData);
    await axios({
      method: "post",
      url: `${BaseUrl}/auth/${provider}`,
      data: formData,
    })
      .then((res) => {
        const data = res.data.data;
        if (data.status === "Active") {
          let lastSeen = Date.now();
          localStorage.setItem("token", JSON.stringify(data.access_token));
          localStorage.setItem(
            "user",
            JSON.stringify({ ...data, seen: lastSeen })
          );

          dispatch({ type: "LOGIN_SUCCESS", payload: data });
          // history.push("/home/posts");
        }
      })
      .catch((error) => console.log(error));
  };

  //for register by account

  const registerByaccount = async (formdata) => {
    // console.log(formdata);
    try {
      const response = await axios({
        method: "post",
        url: `${BaseUrl}/auth/register`,
        headers: {
          "Access-Control-Allow-Origin": "http://adminpanel.pantpoe.com/api/v1",
        },
        data: formdata,
      });
      const data = response.data.data;
      if (data.status === "Active") {
        let lastSeen = Date.now();
        localStorage.setItem("token", JSON.stringify(data.access_token));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data, seen: lastSeen })
        );

        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        // history.push("/home/posts");
      }
    } catch (error) {
      if (error.response.status === 422) {
        let data = error.response.data.errors;
        console.log(data);
        dispatch({
          type: "FAILED_ACTION",
          payload: { ...data, message: "failed Action" },
        });
      }
      //dispatch({ type: GET_PRODUCTS_ERROR })
    }
  };

  const registerByPhone = async (formdata) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BaseUrl}/auth/phone/register`,
        data: formdata,
      });
      const data = response.data.data;
      if (data.status === "Active") {
        let lastSeen = Date.now();
        localStorage.setItem("token", JSON.stringify(data.access_token));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data, seen: lastSeen })
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        history.push("/");
      }
    } catch (error) {
      //dispatch({ type: GET_PRODUCTS_ERROR })
      //dispatch({ type: GET_PRODUCTS_ERROR })
      let data = "";
      if (error.response.status === 400) {
        data = error.response.data.errors;
        dispatch({
          type: "LOGIN_FAILED",
          payload: {
            ...data,
            message: "Account is not found!",
          },
        });
      }

      if (error.response.status === 422) {
        data = error.response.data.errors;
        dispatch({
          type: "LOGIN_FAILED",
          payload: {
            ...data,
            message: "Account is invalid at the moment!Try again!",
          },
        });
      }
    }
  };

  const loginbyPhone = async (formdata) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BaseUrl}/auth/phone/login`,
        data: formdata,
      });
      const data = response.data.data;
      if (data.status === "Active") {
        let lastSeen = Date.now();
        localStorage.setItem("token", JSON.stringify(data.access_token));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data, seen: lastSeen })
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        // history.push("/home/posts");
      }
    } catch (error) {
      //dispatch({ type: GET_PRODUCTS_ERROR })
      let data = "";
      if (error.response.status === 400) {
        data = error.response.data.errors;
        dispatch({
          type: "LOGIN_FAILED",
          payload: {
            ...data,
            message: "Phone and Password are invalid",
          },
        });
      }

      if (error.response.status === 422) {
        data = error.response.data.errors;
        dispatch({
          type: "LOGIN_FAILED",
          payload: {
            ...data,
            message: "Account is invalid at the moment!Try again!",
          },
        });
      }
    }
  };

  const defaultLogged = () => {
    const data = {
      id: 1,
      name: "Admin",
      role: "admin",
      status: "Active",
      access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC92MVwvbG9naW4iLCJpYXQiOjE2MzIxNTEyNjIsIm5iZiI6MTYzMjE1MTI2MiwianRpIjoieVlPSUd5bHhHOE15YlJDaCIsInN1YiI6MSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.XI7ZZqTuWDmL0bNqh7rw1Z27qWovjVgxmS-2uW_qVm4",
      token_type: "Bearer",
    };
    localStorage.setItem("token", JSON.stringify(data.access_token));
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    // history.push("/home/posts");
  };

  const getRegions = async () => {
    const response = await axios({
      method: "get",
      url: `${BaseUrl}/region`,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${state.token}`,
      },
    });
    return response.data;
  };

  const upgradetoCreator = async (data) => {
    await axios({
      method: "post",
      url: `${BaseUrl}/creator/update`,
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${state.token}`,
      },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          let result = res.data.data;
          let user = localStorage.getItem("user");
          let user_obj = JSON.parse(user);
          user_obj.profile_image = result?.user_info.profile_image;
          user_obj.name = result?.user_info.user.name;
          user_obj.profile_url = result?.user_info.profile_url;
          user_obj.role = result?.user_info.user.role.name;
          localStorage.setItem("user", JSON.stringify(user_obj));
          localStorage.removeItem("selectedCategory");
          localStorage.removeItem("sexual_content");
          dispatch({
            type: "SUCCESS_ALERT",
          });
          handleOpen();
        }
      })
      .catch((error) => {
        console.log(error);
        let data = "";
        if (error.response.status === 422) {
          data = error.response.data.errors;
        } else {
          data = { message: "fail to update" };
        }
        dispatch({ type: "FAILED_ACTION", payload: data });
      });
  };

  const updateUserProfile = (data) => {
    axios({
      method: "post",
      url: `${BaseUrl}/user/update`,
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${state.token}`,
      },
    })
      .then((res) => {
        if (res.data.status === true) {
          let user_var = localStorage.getItem("user");
          if (user_var) {
            let userobj = JSON.parse(user_var);

            userobj.name = res.data.data.user.name;
            userobj.role = res.data.data.user.role.name;
            userobj.profile_image = res.data.data.profile_image;
            userobj.profile_url = res.data.data.profile_url;

            localStorage.setItem("user", JSON.stringify(userobj));
            dispatch({
              type: "UPDATE_USER",
              payload: res.data.data,
            });
            handleOpen();
            // getUserData();
          }
        } else {
          dispatch({
            type: "FAILED_ACTION",
            payload: { message: "fail to update" },
          });
          handleOpen();
        }
      })
      .catch((error) => {
        let data = "";

        if (error?.response.status === 422) {
          data = error.response.data.errors;
        }
        dispatch({ type: "FAILED_ACTION", payload: data });
      });
  };

  const searchByprofileUrl = (data) => {
    dispatch({ type: "SET_SEARCH_RESULT", payload: data });
  };

  const getUserData = async () => {
    const response = await axios({
      method: "get",
      url: `${BaseUrl}/user`,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${state.token}`,
      },
    });
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginbyAccount,
        loginByPovider,
        logout,
        registerByaccount,
        registerByPhone,
        loginbyPhone,
        defaultLogged,
        getRegions,
        upgradetoCreator,
        getUserData,
        searchByprofileUrl,
        updateUserProfile,
        resetAlert,
        handleClose,
        handleOpen,
        modalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
