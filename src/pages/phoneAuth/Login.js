/** @format */

import React, { useState } from "react";
import styled from "styled-components";

import { makeStyles } from "@mui/styles";
import { useHistory, Redirect } from "react-router-dom";
import FormControl, { useFormControl } from "@mui/material/FormControl";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useLocation } from "react-router-dom";
import {
  OutlinedInput,
  FormHelperText,
  Box,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material";
import { CButton } from "./../../layout/CCButton";
import { useAuthContext } from "../../context/AuthContext";
import AlertMessage from "../../components/Alert";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "50vh",
    display: "grid",

    placeItems: "center",
    padding: "10px",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      padding: "10px",
    },
    "& h2": {
      textAlign: "center",
    },
  },
  container: {
    width: "90vw",
    maxWidth: "700px",
    textAlign: "start",
    height: "auto",
    padding: "20px",

    [theme.breakpoints.only("xs")]: {
      padding: "5px",
    },
  },
}));

const NextToPassword = (props) => {
  // console.log(phone)
  const { loginbyPhone, failed_status, errors: authError } = useAuthContext();
  const classes = useStyles();
  const [data, setData] = React.useState({
    phone_no: props.phone,
    password: "",
    role_id: "3",
  });
  const handlePassword = (e) => {
    const { value } = e.target;
    setData({ ...data, password: value });
  };

  const loginByPhonenumber = () => {
    console.log(data);
    loginbyPhone(data);
  };

  return (
    <div className={classes.wrapper}>
      <h2>Login with Phone Number</h2>
      {failed_status && (
        <div className={classes.container}>
          <AlertMessage
            alert="true"
            type="error"
            msg={`${authError?.message} ,Please Try again!`}
          />
        </div>
      )}
      <div className={`${classes.container} FaintBox `}>
        <FormControl variant="standard" fullWidth>
          <label htmlFor="Password" style={{ textAlign: "start" }}>
            <Typography variant="subtitle2" gutterBottom>
              Enter Your Password
            </Typography>
          </label>
          <OutlinedInput
            id="Password"
            onChange={handlePassword}
            aria-describedby="component-error-text"
            inputProps={{ type: "password" }}
          />
          <FormHelperText id="component-error-text">
            {/* {errors.helperText} */}
          </FormHelperText>
          <a
            // onClick={ResendingCode}
            style={{
              dispaly: "inline-flex",
              alignSelf: "flex-end",
              textDecoration: "underline",
              color: "#0582dd",
              margin: "12px 0px",
            }}
          >
            forgot password?
          </a>
          <CButton onClick={loginByPhonenumber}>Continue</CButton>
          <CButton
            bgcolor={"#333"}
            onClick={() => {
              window.location.reload(false);
            }}
          >
            Try Other Phone Number
          </CButton>
        </FormControl>
      </div>
    </div>
  );
};

const LoginPhone = () => {
  const classes = useStyles();

  const { state: locationState } = useLocation();

  const [state, setState] = useState({
    showPassword: false,
    phone: "",
    helperText: "",
    error: false,
  });

  const { loginbyPhone, token } = useAuthContext();

  // console.log(state)
  const handlePhoneNumber = (e) => {
    const { name, value } = e.target;
    let helperText = "";
    // console.log(helperText)

    if (value.length === 0 || value.length === 7 || value.length === 9) {
      helperText = "";
    }

    if (value.length < 7) {
      helperText = "Minimun value is 7";
    }

    if (value.length > 9) {
      helperText = "Maximum value is 9";
    }
    setState({
      ...state,
      error: helperText.length > 0 ? true : false,
      helperText,
      [name]: value,
    });
  };

  if (token.length > 1) {
    return <Redirect to={locationState?.from || "/home"} />;
  }

  if (state.showPassword) {
    return <NextToPassword phone={state.phone} />;
  }

  return (
    <>
      <div className={classes.wrapper}>
        <h2>Login with Phone Number</h2>
        <div className={`${classes.container} FaintBox `}>
          <FormControl variant="standard" error={state.error} fullWidth>
            <label htmlFor="PhoneNumber" style={{ textAlign: "start" }}>
              <Typography variant="subtitle2" gutterBottom>
                Phone Number
              </Typography>
            </label>
            <PhoneInput
              placeholder="Enter phone number"
              value={state.phone}
              country="mm"
              countryCodeEditable={false}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              inputStyle={{
                background: "lightblue",
              }}
              buttonStyle={{
                borderRight: "none",
              }}
              onChange={(value) => {
                setState((prev) => ({
                  ...prev,
                  phone: value,
                }));
              }}
            />
            <FormHelperText id="component-error-text">
              {state.helperText}
            </FormHelperText>
            <CButton onClick={() => setState({ ...state, showPassword: true })}>
              Continue
            </CButton>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default LoginPhone;
