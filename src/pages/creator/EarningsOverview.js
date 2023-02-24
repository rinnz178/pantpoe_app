import React from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Card, CardContent, TextField } from "@mui/material";
import { CustomButtonNormal } from "../../layout/CutomButtonNormal";
import Paper from "@material-ui/core/Paper";
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
import { Link } from "react-router-dom";
import { useSubscriptionContext } from "./../../context/SubscriptionContext";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { BaseUrl, getByThisMonth } from "../../helpers/Constant";
import moment from "moment";

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
      width: "125px",
    },
    customButton: {
      width: "160px",
    },
  },
  [theme.breakpoints.down("md")]: {
    container: {
      margin: "10px",
    },
    alignStart: {
      textAlign: "center",
    },
    alignEnd: {
      textAlign: "center",
    },
    customButtonWhite: {
      width: "170px",
    },
    customButton: {
      width: "170px",
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
}));
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
const EarningsOverview = () => {
  const { token } = useAuthContext();
  const classes = useStyles();
  const [reload, setReload] = React.useState(false);
  const { getEarningOverview, getSubscriptions, subscriptions } =
    useSubscriptionContext();
  const { getUserData } = useAuthContext();
  const [rating, setRating] = React.useState([]);
  const [paymentType, setPaymentType] = React.useState([]);
  const [state, setState] = React.useState({
    ratingapi: [],
    bank_info: [],
    selectedBank_info: "",
    paymentType: "",
    bankAccount: "",
    bankAccountName: "",
    total_earning: 0,
    current_month_total_earning: 0,
  });

  const data = [
    { argument: "Bronze", value: 30 },
    { argument: "Silver", value: 60 },
    { argument: "Gold", value: 10 },
    { argument: "Diamond", value: 50 },
  ];
  const [age, setAge] = React.useState("");
  const modifyPriceDomain = () => [0, 110];

  const onSelectionChange = (event) => {
    const { name, value } = event.target;
    let result = state.bank_info.filter((i) => i.payment_type.id === value)[0];
    if (result) {
      setState((prev) => ({
        ...prev,
        selectedBank_info: result.id,
        paymentType: value,
        bankAccount: result.account_no,
        bankAccountName: result.account_name,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        paymentType: value,
        bankAccount: "",
        bankAccountName: "",
        selectedBank_info: "",
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    const controller = new AbortController();

    getSubscriptions();
    let getData = getEarningOverview();
    getUserData()
      .then((res) => {
        let totalsubscriptions = res.data.subscriptions;

        let total_earning = totalsubscriptions.reduce((a, b) => {
          return { subscription_fee: a.subscription_fee + b.subscription_fee };
        });

        totalsubscriptions = totalsubscriptions.filter((i) => {
          return (
            new Date(i.join_date).getTime() > getByThisMonth().start &&
            new Date(i.join_date).getTime() < getByThisMonth().end
          );
        });

        let current_month_total_earning = totalsubscriptions.reduce((a, b) => {
          return { subscription_fee: a.subscription_fee + b.subscription_fee };
        });

        setState((prev) => ({
          ...prev,
          total_earning: total_earning.subscription_fee,
          current_month_total_earning:
            current_month_total_earning.subscription_fee,
        }));
      })
      .catch((error) => console.log(error));

    let realdata = { level: "", value: "" };
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
    // let obj = response.map((r) => ({
    //   argument: r.subscription_plan.level,
    //   value: r.total,
    // }));
    // setRating(obj);

    return () => {
      controller.abort();
    };
  }, []);

  const getPaymentType = async () => {
    const response = await axios({
      method: "get",
      url: `${BaseUrl}/payment-type`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  };

  const getBankInfo = async () => {
    const response = await axios({
      method: "get",
      url: `${BaseUrl}/bank-info`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  };

  React.useEffect(() => {
    const controller = new AbortController();
    let getData = getPaymentType();
    getData
      .then((res) => {
        if (res.data.success) {
          let response = res.data.payment_types;
          setPaymentType(response);
        }
      })
      .catch((error) => console.log(error));

    const bankInfo = getBankInfo();
    bankInfo
      .then((res) => {
        //console.log(res.data.bank_info);
        if (res.data.success) {
          let result = res.data.bank_info;

          setState((prev) => {
            return {
              ...prev,
              bank_info: result,
            };
          });
        }
      })
      .catch((error) => console.log(error));

    return () => {
      controller.abort();
    };
  }, [reload]);

  const addBankInfo = async () => {
    let formData = new FormData();
    formData.append("payment_type_id", state.paymentType);
    formData.append("account_no", state.bankAccount);
    formData.append("account_name", state.bankAccountName);
    await axios({
      method: "post",
      url: `${BaseUrl}/bank-info`,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const updateBankinfo = async () => {
    let formData = new FormData();
    const { bank_info } = state;

    formData.append("payment_type_id", state.paymentType);
    formData.append("account_no", state.bankAccount);
    formData.append("account_name", state.bankAccountName);
    formData.append("_method", "put");
    await axios({
      method: "post",
      url: `${BaseUrl}/bank-info/${state.selectedBank_info}`,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        setReload(!reload);
      })
      .catch((error) => console.log(error));
  };

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

  return (
    <Box className={classes.container} style={{ margin: "25px" }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={8}>
          <Box className={classes.boxMargin}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={9} style={{ textAlign: "start" }}>
                <Typography gutterBottom variant="h6" display="inline">
                  Earnings Overview
                </Typography>
              </Grid>

              <Grid
                item
                xs={6}
                sm={6}
                md={3}
                style={{ textAlign: "end", display: "none" }}
              >
                <CustomButtonNormal
                  size="small"
                  className={classes.customButtonWhite}
                  style={{ height: "40px" }}
                >
                  <Link
                    to="/creator/earnings-overview-detail"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Detail
                  </Link>
                </CustomButtonNormal>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={4} sm={4} md={4}></Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={8}>
          <Box className={classes.boxMargin}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Paper>
                  {state.ratingapi && (
                    <Chart data={ratingchart(state.ratingapi, subscriptions)}>
                      <ValueScale
                        name="price"
                        modifyDomain={modifyPriceDomain}
                      />
                      <ArgumentAxis />
                      <ValueAxis max={2000} labelComponent={PriceLabel} />

                      <BarSeries valueField="value" argumentField="argument" />
                      <Title text="Earning Report" />
                      <Animation />
                    </Chart>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.boxMargin} style={{ marginTop: "25px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8} className={classes.alignStart}>
                <Typography
                  gutterBottom
                  variant="h6"
                  className={classes.subTitle}
                >
                  Tiers &{" "}
                  <span style={{ color: "rgb(51, 149, 255)" }}>(Pricing)</span>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  className={classes.subTitle}
                >
                  Total of this month = {state.current_month_total_earning} Ks
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  className={classes.subTitle}
                >
                  Total = {state.total_earning} Ks
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                style={{ display: "none" }}
                className={classes.alignEnd}
              >
                <CustomButtonNormal
                  size="small"
                  className={classes.customButton}
                  style={{ height: "40px" }}
                >
                  Edit Your Bank Information
                </CustomButtonNormal>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  gutterBottom
                  variant="h6"
                  className={classes.subTitle}
                  style={{ color: "red" }}
                >
                  * Your earnings will delivered to your Bank account at the end
                  of each month.*
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <Box className={classes.header}>
            <Card className="card">
              <CardContent className="cardcontent">
                <Grid container>
                  <Grid
                    item
                    xs={2}
                    sm={2}
                    md={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      variant="subtitle1"
                      display="inline"
                      style={{ fontWeight: "bold" }}
                    >
                      Bank
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <div>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">
                          Bank
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Age"
                          value={state.paymentType}
                          name="paymentType"
                          onChange={onSelectionChange}
                          className={classes.inputField}
                        >
                          {paymentType.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="center"
                    alignItems="center"
                    className={classes.cusFormInput}
                  >
                    <label className="input-label" htmlFor="bankAccount">
                      Bank Account
                    </label>
                    <TextField
                      id="bankAccount"
                      type="number"
                      value={state.bankAccount}
                      name="bankAccount"
                      onChange={handleChange}
                      className={classes.inputField}
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="center"
                    alignItems="center"
                    className={classes.cusFormInput}
                  >
                    <label className="input-label" htmlFor="bankAccountName">
                      Bank Account Name
                    </label>
                    <TextField
                      id="bankAccountName"
                      type="text"
                      value={state.bankAccountName}
                      name="bankAccountName"
                      onChange={handleChange}
                      className={classes.inputField}
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    display={"none"}
                    justifyContent="center"
                    alignItems="center"
                    className={classes.cusFormInput}
                  >
                    <label className="input-label" htmlFor="otp">
                      Enter OTP
                    </label>
                    <TextField
                      id="otp"
                      type="number"
                      name="otp"
                      className={classes.inputField}
                      fullWidth
                      height={100}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="center"
                    alignItems="center"
                    className={classes.cusFormInput}
                  >
                    <Box>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          justifyContent="flex-end"
                          alignItems="center"
                          style={{ textAlign: "end" }}
                        >
                          {state.selectedBank_info.length === "" && (
                            <CustomButtonNormal
                              onClick={addBankInfo}
                              size="small"
                              className={classes.customButtonWhite}
                            >
                              Confirm
                            </CustomButtonNormal>
                          )}
                          {state.selectedBank_info.length !== "" && (
                            <CustomButtonNormal
                              onClick={updateBankinfo}
                              size="small"
                              className={classes.customButtonWhite}
                            >
                              Update Bank Info
                            </CustomButtonNormal>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EarningsOverview;
