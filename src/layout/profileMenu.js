/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useAuthContext } from "../context/AuthContext";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getFullUrl } from "../helpers/Constant";
import { Link } from "react-router-dom";

export default function AccountMenu() {
  const history = useHistory();
  const { isAuthentiacted, user, logout } = useAuthContext();

  const { name, id, role, profile_image } = user;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    console.log("changing");
  }, [user]);
  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={
              profile_image.startsWith("http")
                ? profile_image
                : getFullUrl(profile_image)
            }
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          component={Link}
          to={
            user?.role === "creator"
              ? "/creators/" + user.profile_url
              : "/user/profile"
          }
        >
          Personal Information
        </MenuItem>
        <MenuItem
          component={Link}
          to="/creator/rsmanager"
          style={{ display: user.role === "creator" ? "" : "none" }}
        >
          Relationship Manager
        </MenuItem>
        <MenuItem
          component={Link}
          to={"/creator/earnings-overview"}
          style={{ display: user.role === "creator" ? "" : "none" }}
        >
          My Earnings
        </MenuItem>
        <MenuItem component={Link} to={"/user/membership"}>
          Manage Memberships
        </MenuItem>

        <MenuItem component={Link} to="/faq">
          Help & FAQ
        </MenuItem>
        <MenuItem component={Link} to="/policy/termsAndcondition">
          Term & Condition
        </MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
