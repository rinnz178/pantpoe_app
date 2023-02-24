/** @format */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomButtonWhite } from "../../layout/CutomButtonWhite";
import { CustomButton } from "../../layout/CutomerButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Avatar,
  Card,
  CardContent,
  TextField,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Paper,
  Switch,
  Box,
  Toolbar,
  Tooltip,
  Typography,
  Tabs,
  Tab,
  FormGroup,
} from "@mui/material";
import PropTypes from "prop-types";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useSubscriptionContext } from "../../context/SubscriptionContext";
import moment from "moment";
import axios from "axios";
import { BaseUrl } from "../../helpers/Constant";
import { useAuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  subTitle: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  tierSection: {
    display: "grid",
    gridTemplateColumns: "auto auto",
  },
  active: {
    backgroundColor: "#eaeaea",
  },
}));

//Tab Start
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
//Tab End
const statusArray = [
  { label: "Active", id: 1 },
  { label: "New", id: 3 },
  { label: "Cancelled", id: 2 },
];

const RSFilter = (props) => {
  const classes = useStyles();
  const { getSubscriptions, subscriptions } = useSubscriptionContext();
  const { token } = useAuthContext();

  //Tab Start
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    statusValue: [],
    tierValue: [],
    joinDate: {},
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let getData = true;
    if (getData) {
      getSubscriptions();
      setState(props.filterOption);
    }

    return () => {
      getData = false;
      setState({});
    };
  }, [props.filterOption]);

  const statusChange = (statusId) => {
    const { statusValue } = state;
    let find = statusValue.indexOf(statusId);

    if (find > -1) {
      statusValue.splice(find, 1);
    } else {
      statusValue.push(statusId);
    }
    setState((prev) => ({
      ...prev,
      statusValue,
    }));
  };

  const tierSelected = (tierId) => {
    const { tierValue } = state;
    let find = tierValue.indexOf(tierId);

    if (find > -1) {
      tierValue.splice(find, 1);
    } else {
      tierValue.push(tierId);
    }
    setState((prev) => ({
      ...prev,
      tierValue,
    }));
  };

  const joinDateChange = (name) => {
    // let dateobj = {};
    const joinDate = { ...state };
    joinDate.name = name;

    // if (name === "thisWeek") {
    //   dateobj = getBycurrentWeek();
    // } else if (name === "lastWeek") {
    //   dateobj = getByLastWeek();
    // } else if (name === "thisMonth") {
    //   dateobj = getByThisMonth();
    // } else {
    //   dateobj = getByLastMonth();
    // }
    // console.log("worling");

    setState((prev) => ({
      ...prev,
      joinDate,
    }));
  };

  const applyFilter = () => {
    props.getFilterOption(state);
  };

  const saveFilter = () => {
    let formData = new FormData();
    formData.append("status", state.statusValue);
    formData.append("tiers", state.tierValue);
    formData.append("this_week", state.joinDate.name === "thisWeek" ? 1 : 0);
    formData.append("last_week", state.joinDate.name === "lastWeek" ? 1 : 0);
    formData.append("this_month", state.joinDate.name === "thisMonth" ? 1 : 0);
    formData.append("last_month", state.joinDate.name === "lastMonth" ? 1 : 0);
    formData.append("fdate", state.joinDate.start);
    formData.append("tdate", state.joinDate.end);

    axios({
      method: "post",
      url: `${BaseUrl}/filter/`,
      data: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data) {
          props.filterRefresh();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    //drawer start
    <Box
      sx={{ width: 350 }}
      // role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{ padding: "20px" }}>
        <Grid container>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <IconButton onClick={props.toggleDrawer("right", false)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            centered
            variant="fullWidth">
            <Tab label="All filters" {...a11yProps(0)} />
            <Tab label="Saved filters" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  variant="subtitle1"
                  display="inline"
                  className={classes.subTitle}>
                  Status
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormGroup>
                  {statusArray.map((status, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={
                            state.statusValue.includes(status.id) ? true : false
                          }
                        />
                      }
                      label={status.label}
                      className={classes.subTitle}
                      onChange={() => statusChange(status.id)}
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </Box>

          <Divider />
          <Box>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  variant="subtitle1"
                  display="inline"
                  className={classes.subTitle}>
                  Tiers
                </Typography>
              </Grid>

              <FormGroup className={classes.tierSection}>
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.tierValue.includes("all") ? true : false}
                    />
                  }
                  label="All Tiers"
                  className={classes.subTitle}
                  onChange={() => tierSelected("all")}
                /> */}
                {subscriptions.map((tier, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={
                          state.tierValue.includes(tier.id) ? true : false
                        }
                      />
                    }
                    label={tier.level}
                    className={classes.subTitle}
                    onChange={() => tierSelected(tier.id)}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Box>
          <Box>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  variant="subtitle1"
                  display="inline"
                  className={classes.subTitle}>
                  Benefits
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  variant="subtitle1"
                  display="inline"
                  className={classes.subTitle}>
                  All benefits to your tiers to acces the filter.{" "}
                  <Link
                    to="#"
                    className={classes.linkBtn}
                    sx={{ float: "right" }}>
                    Learn more
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box>
            <Grid container rowSpacing={1}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  variant="subtitle1"
                  display="inline"
                  className={classes.subTitle}>
                  Join Date
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <CustomButtonWhite
                  size="small"
                  btnactive={state.joinDate.name === "thisWeek" ? "active" : ""}
                  className={classes.customButtonWhite}
                  onClick={() => joinDateChange("thisWeek")}>
                  This week
                </CustomButtonWhite>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <CustomButtonWhite
                  size="small"
                  btnactive={state.joinDate.name === "lastWeek" ? "active" : ""}
                  className={classes.customButtonWhite}
                  onClick={() => joinDateChange("lastWeek")}>
                  Last week
                </CustomButtonWhite>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <CustomButtonWhite
                  size="small"
                  btnactive={
                    state.joinDate.name === "thisMonth" ? "active" : ""
                  }
                  className={classes.customButtonWhite}
                  onClick={() => joinDateChange("thisMonth")}>
                  This month
                </CustomButtonWhite>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <CustomButtonWhite
                  size="small"
                  btnactive={
                    state.joinDate.name === "lastMonth" ? "active" : ""
                  }
                  className={classes.customButtonWhite}
                  onClick={() => joinDateChange("lastMonth")}>
                  Last month
                </CustomButtonWhite>
              </Grid>
              <Grid item xs={12} sm={12} md={12} marginTop={3} marginBottom={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={
                      state.joinDate.start === ""
                        ? moment()
                        : state.joinDate.start
                    }
                    onChange={(e) => {
                      let joinDate = state;

                      joinDate.name = "";
                      joinDate.start = moment(e).format("YYYY-MM-DD");

                      setState((prev) => {
                        return { ...prev, joinDate };
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={12} marginBottom={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date"
                    value={
                      state.joinDate.end === "" ? moment() : state.joinDate.end
                    }
                    onChange={(e) => {
                      let joinDate = state;

                      joinDate.name = "";
                      joinDate.end = moment(e).format("YYYY-MM-DD");

                      setState((prev) => {
                        return { ...prev, joinDate };
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box>
            <Grid container spacing={2} marginTop={1}>
              <Grid item xs={2} sm={2} md={2}></Grid>
              <Grid item xs={5} sm={5} md={5}>
                <CustomButtonWhite
                  size="small"
                  btnactive=""
                  onClick={saveFilter}
                  className={classes.customButtonWhite}>
                  Save filters
                </CustomButtonWhite>
              </Grid>
              <Grid item xs={5} sm={5} md={5}>
                <CustomButton
                  size="small"
                  onClick={applyFilter}
                  className={classes.customButtonWhite}>
                  Apply filters
                </CustomButton>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {props.filterData &&
            props.filterdata?.map((item, index) => {
              return (
                <ListItemButton
                  component="div"
                  key={index}
                  className={
                    props.selectedSaveFilter === item.id ? classes.active : ""
                  }>
                  <ListItemText
                    primary={`Filter-(${item.id})`}
                    onClick={() => props.appliedFilterById(item.id)}
                  />
                  <IconButton
                    aria-label="Example"
                    onClick={() => props.deleteFilter(item.id)}>
                    <RemoveCircleOutlineIcon style={{ color: "#ff0000" }} />
                  </IconButton>
                </ListItemButton>
              );
            })}
        </TabPanel>
      </Box>
      <Divider />
    </Box>
    //end here
  );
};

export default RSFilter;
