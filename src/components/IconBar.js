/** @format */

import * as React from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function IconButtons() {
  // const theme = useTheme();
  // const ismatch = useMediaQuery(theme.breakpoints.up("md"));
  const { user } = useAuthContext();

  const history = useHistory();
  return (
    <Stack direction="row" spacing={3}>
      <IconButton aria-label="home" onClick={() => history.push("/home")}>
        <HomeIcon />
      </IconButton>
      <IconButton aria-label="mail">
        <EmailIcon />
      </IconButton>
      {user.role === "creator" && (
        <IconButton
          component={Link}
          to="/creator/post-create"
          aria-label="make a post"
        >
          <ControlPointIcon />
        </IconButton>
      )}
      <IconButton aria-label="get notification">
        <NotificationsIcon />
      </IconButton>
      <IconButton
        component={Link}
        to={
          user?.role === "creator" && user?.profile_url !== null
            ? "/creators/" + user?.profile_url
            : "/user/profile"
        }
        aria-label="personal information"
      >
        <AccountCircleIcon />
      </IconButton>
    </Stack>
  );
}
