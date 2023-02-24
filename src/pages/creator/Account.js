/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  Box,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  ButtonGroup,
  Button,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import JoditEditor from "jodit-react";
import Link from "@mui/material/Link";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import "../../assets/style.css";
import Avatar from "@mui/material/Avatar";
import { FiEdit3 } from "react-icons/fi";
import { makeStyles } from "@mui/styles";
import { CButton } from "../../layout/CCButton";
import { coverphoto } from "../../assets/data";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import SelectOption from "../../layout/SelectOption";
import { useHistory } from "react-router";
import moment from "moment";
import { useAuthContext } from "../../context/AuthContext";
import SocialBox from "../../components/socialBox";
import axios from "axios";
import { BaseUrl, changeSocials } from "../../helpers/Constant";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import PhoneInput from "react-phone-input-2";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import api from "../../services/apifinal.service";

import "react-phone-input-2/lib/style.css";
import Modal from "@mui/material/Modal";
import "../../assets/account_setting.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position:'fixed',
    marginTop: "3vh",
    height: "10vh",
    display: "grid",
    placeItems: "center",
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  container: {
    backgroundColor: "whitesmoke",
    borderRadius: "1vh",
    borderColor: "#f2f3f4",
    borderWidth: "3px",
    padding: "3vh",
    width: "90vw",
    maxWidth: "700px",
    textAlign: "center",
    height: "auto",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  boxer: {
    display: "flex",
    padding: "20px 25px",
    justifyContent: "flex-start",
    justifyItems: "center",
    alignItems: "baseline",
    "& .MuiAvatar-root": {
      display: "flex",
      alignSelf: "center",
      marginRight: theme.spacing(2),
    },
    "& h4": {
      display: "flex",
      alignSelf: "center",
      marginRight: theme.spacing(1),
      fontFamily: "Open Sans, sans-serif",
      fontSize: "1.3rem",
    },
    "& svg": {
      color: "rgb(229,227,221)",
      fontSize: "1.3rem",
      alignSelf: "center",
    },
  },
  cusFormInput: {
    textAlign: "start",
    padding: " 10px 0px",

    "& label": {
      color: "#333333",
      padding: "18px 0px",
      marginBottom: "8px",
    },
    "& .inputField": {
      margin: "0.5rem 0px",
      background: "rgb(245, 244, 242)",
    },
  },
  datePickupInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: theme.spacing(2),
    "& .MuiOutlinedInput-root #day,.MuiOutlinedInput-root #month": {
      width: "24px",
      backgroundColor: "white",
    },
    "& .MuiOutlinedInput-root #year": {
      width: "42px",
      backgroundColor: "white",
    },

    [theme.breakpoints.down("md")]: {
      marginTop: "10px",
    },

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      "& ~$mdsize": {
        margin: "0px 8px",
        display: "none",
      },
      "& .MuiOutlinedInput-root #day,.MuiOutlinedInput-root #month": {
        width: "100%",
      },
      "& .MuiOutlinedInput-root #year": {
        width: "100%",
      },
    },
  },
  xssize: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      alignSelf: "self-start",
    },
  },
  mdsize: {
    display: "inline",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  subtitle: {
    fontSize: "0.725rem",
    color: "#c9c8c4",
  },
  buttonGroup: {
    float: "right",
  },
  selectOption: {
    margin: "0px 8px!important",
  },
  cusFormControl: {
    "& .MuiFormControl-root ": {
      margin: "0px 0px 0px 0px !important",
    },
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cusOptions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coverphoto: {
    marginTop: "16px",
    height: "250px",
    width: "100%",
    backgroundImage: `url(${coverphoto})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  hrdiv: {
    margin: "20px 0px !important",
  },
  general: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    },
    gap: "15px",
  },
}));

const dob_validation = {
  day: 2,
  month: 2,
  year: 4,
};

// input formula=> (valu.length + 1)*8

const AccountSetting = ({ user, freshData }) => {
  const history = useHistory();
  const classes = useStyles();
  const editor = useRef(null);
  const [errors, setError] = useState({});
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const [validation, setValidation] = useState({});
  const [state, setState] = useState({
    list: [],
  });
  const [dob, setDob] = useState({});
  const { getRegions, token } = useAuthContext();

  const [regions, setRegion] = useState([]);
  const socialArray = [
    "facebook",
    "instagram",
    "youtube",
    "twitter",
    "twitch",
    "discord",
    "tiktok",
    "others",
  ];

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const places = ["yangon", "mandalay", "sagaing"];

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dateTransform = (num) => {
    if (Number(num) >= 1 && Number(num) <= 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

  const handlePhone = (value) => {
    setState((prev) => ({
      ...prev,
      phone_1: value,
    }));
  };
  const updateInfo = async () => {
    let dob = "";
    console.log(state?.day);
    if (state?.day && state?.month && state?.year) {
      dob = moment(`${state.month}-${state.day}-${state.year}`).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    // dob = moment(`${state.day}-${state.month}-${state.year}`).format(
    //   "YYYY-MM-DD HH:mm:ss"
    // );

    let formData = new FormData();
    formData.append("email", state.email);
    formData.append("phone_1", state.phone_1);
    formData.append("phone_2", state.phone_1);
    formData.append("socials", JSON.stringify(state.list));
    formData.append("gender", state.gender);
    formData.append("address", state?.address || "");
    formData.append("cover_photo", state?.cover);
    formData.append("profile_image", state?.profile);
    formData.append("profile_url", state?.profile_url);
    formData.append("bio", state?.bio);
    formData.append("region_id", state.region_id == 0 ? "" : state.region_id);
    formData.append("name", state.name);
    formData.append("dob", dob);

    await axios({
      method: "post",
      url: `${BaseUrl}/user/update`,
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        handleOpen();
      })
      .catch((error) => {
        if (error.response.status === 422) {
          let data = error.response.data.errors;
          setError(data);
        }
      });
  };

  const handleChange = (data) => {
    setState((prev) => ({
      ...prev,
      region_id: data,
    }));
  };

  const dobHandleChange = (e) => {
    const { value, name } = e.target;
    let message = "";
    const regExp = RegExp(/^[0-9]+$/);
    const status = !value || regExp.test(value);
    if (status) {
      const length = value.length;
      console.log(length);
      if (length > dob_validation[name]) {
        message = `only  ${dob_validation[name]} for ${name} accepted!`;
        setValidation((prev) => ({
          message,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          [name]: value,
        }));
        setValidation({});
      }
    } else {
      message = `only Number are accepted!`;
      setValidation((prev) => ({
        message,
      }));
    }
  };
  const submitLinks = (collection) => {
    setState((prev) => ({
      ...prev,
      list: collection,
    }));
  };

  React.useEffect(() => {
    getRegions()
      .then((res) => {
        console.log(res.data);
        setRegion(res.data);
      })
      .catch((err) => console.log(err.response));

    return () => {
      setState({
        list: [],
      });
      setRegion([]);
    };
  }, []);

  React.useEffect(() => {
    let birthday = {
      day: "",
      month: "",
      year: "",
    };
    if (user?.dob) {
      let user_dob = new Date(user?.dob);
      birthday.day = ("0" + user_dob.getDate()).slice(-2);
      birthday.month = ("0" + (user_dob.getMonth() + 1)).slice(-2);
      birthday.year = user_dob.getFullYear();
    }
    console.log(birthday);
    setState((prev) => ({
      ...prev,
      name: user?.user.name,
      email: user?.user.email,
      day: birthday.day,
      month: birthday.month,
      year: birthday.year,
      gender: user?.gender || user?.user_info?.gender || "",
      profile: user?.user_info?.profile_image || user?.profile_image,
      cover: user?.user_info?.cover_photo || user?.cover_photo,
      profile_url: user?.user_info?.profile_url || user?.profile_url,
      bio: user?.user_info?.bio || user?.bio,
      list: user?.socials ? changeSocials(user?.socials) : [],
      region_id: user?.region?.id || 0,
      address: user?.address === "null" ? " " : user?.address,
      phone_1: `+${user?.user.phone_no}`,
      socials: user?.socials ? user?.socials : [],
    }));
  }, [freshData]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
     {loading ? (
      <div className="loader-container">
      	  <div className="spinner"></div>
        </div>
      ) : (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Typography
          style={{ fontWeight: "bold", fontSize: "3.7vh" }}
          gutterBottom
          component="div"
        >
          Account Setting
        </Typography>

        {/* dob and gender  */}
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>{/* <Button>Add</Button> */}</Box>

          {/* email start */}
          <Box className={classes.cusFormControl}>
            <Box className={classes.cusOptions}>
              <h5 className="input-label"> Email </h5>
              {/* <Button>Add</Button> */}
            </Box>

            <TextField
              id="outlined-adornment-weight"
              // inputProps={{ "aria-label": "Without label" }}
              fullWidth
              onChange={handleInput}
              value={state.email}
              name="email"
              placeholder="example@gmail.com"
              style={{ backgroundColor: "white" }}
            />
          </Box>

          {/* phone start */}
          <Box className={classes.cusFormControl}>
            <Box className={classes.cusOptions}>
              <h5 className="input-label"> Phone </h5>
              {/* <Button>Add</Button> */}
            </Box>
            <PhoneInput
              placeholder="Enter phone number"
              value={state.phone_1}
              country="mm"
              countryCodeEditable={false}
              inputProps={{
                name: "phone_1",
                required: true,
                autoFocus: true,
              }}
              inputStyle={{
                backgroundColor: "gray",
              }}
              buttonStyle={{
                borderRight: "none",
              }}
              onChange={handlePhone}
            />
          </Box>
          <Box className={classes.general}>
            <Box className={classes.cusFormControl}>
              <Box className={classes.cusOptions}>
                <h5 className="input-label"> Gender </h5>
              </Box>
              <Box className={classes.datePickupInput}>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button
                    onClick={() => {
                      setState((prev) => ({ ...prev, gender: "male" }));
                    }}
                    style={{
                      backgroundColor: `${
                        state.gender === "male" ? "#333" : ""
                      }`,
                    }}
                  >
                    <MaleIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      setState((prev) => ({ ...prev, gender: "female" }));
                    }}
                    style={{
                      backgroundColor: `${
                        state.gender === "female" ? "#333" : ""
                      }`,
                    }}
                  >
                    <FemaleIcon />
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
            <Box className={classes.cusFormControl}>
              <Box className={classes.cusOptions}>
                <h5 className="input-label"> Birthday </h5>
                {validation && (
                  <span className="invalid">{validation?.message}</span>
                )}
              </Box>
              <Box className={classes.datePickupInput} spacing={2}>
                <span className={classes.xssize}>Day</span>
                <TextField
                  id="day"
                  type="text"
                  // name={aemail}
                  name="day"
                  value={state.day}
                  className={classes.inputField}
                  placeholder="XX"
                  onChange={dobHandleChange}

                  // onChange={(e) => setEmail(e.target.value)}
                />
                <span className={classes.mdsize}>Day</span>
                <span className={classes.xssize}>Month</span>
                <TextField
                  variant="outlined"
                  type="text"
                  id="month"
                  name="month"
                  value={state.month}
                  onChange={dobHandleChange}
                  placeholder="XX"
                />
                <span className={classes.mdsize}>Month</span>
                <span className={classes.xssize}>Year</span>
                <TextField
                  variant="outlined"
                  type="text"
                  name="year"
                  value={state.year}
                  onChange={dobHandleChange}
                  id="year"
                  placeholder="XXXX"
                />
                <span className={classes.mdsize}>Year</span>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider className={classes.hrdiv} />
        {/* link start */}
        <Box className={classes.cusFormControl}>
          <SocialBox submitLinks={submitLinks} data={state.list} />
        </Box>

        {/* region start */}
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> Regions </h5>
            {errors?.region_id && (
              <span className="invalid">
                {errors?.region_id ? "Please Choose Region" : ""}
              </span>
            )}
            {/* <Button>Add</Button> */}
          </Box>
          {regions ? (
            <SelectOption
              data={regions}
              handleChange={handleChange}
              selected={state.region_id}
            />
          ) : (
            <div>Data is unavaliable at the moment!</div>
          )}
        </Box>
        <Divider className={classes.hrdiv} />
        {/* region start */}
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> Address </h5>
            {/* <Button>Add</Button> */}
          </Box>
          <TextareaAutosize
            id="outlined-adornment-weight"
            placeholder="example street or quater,example township, example city"
            inputProps={{ "aria-label": "Without label" }}
            multiline
            fullWidth
            value={state.address}
            name="address"
            maxRows={4}
            onChange={handleInput}
            variant="standard"
            style={{ height: "15vh" }}
          />
        </Box>
        {/* button start */}
        <Box className={classes.buttonGroup} sx={{ mt: 3 }}>
          <CButton bgcolor="#eeeeee" textcolor="#0f0f0f">
            Cancel
          </CButton>
          <CButton style={{ marginLeft: "0.5vh" }} onClick={updateInfo}>
            Save
          </CButton>
        </Box>
      </div>
      <Modal
        open={modalOpen}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {/* <span style={{marginLeft: '25vw'}}
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </span> */}
          <h2 id="parent-modal-title" style={{ textAlign: "center" }}>
            <AutoAwesomeIcon />
            SuccessFully Updated!
          </h2>
          <CButton
            style={{
              alignItems: "center",
              alignContent: "center",
              display: "flex",
              margin: "auto",
            }}
            onClick={() => {
              handleClose();
              freshData();
            }}
          >
            Close
          </CButton>
          {/* <p id="parent-modal-description">SuccessFully Updated!</p> */}
        </Box>
      </Modal>
    </div>
    )}
    </>
  );
};

export default AccountSetting;
