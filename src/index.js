/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthContext";

import { PostProvider } from "./context/PostContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";

const theme1 = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      light: "#f50057",
      main: "#f50057",
      dark: "#ba000d",
      contrastText: "#000",
    },
    success: {
      main: "#A400",
    },
  },
  background: {
    default: "#fff",
  },
  typography: {
    fontFamily: "Roboto,sans-serif",
    button: {
      textTransform: "none",
    },
  },
  // overrides: {
  //   MuiTypography: {
  //     h4: {
  //       fontWeight: 600,
  //     },
  //   },
  // },
});

ReactDOM.render(
  <Router>
    <AuthProvider>
      <SubscriptionProvider>
        <PostProvider>
          <ThemeProvider theme={theme1}>
            <App />
          </ThemeProvider>
        </PostProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
