/** @format */

import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import "../assets/style.css";
import Basic from "./Basicsold";
import Tiers from "./Tiers";
import Account from "../pages/creator/Account";
import CreatorProfileAccount from "../pages/creator/CreatorProfileAccount";
import { useAuthContext } from "../context/AuthContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const { getUserData, user: authUser } = useAuthContext();
  const [user, setUser] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const changeTab = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const freshData = () => {
    setRefresh(!refresh);
  };

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getUserData()
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.status === 404) {
        //   setLoading(true);
        // }
      });

    setLoading(false);
  }, [refresh]);

  if (loading) {
    return (
      <div>
        <h3>Loading....</h3>
      </div>
    );
  }

  return (
    <Toolbar sx={{ padding: "1%" }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            centered
          >
            <Tab
              label="Basics"
              {...a11yProps(0)}
              style={{ fontVariant: "normal" }}
            />
            <Tab label="Tiers" {...a11yProps(1)} />
            <Tab label="Account Settings" {...a11yProps(2)} />
            {/* <Tab label='Getting Paid' {...a11yProps(2)} />
            
            <Tab label='Preview' {...a11yProps(4)} /> */}
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Basic
            changeTab={changeTab}
            user={user}
            generalInfo={authUser.role === "user" ? user : user.user_info}
            freshData={freshData}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Tiers changeTab={changeTab} user={user} />
        </TabPanel>

        <TabPanel value={value} index={2}>
          {authUser.role === "user" ? (
            <Account user={user} freshData={freshData} />
          ) : (
            <Account user={user.user_info} freshData={freshData} />
          )}
        </TabPanel>
      </Box>
    </Toolbar>
  );
}
