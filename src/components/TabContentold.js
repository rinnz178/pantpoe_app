/** @format */

import * as React from "react";
import Pusher from "pusher-js";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AiOutlineDownCircle } from "react-icons/ai";
import { CustomButton } from "./../layout/CutomerButton";
import imgurl from "../assets/images/subscriptions.png";
import { Avatar } from "@mui/material";
import { getFullUrl } from "./../helpers/Constant";
import { useAuthContext } from "../context/AuthContext";
import { BaseUrl } from "./../helpers/Constant";
import axios from "axios";
import PostDetailView from "./../components/PostDetailView";
import moment from "moment";
import api from "./../services/apifinal.service";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    position: "absolute",
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 200,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiBox-root": {
      padding: 0,
      paddingTop: theme.spacing(1),
    },
  },
  creatorMenu: {
    position: "relative",
    padding: "2px",
    border: "1px solid rgb(229, 227, 221)",
    marginBottom: theme.spacing(1),
    color: "rgb(229, 227, 221)",
    backgroundImage: `linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc)`,
    backgroundPosition: `
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 9em`,
    backgroundSize: `
    5px 5px,
    5px 5px,
    1px 1.5em`,
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  creatorMenuTab: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  allposts: {
    backgroundPosition: "center 120px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    minHeight: "500px",
    border: "1px solid rgb(229, 227, 221)",
    borderRadius: "4px",
    textAlign: "center",
    padding: "0px !important",
    marginBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      minHeight: "500px",
    },
  },
  postCard: {
    padding: "20px",
  },
  accInfo: {
    display: "flex",
    justifyContent: "start",
    "& .MuiAvatar-root": {
      width: "50px",
      height: "50px",
    },
    "& h3": {
      fontWeight: "800",
      display: "flex",
      alignItems: "center",
      marginLeft: "16px",
      fontSize: "1.2rem",
    },
  },
  postInfo: {
    textAlign: "start",
    marginTop: "20px",
  },
  uploadFile: {
    margin: "8px 0px",
    padding: 0,
  },
  btnOptions: {
    display: "flex",
    justifyContent: "space-between",
    color: "#706c64",
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },

    "& p": {
      display: "flex",
      alignSelf: "center",
    },
  },
  postDetail: {
    position: "relative",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  shade: {
    position: "absolute",
    bottom: 0,
    height: "5rem",
    width: "100%",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)",
  },
  postContent: {
    height: "80px",
    overflow: "hidden",
  },
  // comment start

  commentInfo: {
    display: "flex",
    justifyContent: "space-between",
    "& a": {
      color: "#333",
    },
  },
  MainComment: {
    display: "flex",
    justifyContent: "space-between",
    gap: "3px",
    marginBottom: "1.3rem",
  },
  content: {
    display: "flex",
    justifyContent: "start",
    gap: "16px",
    flexGrow: 1,
  },
  commentDetail: {
    textAlign: "start",

    "& h4": {
      marginBottom: "10px",
      marginTop: "0px",
    },
    "& p": {
      fontSize: "0.978rem",
    },
    "& .MuiButtonBase-root": {
      padding: "10px 10px",
    },
  },
  commentSection: {
    padding: "20px",
    textAlign: "start",
    flexGrow: "1",
    "& h4": {
      marginBottom: "10px",
      marginTop: "0px",
    },
  },
  reply: {
    marginLeft: "3.75rem",
    display: "flex",
    justifyContent: "space-between",
  },
  replyInfo: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    gap: "10px",
  },
  replyDetail: {
    flexGrow: 1,
    textAlign: "start",
    "& h4": {
      marginBottom: "10px",
    },
  },
  count: {
    display: "flex",
    alignSelf: "flex-end",
    fontSize: "1rem",
    color: "#000",
  },
  hideReply: {
    display: "none",
  },
}));

/*const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));*/

//1 for all, 2 for public and 3 all creator

const BasicTabs = (props) => {
  // const {posts}=props;
  // console.log(posts);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [posts, setPost] = React.useState([]);
  const { token } = useAuthContext();
  const [changes, setChange] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [creators, setCreator] = React.useState([]);
  // const [postid, setPostid] = React.useState("");
  const changeData = () => {
    setChange(!changes);
  };

  const [selectedCreator, setSelectedCreator] = React.useState("");

  //console.log(posts);
  const history = useHistory();
  const classes = useStyles();
  const [firstView, setFirstView] = React.useState(false);

  const handleChange = (event, newValue) => {
    setSelectedCreator("");
    setValue(newValue);
    settype(newValue + 1);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [type, settype] = React.useState(1);

  const fetchData = async () => {
    try {
      // const response = axios({
      //   method: "post",
      //   url: `${BaseUrl}/comment-like/`,
      //   data: formData,
      //   headers: {
      //     Accept: "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // response.then((data) => {
      //   //  getPosts();
      // });
      return await new Promise((resolve, reject) => {
        // setTimeout(() => {
        //   let res = api.get("/content", { type: "all" });
        //   return resolve(res);
        // }, 10);
        let res = api.get("/content", { type: "all" });
        return resolve(res);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getData = () => {
    const res = fetchData();
    res.then((response) => {
      setData(response.data.data);
      setPost(response.data.data);
    });
    if (value === 2) {
      setCreator(props.creators);
    }
    if (selectedCreator) {
      setPost((prev) =>
        data.filter((item) => item.creator.id === selectedCreator)
      );
    } else {
      setPost(data);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    getData();

    return () => {
      setCreator([]);
    };
  }, [changes, value, selectedCreator, type]);

  const creatorChosen = (id) => {
    setSelectedCreator(id);
    handleClose();
  };

  React.useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("cbae929ae26fb6b1d072", {
      cluster: "ap1",
      encrypted: false,
    });
    const channel = pusher.subscribe("comment-channel");
    console.log(channel);
    channel.bind("pusher:subscription_succeeded", (data) => {
      console.log(data);
      console.log("now hello world");
    });
  });

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="basic tabs example">
          <Tab label="All posts" {...a11yProps(0)} />
          <Tab label="Pantpoe only posts" {...a11yProps(1)} />
          <Tab
            label="Show all creators "
            icon={
              <AiOutlineDownCircle fontSize={"large"} onClick={handleClick} />
            }
            iconPosition="end"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>

      <TabPanel posts={posts} value={value} index={0} className={classes.root}>
        {firstView && (
          <div
            className={`${classes.allposts}`}
            style={{ backgroundImage: `url(${imgurl})` }}>
            <p>
              <strong> Support</strong> or <strong> Follow</strong> creators to
              see posts in your feed
            </p>
            <CustomButton>Find your creator</CustomButton>
          </div>
        )}

        {loading && <h3>Loading...</h3>}

        {loading ||
          (posts &&
            posts
              .filter((post) => post.type === type)
              .map((item, index) => {
                return (
                  <div key={index}>
                    <PostDetailView changeData={changeData} post={item} />
                  </div>
                );
              }))}
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.root}>
        {/* <div className={`${classes.allposts}`}>
          <p>
            <strong> Support</strong> or <strong> Follow</strong> creators to
            see posts in your feed
          </p>
          <CustomButton>Find your creator</CustomButton>
        </div> */}
        {loading && <h3>Loading...</h3>}

        {loading ||
          (posts &&
            posts
              .filter((post) => post.type === type)
              .map((item, index) => {
                return (
                  <div key={index}>
                    <PostDetailView changeData={changeData} post={item} />
                  </div>
                );
              }))}
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.creatorMenuTab}>
        {posts.length <= 0 && (
          <div className={`${classes.allposts}`}>
            <p>
              <strong> Support</strong> or <strong> Follow</strong> creators to
              see posts in your feed
            </p>
            <CustomButton>Find your creator</CustomButton>
          </div>
        )}
        {loading && <h3>Loading...</h3>}

        {loading ||
          (posts &&
            posts
              .filter((post) => post.type === 3)
              .map((item, index) => {
                return (
                  <div key={index}>
                    <PostDetailView changeData={changeData} post={item} />
                  </div>
                );
              }))}
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}>
          {creators &&
            creators.map((item, index) => (
              <MenuItem
                onClick={() => creatorChosen(item.creator.id)}
                disableRipple
                key={index}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}>
                  <Avatar
                    alt={item.creator.user_info.user.name}
                    src={getFullUrl(item.creator.user_info.profile_image)}
                  />
                  <div style={{ marginLeft: "10px" }}>
                    <Typography
                      variant="body1"
                      component={"div"}
                      gutterBottom={false}>
                      {item.creator.user_info.user.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      component={"div"}
                      gutterBottom={false}>
                      ({item.creator.user_info.profile_url})
                    </Typography>
                  </div>
                </Box>
              </MenuItem>
            ))}
        </StyledMenu>
      </TabPanel>
    </Box>
  );
};

export default BasicTabs;
