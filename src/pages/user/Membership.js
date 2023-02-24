/** @format */

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import StickyHeadTable from "./../../layout/Table";
import BillHistoryTable from "./../../layout/BillHistoryTable";
import { useAuthContext } from "../../context/AuthContext";
import { useSubscriptionContext } from "../../context/SubscriptionContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "10px",
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
  tabSection: {},
  titleName: {
    fontWeight: "700",
    fontSize: "1.625em",
    marginBottom: "1em",
  },
}));

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
    style: { fontWeight: "600", fontSize: "1em" },
  };
}

export default function Membership() {
  const classes = useStyles();
  const { getUserSubscriptions, getBillHistory } = useSubscriptionContext();
  const [value, setValue] = React.useState(0);

  const [state, setState] = React.useState({
    tiers: [],
    purchases: [],
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const controller = new AbortController();
    getUserSubscriptions()
      .then((res) => {
        if (res.success) {
          setState((prev) => ({
            ...prev,
            tiers: res.data,
          }));
        }
      })
      .catch((error) => console.log(error));

    getBillHistory()
      .then((res) => {
        console.log(res);
        if (res.success) {
          setState((prev) => ({
            ...prev,
            purchases: res.data,
          }));
        }
      })
      .catch((error) => console.log(error));

    return () => controller.abort();
  }, [getUserSubscriptions, getBillHistory]);

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.container}>
        <Typography
          variant="h5"
          className={classes.titleName}
          component={"div"}
        >
          Manage memberships
        </Typography>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className={classes.tabSection}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Active MemberShips" {...a11yProps(0)} />
            <Tab label="Billing History" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {state.tiers && <StickyHeadTable data={state.tiers} />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {state.tiers && <BillHistoryTable data={state.purchases} />}
        </TabPanel>
      </Box>
    </Box>
  );
}
