/** @format */

import React, { useEffect, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { CButton } from "../layout/CCButton";
import "../assets/forcreator.css";
import Avatar from "@mui/material/Avatar";
import facebook from "../assets/social/facebook.svg";
import youtube from "../assets/social/youtube.svg";
import twitter from "../assets/social/twitter.svg";
import instagram from "../assets/social/instagram.svg";
import mobilelegend from "../assets/social/mobilelegends.png";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import {
  TextField,
  Box,
  Button,
  Fade,
  Backdrop,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

// import GoogleLogin from "react-google-login";
import facebookLogo from "./../assets/logos/icons8-facebook.svg";
import FacebookLogin from "./Facebook";

import { useTranslation } from "../languages";

//modal import

const Login = () => {
  const { t } = useTranslation();
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
  }));
  return (
    <div className="wrapper">
      <div className="">
        <h1 style={{ textAlign: "center", fontSize: "25px" }}>
          {t("For Creators")}
        </h1>
        <Grid
          direction="row"
          justifyContent="center"
          alignItems="center"
          container
        >
          <Grid item xs={1}>
            <Avatar alt="Remy Sharp" src={twitter} />
          </Grid>
          <Grid item xs={1}>
            <Avatar alt="Remy Sharp" src={facebook} />
          </Grid>
          <Grid item xs={1}>
            <Avatar alt="Remy Sharp" src={instagram} />
          </Grid>
          <Grid item xs={1}>
            <Avatar alt="Remy Sharp" src={youtube} />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop="3"
        >
          <Grid item xs={12}>
            <Typography style={{ marginTop: "10px", textAlign: "center" }}>
              Social influencers, youtube, writers, Content creaters,
              artists,non profits.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop="3"
        >
          <Grid item xs={10}>
            <Typography style={{ marginTop: "10px", textAlign: "center" }}>
              If you love what you do and you want people to support blah blah ,
              click below to start getting in touch with audience.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop="5"
        >
          <CButton style={{ marginTop: "10px" }}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/register"
            >
              Get Start
            </Link>
          </CButton>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
