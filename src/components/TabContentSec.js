/** @format */

import * as React from "react";
import { BaseUrl } from "../helpers/Constant.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AiOutlineDownCircle } from "react-icons/ai";
import { useAuthContext } from "../context/AuthContext";
import { useBlogContext } from "../context/PostBlogContext";
import axios from "axios";
import Post from "./Post";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const handleClick = (event) => {};

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PostTabs() {
  const mounted = React.useRef(false);
  const [value, setValue] = React.useState(0);
  const [type, setType] = React.useState(1);
  const [page, setPage] = React.useState({
    public_page: 1,
    pantpoe_page: 1,
    creator_page: 1,
  });
  const {
    sendGetRequest,
    loading,
    setLoading,
    postType,
    reloading,
    newPosts,
    setQueryPage,
    setNewPost,
  } = useBlogContext();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleScroll = (event, indexData, pageIndex) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;

    // console.log("height", scrollHeight);
    // console.log("top", Math.round(scrollTop));
    // console.log("client", clientHeight);
    // console.log(Math.round(scrollHeight - scrollTop));
    if (clientHeight + scrollTop >= scrollHeight - 2) {
      // TO SOMETHING HERE
      // console.log("Reached bottom");
      setValue(indexData);
      setPage((oldPage) => ({
        ...oldPage,
        [pageIndex]: oldPage[pageIndex] + 1,
      }));
      setNewPost(true);
    }
  };

  const loadPosts = async () => {
    setLoading(true);
    if (value === 0) {
      sendGetRequest("public-content", page.public_page);
    }
    if (value === 1) {
      sendGetRequest("pantpoe-content", page.pantpoe_page);
    }
    if (value === 2) {
      sendGetRequest("subscribe-content", page.creator_page);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newPosts) return;
    if (loading) return;
    // setPage((oldPage) => oldPage + 1);
  }, [newPosts]);

  React.useEffect(() => {
    loadPosts();
  }, [value, reloading, page]);

  if (loading) {
    return "loading...";
  }

  return (
    <Box sx={{ width: "100%" }} className="postcontainer">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab label="Public" {...a11yProps(0)} />
          <Tab label="Pantpoe only " {...a11yProps(1)} />
          <Tab
            label="Show All Creator"
            icon={<AiOutlineDownCircle fontSize={"large"} />}
            iconPosition="end"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}
        pageIndex={"public_page"}
        className="scrollhost"
        onScroll={(e) => handleScroll(e, 0, "public_page")}
      >
        {postType["public-content"].data.map((post) => (
          <Post key={post.id} id={post.id} post={post} />
        ))}{" "}
        {postType["public-content"].data.length === 0 && "no data avaliable"}
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        pageIndex={"pantpoe_page"}
        className="scrollhost"
        onScroll={(e) => handleScroll(e, 1, "pantpoe_page")}
      >
        {postType["pantpoe-content"].data.map((post) => (
          <Post key={post.id} id={post.id} post={post} />
        ))}
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        pageIndex={"createor_page"}
        className="scrollhost"
        onScroll={(e) => handleScroll(e, 2, "createor_page")}
      >
        {postType["subscribe-content"].data.map((post) => (
          <Post key={post.id} id={post.id} post={post} />
        ))}
      </TabPanel>
    </Box>
  );
}
