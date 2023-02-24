/** @format */

import React, { useEffect, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import { CButton } from "../layout/CCButton";
import styles from "../assets/cus.module.css";

import {
  TextField,
  Box,
  Button,
  Fade,
  Backdrop,
  Typography,
} from "@mui/material";

// import GoogleLogin from "react-google-login";
import facebookLogo from "./../assets/logos/icons8-facebook.svg";
import FacebookLogin from "./Facebook";
import Google from "./Google";
import Modal from "@mui/material/Modal";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { BaseUrl } from "../helpers/Constant";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import AlertMessage from "../components/Alert";
import { useTranslation } from "../../src/languages";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { bgcolor } from "@mui/system";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import OutlinedInput from "@mui/material/OutlinedInput";

//modal import

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "8px",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "auto",
  bgcolor: "#fff",
  border: "1px solid rgb(229,227,221)",
  boxShadow: 0,
  pt: 2,
  px: 4,
  pb: 3,
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    marginTop: "1px",
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
    marginTop: "0",
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
      // background: "rgb(245, 244, 242)",
    },
  },

  // start//////////////////////

  // end//////////////////////
}));

const Login = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { state: locationState } = useLocation();

  const {
    token,
    loginbyAccount,
    failed_status,
    errors: authError,
    success_status,
  } = useAuthContext();

  const [showMobile, setShowMobile] = React.useState(false);
  const [showphonePassword, setphonePassword] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  const [aemail, setEmail] = useState("");
  const [apassword, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [phonePassword, setPhonePassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    message: "",
    email: "he",
    password: "hek",
  });
  /// Login button disabled
  const isValid = aemail && apassword;

  const handlePhoneDivOpen = () => {
    history.push("/login/phone");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      email: aemail,
      password: apassword,
    };
    loginbyAccount(formData);

    // defaultLogged()
  };

  const handlePhoneSubmit = () => {
    console.log(phone);
    setphonePassword(true);
  };

  const handlePhonePasswordSubmit = () => {
    console.log(phone);
    console.log(phonePassword);

    fetch(`${BaseUrl}/api/v1/auth/phone/send-sms/sample/+${phone}`)
      .then((res) => res.json())
      .then((res) => {
        setConfirmCode(res.data.code);
        handleOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCodeConfirm = (e) => {
    let len = e.target.value.length;
    console.log(confirmCode);
    if (len === 6) {
      if (confirmCode === e.target.value) {
        handleClose();
      } else {
        console.log("invalid code entered!");
      }
    }
  };

  if (token.length > 1) {
    return <Redirect to={locationState?.from || "/home"} />;
  }

  return (
    <div className={classes.wrapper}>
      <h2>{t("login")}</h2>
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
        <form onSubmit={handleLogin}>
          <Box className={classes.cusFormControl}>
            <label htmlFor="email" style={{ color: "black" }}>
              Email
            </label>
            <input
              id="email"
              sx={{
                "& label.Mui-focused": {
                  display: "none",
                },
                "& legend": {
                  display: "none",
                },
              }}
              style={{ marginTop: "1.5vh" }}
              error={authError && authError.email && true}
              type="email"
              name={aemail}
              // variant="outlined"
              className="form-control"

              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              helperText={authError && authError.email && authError.email}
            />
          </Box>

          <Box className="cus-form-control">
            <label htmlFor="password">Password</label>
            <input
              sx={{
                "& label.Mui-focused": {
                  display: "none",
                },
                "& legend": {
                  display: "none",
                },
              }}
              style={{ marginTop: "1.5vh" }}
              id="password"
              error={authError && authError.password && true}
              type="password"
              className="form-control"
              name={apassword}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              helperText={authError && authError.password && authError.password}
            />
          </Box>
          <Box mt={3} mb={3} style={{ textAlign: "right" }}>
            <Link href="/">Forgot password</Link>
          </Box>

          <button
            label="CLAIM"
            type="submit"
            className={`${styles.dsBtn} ${isValid && styles.actBtn}`}
            disabled={!isValid}
          >
            Log in
          </button>
        </form>

        <div className={classes.line}>
          <div className={classes.liner}></div>
          <div className={classes.linerSec}>
            <p>or</p>
          </div>
          <div className={classes.liner}></div>
        </div>
        <Google />
        <FacebookLogin />
        <button
          fullWidth
          type="submit"
          className={`${styles.mkBtn} ${styles.mkBtnBg}`} //add style
          onClick={handlePhoneDivOpen}
        >
          <LocalPhoneIcon /> Continue with Phone Number
        </button>
        <p style={{ textAlign: "center" }}>
          New to PantPoe? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 50vw;
    max-width: 400px;
    text-align: center;
    border: 1px solid rgb(229, 227, 221);
    border-radius: 4px;
    height: auto;
    padding: 20px;
  }
  .hideDiv {
    display: none;
  }
  img {
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 0.5rem;
    text-align: center;
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
    border: 0px;
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
  .forget {
    margin-left: 5rem;
    margin-top: 30px;
  }
`;

export default Login;
