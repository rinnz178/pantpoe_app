import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Grid, Typography, Box, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CustomButton } from "../../layout/CutomerButton";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useAuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10vh",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      maxWidth: "600px",
      display: "grid",
      placeItems: "start",
      padding: "8px",
    },
  },
  info: {},
  firstdiv: {
    border: "1px solid rgb(229,227,221) !important",
    borderRadius: "4px",
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  activePantpoe: {
    borderRight: "1px solid rgb(229,227,221)",
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      borderRight: "none",
      padding: "0px 0px  30px 16px",
      margin: "0px 0px  30px 0px",
      borderBottom: "1px solid rgb(229,227,221)",
    },
  },
  icon: {
    paddingRight: theme.spacing(1),
  },
  income: {
    paddingLeft: theme.spacing(2),
  },

  overview: {
    "& h4,p,a": {
      margin: 0,
    },
    "& h4": {
      fontSize: "1.625rem",
    },
    "& p": {
      marginBottom: theme.spacing(1),
    },
  },
  boxBorder: {
    borderRadius: "4px",
    border: "1px solid rgb(229,227,221)",
    padding: theme.spacing(2),
  },
  boxBordertwo: {
    borderRadius: "4px",
    border: "1px solid rgb(229,227,221)",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    "& h6 , div": {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    "& h6": {
      paddingBottom: theme.spacing(2),
    },
    "& div": {
      paddingTop: theme.spacing(1),
      textAlign: "center",
    },
  },
  mtop: {
    marginTop: theme.spacing(2),
  },
  messageBox: {
    padding: "24px",
    "& h6": {
      marginBottom: theme.spacing(2),
    },
  },
  smallTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    margin: 0,
  },
  actionIcon: {
    "& .MuiIconButton-root ": {
      backgroundColor: "rgb(229,227,221)",
    },
  },
}));

const CreatorHome = () => {
  const { getUserData } = useAuthContext();
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const gotoPostCreate = () => {
    history.push("/post-create");
  };
  React.useEffect(() => {
    setLoading(true);
    //calling user api
    getUserData()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, []);
  if (loading) {
    return "Loading...";
  }
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={12} md={2}></Grid>
        <Grid item container xs={12} sm={12} md={8}>
          <div className={classes.info}>
            <h1>Hi, aye chan oo!</h1>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={7}>
              <Typography variant="subtitle1">OVERVIEW</Typography>
              <Box className={classes.firstdiv}>
                <Box display="flex" className={classes.activePantpoe}>
                  <PeopleIcon className={classes.icon} fontSize="large" />
                  <Box className={classes.overview}>
                    <h4>0</h4>
                    <p>active pantpoes</p>
                    <Link to="/rsmanager">View Relationship manager</Link>
                  </Box>
                </Box>
                {/* inconme start */}
                <Box display="flex" className={classes.income}>
                  <MonetizationOnIcon
                    className={classes.icon}
                    fontSize="large"
                  />
                  <Box className={classes.overview}>
                    <h4>0</h4>
                    <p>per month</p>
                    <Link to="/creator/earnings-overview">
                      View Earning Overview
                    </Link>
                  </Box>
                </Box>
              </Box>

              {/* make post start */}

              <Typography variant="subtitle1" mt={5}>
                NEXT STEPS
              </Typography>
              <Box className={`${classes.messageBox} ${classes.boxBorder}`}>
                <h6 className={classes.smallTitle}>Need an idea for post?</h6>
                <ul>
                  <li>Music</li>
                  <li>Photography</li>
                  <li>Animation & illustrations</li>
                </ul>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Typography variant="subtitle1">RECENT ACTIVITY</Typography>
              <Box className={`${classes.messageBox} ${classes.boxBorder}`}>
                <h6 className={classes.smallTitle}>
                  No unread messages from patrons
                </h6>
                <Link>View Messages</Link>
              </Box>
              <Box className={`${classes.boxBordertwo} ${classes.mtop}`}>
                <h6 className={classes.smallTitle}>RECENT POSTS</h6>
                <Divider />
                <div>
                  <Typography variant="subtitle1" color="gray">
                    You haven't posted anything yet
                  </Typography>
                  <CustomButton onClick={gotoPostCreate}>
                    Make a post
                  </CustomButton>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={2}></Grid>
      </Grid>
    </>
  );
};

export default CreatorHome;
