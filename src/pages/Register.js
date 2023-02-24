/** @format */

import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation, Redirect } from "react-router-dom";
import styled from "styled-components";
import AlertMessage from "../components/Alert";
import { makeStyles } from "@mui/styles";
import { CButton } from "../layout/CCButton";
import styles from "../assets/cus.module.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import {
  TextField,
  Box,
  Button,
  Fade,
  Backdrop,
  Typography,
} from "@mui/material";
import GoogleLogin from "react-google-login";
import facebookLogo from "./../assets/logos/icons8-facebook.svg";
import FacebookLogin from "./Facebook";
import Google from "./Google";
import Modal from "@mui/material/Modal";

import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

import "react-phone-input-2/lib/style.css";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    marginTop: "3vh",
    placeItems: "center",
    padding: "10px",
    [theme.breakpoints.only("xs")]: {
      // display: "block",
      padding: "10px",
    },
    "& h2": {
      textAlign: "center",
    },
  },
  container: {
    width: "90vw",
    maxWidth: "500px",
    textAlign: "start",
    height: "auto",
    padding: "20px",
    [theme.breakpoints.only("xs")]: {
      padding: "5px",
    },
  },
  line: {
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
    transition: "all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s",
    verticalAlign: "middle",
    padding: "0.5rem 0rem 0rem",
    margin: "0rem",
  },
  liner: {
    boxSizing: "border-box",
    webkitBoxFlex: 1,
    flexGrow: 1,
    transition: " all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s",
    padding: "0rem",
    margin: "0rem",
    borderBottom: "1px solid rgb(229, 227, 221)",
  },

  linerSec: {
    boxSizing: "border-box",
    transition: "all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s",
    padding: "0rem 0.5rem",
    margin: "0rem",

    "& p": {
      color: "rgb(112, 108, 100)",
      fontFamily: "aktiv-grotesk, sans-serif",
      position: "relative",
      transition: "all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s",
      textAlign: "center",
      fontWeight: "400 !important",
      margin: " 0.5rem 0rem !important",
      fontSize: "1rem !important",
      lineHeight: "1.5 !important",
    },
  },

  cusFormControl: {
    textAlign: "start",
    padding: " 10px 0px",
    "& label": {
      color: "#333333bd",
    },
    "& .input-field": {
      margin: "0.5rem 0px",
      background: "rgb(245, 244, 242)",
    },
  },

  // start//////////////////////

  // end//////////////////////
}));

const Register = () => {
  const classes = useStyles();

  const { registerByaccount, errors, failed_status, token } = useAuthContext();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isError: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const history = useHistory();

  const formValChange = (e) => {
    const { name, value } = e.target;
    const regExp = RegExp(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    );

    const { isError, email, name: ename, password, confirmPassword } = state;

    if (name === "email") {
      isError.email = regExp.test(value) ? "" : "Email address is invalid!";
    }

    if (name === "password") {
      if (confirmPassword.length > 0) {
        isError.confirmPassword =
          value == confirmPassword ? "" : "ConfirmPassword is not match!";
      } else {
        isError.password =
          value.length < 8 ? '"Atleast 6 characaters required"' : "";
      }
    }

    if (name === "confirmPassword") {
      isError.confirmPassword =
        value == password ? "" : "ConfirmPassword is not match!";
    }

    setState({
      ...state,
      isError,
      [name]: value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formdata = {
      name: state.name,
      email: state.email,
      password: state.password,
      password_confirmation: state.confirmPassword,
      dob: "",
      categories: "[2]",
      role_id: "2",
    };

    //console.log(formdata)
    registerByaccount(formdata);
  };

  // console.log(getCountryCallingCode('MM'))
  const { state: locationState } = useLocation();
  const {email, name, password, confirmPassword} = state;
  /// Register button disabled
  const isValid = name && email && password && confirmPassword;

  const gotoHome = () => {
    history.push("/home/posts");
  };

  const RegisterByPhone = () => {
    history.push("/register/phone");
  };

  console.log(errors);

  if (token.length > 1) {
    return <Redirect to={locationState?.from || "/home"} />;
  }

  return (
    <div className={classes.wrapper}>
      <h2>Sign Up</h2>
      {failed_status && (
        <div className={classes.container}>
          <AlertMessage
            alert="true"
            type="error"
            msg={`${errors?.message} ,Please Try again!`}
          />
        </div>
      )}
      <div className={`${classes.container} FaintBox `}>
        <button
          fullWidth
          type="submit"
          className={`${styles.mkBtn} ${styles.mkBtnBg}`}
          onClick={RegisterByPhone}
        >
          <LocalPhoneIcon />
          Continue with Phone Number
        </button>
        <div className={classes.line}>
          <div className={classes.liner}></div>
          <div className={classes.linerSec}>
            <p>or</p>
          </div>
          <div className={classes.liner}></div>
        </div>
        <form onSubmit={handleSubmitForm}>
          <Box className={classes.cusFormControl}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              fullWidth
              onChange={formValChange}
              variant="outlined"
            />
          </Box>

          <Box className={classes.cusFormControl}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              error={errors?.email?.length > 0 ? true : false}
              name="email"
              className="form-control"
              fullWidth
              helperText={errors?.email}
              onChange={formValChange}
              variant="outlined"
            />
          </Box>

          <Box className={classes.cusFormControl}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              error={errors?.password?.length > 0 ? true : false}
              name="password"
              className="form-control"
              fullWidth
              helperText={errors?.password}
              onChange={formValChange}
              variant="outlined"
            />
          </Box>

          <Box className={classes.cusFormControl}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              error={state.isError.confirmPassword.length > 0 ? true : false}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="form-control"
              fullWidth
              helperText={
                state.isError.confirmPassword.length > 0
                  ? state.isError.confirmPassword
                  : ""
              }
              onChange={formValChange}
              variant="outlined"
            />
          </Box>
          <button
            fullWidth
            type="submit"
            className={`${styles.dsBtn} ${isValid && styles.actBtn}`}
          >
            Sign Up
          </button>
          <hr/>

          <Google />
          <FacebookLogin />
          <p style={{ textAlign: "center" }}>
            By signing up, you agree to PantPoe's Terms of Use, Privacy Policy
            and Cookie Policy.
          </p>
        </form>
      </div>
    </div>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 500px;
    border: 1px solid rgb(229, 227, 221);
    border-radius: 4px;
    height: auto;
    padding: 30px 20px;
  }
  .hideDiv {
    display: none;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 50px;
    border: 1px solid rgb(195 197 194);
    color: "white";
    height: 48px;
    padding: 0px 30px;
    text-transform: capitalize;
    margin: 6px 0px;
    width: 100%;
  }
  .btn-filled {
    background: rgb(245, 244, 242);
    color: #333333bd;
    border: 1px solid #333 !important;
  }

  img {
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .line {
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
    vertical-align: middle;
    padding: 0.5rem 0rem 0rem;
    margin: 0rem;
  }
  .liner {
    box-sizing: border-box;
    -webkit-box-flex: 1;
    flex-grow: 1;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
    padding: 0rem;
    margin: 0rem;
    border-bottom: 1px solid rgb(229, 227, 221);
  }
  .linerSec {
    box-sizing: border-box;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
    padding: 0rem 0.5rem;
    margin: 0rem;
  }
  .linerSec p {
    color: rgb(112, 108, 100);
    font-family: aktiv-grotesk, sans-serif;
    position: relative;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
    text-align: center;
    font-weight: 400 !important;
    margin: 0.5rem 0rem !important;
    font-size: 1rem !important;
    line-height: 1.5 !important;
  }

  .cus-form-control {
    text-align: start;
    padding: 10px 0px;
  }
  .cus-form-control label {
    color: #333333bd;
  }
  .cus-form-control .input-field {
    margin: 0.5rem 0px;
    background: rgb(245, 244, 242);
  }
`;
export default Register;
