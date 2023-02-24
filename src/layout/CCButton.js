import Button from "@mui/material/Button";

import { withStyles } from "@mui/styles";

export const CButton = withStyles((theme) => ({
  root: {
    background: (props) => (props.bgcolor ? props.bgcolor : "rgb(51,149,255)"),
    background: (props) =>
      props.bgcolor
        ? props.bgcolor
        : "linear-gradient(0deg, rgba(51,149,255,1) 0%, rgba(3,224,255,1) 100%)",
    borderRadius: "50px",
    border: (props) => (props.border ? "1px solid rgb(229,227,221)" : 0),
    color: (props) => (props.textcolor ? props.textcolor : "white"),
    fontWeight: "bold",
    height: 48,
    marginTop: (props) => (props.ct ? props.ct : "10px"),
    padding: "0px 30px",
    // [theme.breakpoints.down('md')]: {
    //   height: 28,
    //   padding: '0px 20px',
    // },
    //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    "&:hover": {
      cursor: "pointer",
    },
  },
  label: {
    textTransform: "capitalize",
    fontSize: "1.072rem",
  },
}))((props) => <Button {...props} />);
