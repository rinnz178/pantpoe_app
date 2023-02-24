/** @format */

import React from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { coverphoto, socialIcons } from "../assets/data.js";
import DOMPurify from "dompurify";
import {
  Box,
  Avatar,
  Typography,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { CButton } from "./../layout/CCButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { FaWifi } from "react-icons/fa";
import { BiChat } from "react-icons/bi";
import { RiHeartsLine } from "react-icons/ri";
import CircleIcon from "@mui/icons-material/Circle";
import { getFullUrl, profileUrl } from "../helpers/Constant.js";
import { PostBlogProvider } from "../context/PostBlogContext";
import TabContents from "../components/TabContentSec";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Divider } from "@mui/material";
import { useTranslation } from "../languages";



const useStyles = makeStyles((theme) => ({
  container: {
    // display: 'grid',
    // gridTemplateColumns: '1fr',
    // placeContent: 'center',
    // padding: '0px 10px',
  },
  coverPhoto: {
    background: `url(${coverphoto})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "50vh",
    [theme.breakpoints.down("md")]: {
      height: "200px",
    },
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  profilePhoto: {
    position: "absolute",
    bottom: "0px",
    marginBottom: "-28px",
    width: "8rem",
    height: "8rem",
    border: "3px solid #fff",
  },
  accinfo: {
    marginTop: "4vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& h3": {
      marginBottom: 0,
    },
  },
  membershipSec: {
    // display: grid,
    // gridTemplateColumns: 'repeat(3, fr)',
    // boxSizing: 'border-box',
    // gridAutoRows: '20vh',
    padding: "0px 20px",
    marginTop: "20px",
  },
  tierCard: {
    padding: "20px",
    display: "flex",
    rowGap: "20px",
    flexDirection: "column",
    alignItems: "center",
    "& h1,h4": {
      marginBottom: 0,
    },
    "& span": {
      textTransform: "uppercase",
      fontWeight: "400",
    },
  },
  blogtitle: {
    fontSize: "2rem",
    fontWeight: "400 !important",
    textAlign: "center",
    marginBottom: "1rem",
  },

  socialInfo: {
    marginTop: "5vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px 0px",
    },
  },
  followers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px 20px 0px 30px",
    "& h4": {
      marginBottom: 0,
      marginTop: "8px",
      fontSize: "1.8rem",
      fontWeight: "bold",
      fontFamily: "monospace",
      display: "flex",
      alignSelf: "center",
    },
    "& span": {
      fontSize: "1rem",
      fontWeight: "bold",
      fontFamily: "monospace",
    },
    [theme.breakpoints.only("xs")]: {
      //padding: '0px 25px',
    },
  },
  btnoptions: {
    display: "flex",

    [theme.breakpoints.only("xs")]: {
      marginTop: "8px",
    },

    "& .MuiButton-root": {
      marginRight: "3px",
    },
  },
  popularCommunity: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "8vh 35vw 5vh",
    [theme.breakpoints.down("sm")]: {
      padding: "8vh 25vw 5vh",
    },
  },
  flyers: {
    padding: "0px 20px",
  },

  spot: {
    position: "absolute",
    display: "block",
    margin: "auto",
    top: "29vh",
    width: "100%",
    height: 45,
    color: "#fff",
    [theme.breakpoints.down("md")]: {
      top: "33vh",
    },
  },
  BtnContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gridAutoRows: "30vh",
    border: "1px solid rgb(229,227,221)",
    padding: 20,

    "&>:nth-child(1)": {
      borderRight: "1px solid rgb(229,227,221)",
      borderBottom: "1px solid rgb(229,227,221)",
    },
    "&>:nth-child(2)": {
      borderBottom: "1px solid rgb(229,227,221)",
    },
    "&>:nth-child(3)": {
      borderRight: "1px solid rgb(229,227,221)",
    },
    "&>:nth-child(4)": {
      //borderTop: '1px solid rgb(229,227,221)',
    },
    position: "relative",
    [theme.breakpoints.down("md")]: {
      gridAutoRows: "34vh",
    },
  },
  BtnTools: {
    display: "grid",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "rgb(229,227,221)",
    },
    "& .MuiButton-root": {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent",
    },
  },
  toolIcon: {
    // width: 25,
    //height: 25,
    // backgroundColor: 'rgb(225,240,250)',
    //border: '1px solid rgb(225,240,250)',
    //borderRadius: '9999px',
    //padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
      fontSize: "5rem",
      color: "#3498db",
    },
    [theme.breakpoints.down("md")]: {
      "& svg": {
        fontSize: "3rem",
        color: "#3498db",
      },
    },

    // '&:hover': {
    //   cursor: 'pointer',

    //   '& svg': {
    //     color: '#333',
    //     fontSize: '3rem',
    //   },
    // },
  },
  iconText: {
    color: "#333",
    fontSize: "1rem",

    paddingTop: theme.spacing(1),
    display: "flex",
    alignSelf: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.728rem",
      textAlign: "center",
    },
  },
  bioSection: {
    width: "800px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      width: "300px",
    },
  },
}));

// const MyComponent = React.forwardRef((props, ref) = () =>
//   //  Spread the props to the underlying DOM element.
//    (
//     <div {...props} ref={ref}>
//       {props.children}
//     </div>
//   );
// );

const MyComponent = React.forwardRef((props, ref) => (
  <div ref={ref}>{props.children}</div>
));

const CreatorProfileView = ({ user }) => {
  const [creators, setCreator] = React.useState([]);

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  // const { joinPlan } = useAuthContext();
  // const [more, setMore] = React.useState(true);
  // const showMore = (e) => {
  //   e.preventDefault();
  //   setMore(!more);
  // };

  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data),
  });

  //start for share tooltip
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const {
    subscription_plans: plans,
    subscriptions_counts: supportCount,
    content_counts: post_count,
    user_info: { profile_image, cover_photo, bio, profile_url, socials },
  } = user;
  const { name, id: userid } = user.user_info.user;
  //end for share tooltip

  const joinPlanByid = (planid) => {
    history.push(`/join/${profile_url}/checkout/${planid}`);
  };

  const socialLinkSetup = (link) => {
    // let linkdata = "";

    // console.log(link);

    const data = socials.filter((i) => i.name === link);
    // console.log(data);
    if (data.length > 0) {
      window.open(data[0].link, "_blank");
    }
  };

  const moreDetail = (id) => {
    history.push(`/${profile_url}`);
  };

  // console.log(user);

  return (
    <Grid className={classes.container}>
      <div className={classes.info}>
        <div
          className={classes.coverPhoto}
          style={{ background: `url(${getFullUrl(cover_photo)})` }}
        >
          <Avatar
            className={classes.profilePhoto}
            src={getFullUrl(profile_image)}
            alt="profile"
          />
        </div>
        <Box className={classes.accinfo}>
          <h3>
            {name} ({profile_url})
          </h3>
          <div className={classes.bioSection}>
            <h5 dangerouslySetInnerHTML={sanitizedData(bio)} />
          </div>
        </Box>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 ">
          <Card className={classes.card}>
              <CardContent className={classes.cardcontent}>
                <Grid
                  p={2}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* <Avatar
                    alt="Remy Sharp"
                    src={getFullUrl(user.profile_image)}
                    sx={{ width: 80, height: 80 }}
                  /> */}
                  <span style={{marginTop:'10px'}} component="div">
                    <h5 style={{fontWeight:'bold'}}>{user.name}</h5>
                  </span>
                </Grid>
                <Divider />
                <Grid p={2}>
                  <h4>{t("supporting")}</h4>
                </Grid>
                <Divider />
                <Grid p={2}>
                  {creators.length > 0 || <span m={0}>{t("youAreNot")}</span>}

                  {creators.length > 0 &&
                    creators.map((item, index) => (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography
                          variant="body1"
                          component="div"
                          gutterBottom={false}
                        >
                          {item.creator.user_info.user.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          component="div"
                          gutterBottom={false}
                        >
                          ({item.creator.user_info.profile_url})
                        </Typography>
                      </Box>
                    ))}
                </Grid>
              </CardContent>
            </Card>
          </div>
          <div
            className="col-lg-9 col-md-9 col-sm-12"
            style={{
              position: "relative",
              height: "100vh",
              overflow: "scroll",
              marginBottom: "20px",
            }}
          >
            <PostBlogProvider>
              <TabContents />
            </PostBlogProvider>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default CreatorProfileView;
