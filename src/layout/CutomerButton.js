/** @format */

import Button from "@mui/material/Button";

import { withStyles } from "@mui/styles";

export const CustomButton = withStyles((theme) => ({
  root: {
    background: (props) =>
      props.btnactive === "active" ? "rgb(51,149,255)" : "rgb(0,0,0)",
    background: (props) =>
      props.btnactive === "active"
        ? "linear-gradient(0deg, rgba(51,149,255,1) 0%, rgba(3,224,255,1) 100%)"
        : "#fff",
    borderRadius: "50px",
    color: (props) => (props.btnactive === "active" ? "white" : "#333"),
    height: 40,
    padding: "0 30px",
    border: "1px solid rgb(229,227,221)",
    [theme.breakpoints.down("md")]: {
      height: 40,
      padding: "0 20px",
    },
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    textTransform: "capitalize",
    "&:hover": {
      cursor: "pointer",
    },
  },
}))((props) => <Button {...props} />);
