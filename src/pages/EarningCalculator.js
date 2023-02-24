/** @format */

import React, { useEffect, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { CButton } from "../layout/CCButton";
import InputAdornment from "@mui/material/InputAdornment";
import "../assets/forcreator.css";
import {
  TextField,
  Box,
  Button,
  Fade,
  Backdrop,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// import GoogleLogin from "react-google-login";
import facebookLogo from "./../assets/logos/icons8-facebook.svg";
import FacebookLogin from "./Facebook";

import { useTranslation } from "../languages";

//modal import

const EarningCalculator = () => {
  const { t } = useTranslation();

  return (
    <div className="wrapper">
      <div className="card">
        <h1 style={{ textAlign: "center", fontSize: "25px" ,marginBottom:'4vh'}}>
          {t("Earning Calculator")}
        </h1>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          container
          spacing={2}
        >
          <Grid item xs={6}>
            <TextField
              label="Number of followers"
              id="outlined-start-adornment"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Amount"
              id="outlined-start-adornment"
              sx={{ width: "100%" }}
            />
          </Grid>
        </Stack>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop="3"
        >
          <Grid item xs={11}>
            <Typography style={{ marginTop: "10px", textAlign: "center" }}>
              Calculated assuming 5% of your subscribers support your work on
              our platform.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{marginTop:'2vh'}}
        >
        <CButton ><Link to="/" style={{color:'white',textDecoration:'none'}}>Back to Home</Link></CButton>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop="3"
        >
          <Grid item xs={11}>
            <Typography style={{ marginTop: "20px", textAlign: "center" }}>
              * inclusive of 20% platform fees *
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EarningCalculator;
