/** @format */

import Button from "@mui/material/Button";

import { withStyles } from "@mui/styles";

export const CustomButtonWhite = withStyles((theme) => ({
  root: {
    background: (props) => (props.btnactive === "active" ? "#e4e2e2" : "white"),
    border: "gray 1px solid",
    borderRadius: "50px",
    color: "black",
    height: 48,
    padding: "0px 30px",
    [theme.breakpoints.down("md")]: {
      height: 28,
      padding: "0 20px",
    },
    textTransform: "capitalize",
    "&:hover": {
      cursor: "pointer",
    },
  },
  label: {
    textTransform: "capitalize",
    fontSize: "1.072rem",
  },
}))((props) => <Button {...props} />);
