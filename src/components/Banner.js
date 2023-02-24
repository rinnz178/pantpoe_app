/** @format */

import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import banner from "../assets/images/banner.png";

const useStyles = makeStyles((theme) => ({
  banner: {
    height: "500px",

    backgroundImage: `linear-gradient( rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${banner})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const Banner = (props) => {
  const classes = useStyles();
  return <Box className={classes.banner}></Box>;
};

export default Banner;
