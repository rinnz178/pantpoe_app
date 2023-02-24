/** @format */

import React from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Card, CardContent, TextField } from "@mui/material";
import { CustomButtonNormal } from "../../layout/CutomButtonNormal";
import Paper from "@mui/material/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Title,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, ValueScale } from "@devexpress/dx-react-chart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CutomButtonWhiteOutline } from "../../layout/CutomButtonWhiteOutline";
import { useSubscriptionContext } from "../../context/SubscriptionContext";
import { useAuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.up("md")]: {
    container: {
      margin: "25px",
    },
    alignStart: {
      textAlign: "start",
    },
    alignEnd: {
      textAlign: "end",
    },
    customButtonWhite: {
      width: "202px",
    },
  },
  [theme.breakpoints.down("md")]: {
    container: {
      margin: "4px",
    },
    alignStart: {
      textAlign: "center",
    },
    alignEnd: {
      textAlign: "center",
    },
    customButtonWhite: {
      width: "202px",
    },
  },
  customButton: {
    color: "#fff",
    height: "40px",
    padding: "0px 20px",
  },
  boxMargin: {
    margin: "10px",
  },
  subTitle: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  cusFormInput: {
    textAlign: "start",
    margin: "10px 0px",

    "& label": {
      color: "#333333",
    },
    "& .inputField": {
      margin: "0.5rem 0px",
      background: "rgb(245, 244, 242)",
      height: "40px",
    },
  },
  inputField: {
    margin: "0.5rem 0px",
    background: "rgb(245, 244, 242)",
  },
  activeLine: {
    color: "#3498db",
  },
}));
const initial_range_data = [
  { id: 1, range: "6 Months" },
  { id: 2, range: "1 Year Months" },
  { id: 3, range: "All" },
];
const makeLabel =
  (symbol, color) =>
  ({ text, style, ...restProps }) =>
    (
      <ValueAxis.Label
        text={`${text} ${symbol}`}
        style={{
          fill: color,
          ...style,
        }}
        {...restProps}
      />
    );
const PriceLabel = makeLabel("Ks", "#333");
const EarningsOverviewDetail = () => {
  const { getSubscriptions, getEarningOverview, subscriptions } =
    useSubscriptionContext();
  const { getUserData } = useAuthContext();
  // const [rating, setRating] = React.useState();
  const classes = useStyles();

  const data = [
    { argument: "Bronze", value: 30 },
    { argument: "Silver", value: 20 },
    { argument: "Gold", value: 10 },
    { argument: "Diamond", value: 50 },
  ];
  //   const [selected, setSelected] = React.useState(1);
  const [state, setState] = React.useState({
    range_date: initial_range_data,
    selected: 3,
    rating: [],
    ratingapi: [],
  });

  const ratingchart = (apiData, plans) => {
    // console.log(apiData);
    let model = { argument: "", value: 0 };
    let obj = [];
    plans.forEach((i, v) => {
      model.argument = i.level;
      apiData.forEach(function (j, v) {
        if (j.subscription_plan.id === i.id) {
          model.value = parseInt(j.total);
        }
        return false;
      });

      obj = [...obj, model];

      model = { argument: "", value: 0 };
    });

    return obj;
  };

  const handleChange = (id) => {
    setState((prev) => {
      return { ...prev, selected: id };
    });
  };

  React.useEffect(() => {
    const controller = new AbortController();
    getSubscriptions();

    return controller.abort();
  }, []);

  React.useEffect(() => {
    const controller = new AbortController();
    let getData = getEarningOverview(state.selected);

    getData
      .then((res) => {
        if (res.data.success) {
          let response = res.data.data;
          // setRating(ratingchart(res));
          setState((prev) => ({
            ...prev,
            ratingapi: response,
          }));
        }
      })
      .catch((error) => console.log(error));
    return () => {
      controller.abort();
    };
  }, [state.selected]);

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.boxMargin}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                xl={8}
                style={{ textAlign: "start" }}>
                <Typography gutterBottom variant="h6" display="inline">
                  Earnings Overview (Detail)
                </Typography>
              </Grid>

              <Grid
                item
                xs={6}
                sm={6}
                md={3}
                xl={2}
                style={{ textAlign: "start" }}>
                <CustomButtonNormal
                  size="small"
                  className={classes.customButtonWhite}
                  style={{ height: "40px" }}>
                  Download Monthly CSV
                </CustomButtonNormal>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={3}
                xl={2}
                style={{ textAlign: "end" }}>
                <CustomButtonNormal
                  size="small"
                  className={classes.customButtonWhite}
                  style={{ height: "40px" }}>
                  Download Detail CSV
                </CustomButtonNormal>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.boxMargin}>
            <Typography
              gutterBottom
              variant="h6"
              style={{ fontSize: "14px", justifyContent: "space-between" }}>
              Earnings are the amount of income you take from the money pledged
              tp you as a creator on Pantpoe. Earnings correspond to the time
              that PantPoe sucessfully processed your pledges and refunds,
              rather than the time when you performed the work or published paid
              posts.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.boxMargin}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Paper>
                  <Box className={classes.boxMargin}>
                    <Grid container>
                      <Grid
                        item
                        xs={3}
                        sm={3}
                        md={6}
                        style={{ textAlign: "start" }}>
                        <Box className={classes.boxMargin}>
                          <Typography
                            gutterBottom
                            variant="h6"
                            className={classes.subTitle}>
                            Earnings
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid
                        item
                        xs={9}
                        sm={9}
                        md={6}
                        style={{ textAlign: "end" }}>
                        <Box className={classes.boxMargin}>
                          {state.range_date.map((item, index) => (
                            <Typography
                              key={index}
                              onClick={() => handleChange(item.id)}
                              gutterBottom
                              variant="h6"
                              display="inline"
                              className={`${classes.subTitle} ${
                                state.selected === item.id
                                  ? classes.activeLine
                                  : ""
                              }`}
                              style={{ margin: "10px" }}>
                              {item.range}
                            </Typography>
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Chart data={ratingchart(state.ratingapi, subscriptions)}>
                    <ArgumentAxis />
                    <ValueAxis max={2000} labelComponent={PriceLabel} />

                    <Title text={"Earning Report"} />
                    <Animation />

                    <BarSeries valueField="value" argumentField="argument" />
                  </Chart>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EarningsOverviewDetail;
