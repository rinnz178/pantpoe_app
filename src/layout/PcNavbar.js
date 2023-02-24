import React from "react";
import { styled, alpha, makeStyles } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import capitalize from "@mui/utils/capitalize";
import MenuButton from "./MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";

const PcNav = () => {
  return (
    <Box sx={{ flexGrow: { md: 1 } }}>
    <Button
        to="/"
        component={Link}
        // icon={<KeyboardArrowDownIcon fontSize='large' />}
      >
        Home
      </Button>
      <Button
        to="/forcreators"
        component={Link}
        // icon={<KeyboardArrowDownIcon fontSize='large' />}
      >
        For Creators
      </Button>

      <Button
        to="/earningcalculator"
        component={Link}
        // icon={<KeyboardArrowDownIcon fontSize='large' />}
      >
        Earnings Calculator
      </Button>

      {/* <MenuButton label='Price' /> */}

      {/* <MenuButton
        label='Resource'
        icon={<KeyboardArrowDownIcon fontSize='large' />}
      />

      <MenuButton label='Starter Kids' /> */}
    </Box>
  );
};
export default PcNav;
