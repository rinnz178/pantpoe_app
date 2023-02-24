/** @format */

import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, Grid, Accordion } from "@mui/material";
import Accordian from "./../../components/Accordian";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { BaseUrl } from "../../helpers/Constant";
import { CButton } from "../../layout/CCButton";
import talking from "./../../assets/talking.jpeg";
const useStyles = makeStyles((theme) => ({
  sectionOne: {
    background: "rgb(51,149,255)",
    background:
      "linear-gradient(0deg, rgba(51,149,255,1) 0%, rgba(3,224,255,1) 100%)",
    minHeight: "40vh",
    display: "grid",
    gridTemplateColumns: "15% 90%",
    placeItems: "start",
    color: "#fff",
  },
  firstWrapper: {
    gridColumnStart: 2,
    alignSelf: "center",
  },
  wrapper: {
    paddingTop: "10vh",
    display: "grid",
    placeItems: "center",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      padding: "10px",
    },
    "& h2": {
      textAlign: "center",
    },
  },
  container: {
    width: "90vw",
    maxWidth: "1000px",
    textAlign: "start",
    height: "auto",
    padding: "20px",

    [theme.breakpoints.only("xs")]: {
      padding: "5px",
    },
  },
  subTitle: {
    color: "rgb(227,229,221)",
  },
  subTitleBold: {
    color: "#83857f",
    paddingBottom: "4vh",
  },

  sectionTwo: {},
  tabSection: {},
  titleName: {
    fontWeight: "700",
    fontSize: "1.625em",
    marginBottom: "1em",
  },

  colorBg: {
    color: "#2196f3",
  },
  colorBgBig: {
    color: "#1e85d7",
  },
  imgSection: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
}));
const TermsAndCondition = () => {
  const classes = useStyles();
  const { token } = useAuthContext();
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const controller = new AbortController();
    const headers = {
      Authorization: `Bearer ${token}`,
      //   "My-Custom-Header": "foobar",
    };
    async function anyFunction() {
      await axios
        .get(`${BaseUrl}/term-condition`, { headers })
        .then((res) => {
          if (res.status === 200) {
            setRows(res.data.term_conditions);
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              console.log("no data found!");
            }
          }
        });
    }
    anyFunction();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <Box>
      <Box className={classes.sectionOne}>
        <Grid className={classes.firstWrapper}>
          <Typography variant="h6" component={"div"}>
            Terms and Conditions
          </Typography>
          <Typography
            variant="h3"
            component={"div"}
            className={classes.colorBgBig}>
            Help Center
          </Typography>
          <Typography
            variant="subtitle2"
            component={"div"}
            className={classes.subTitle}>
            Welcome to Pantpoethu's terms and conditions
          </Typography>
        </Grid>
      </Box>
      <Box className={classes.wrapper}>
        <Box className={classes.container}>
          <Grid container className={classes.sectionTwo}>
            <Grid
              item
              display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
              sm={0}
              md={3}>
              <img className={classes.imgSection} src={talking} alt="" />
            </Grid>
            <Grid item xs={0} sm={0} md={1}></Grid>
            <Grid item xs={12} sm={12} md={8}>
              {rows.map((item, index) => (
                <Box>{item.content}</Box>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default TermsAndCondition;
