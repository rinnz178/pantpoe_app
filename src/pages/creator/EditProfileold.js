/** @format */

import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
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
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import SelectOption from "./../../layout/SelectOption";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import api from "../../services/apifinal.service";
import TierUpdate from "../../components/TierUpdate";
import {
  BaseUrl,
  getFullUrl,
  RBaseUrl,
  changeSocials,
} from "../../helpers/Constant";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    marginTop: "5vh",
    placeItems: "center",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      padding: "10px",
    },
  },
  container: {
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
    "& span": {
      margin: "0px 8px",
    },
    "& .MuiOutlinedInput-root #day,.MuiOutlinedInput-root #month": {
      width: "24px",
    },
    "& .MuiOutlinedInput-root #year": {
      width: "42px",
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

// input formula=> (valu.length + 1)*8

const EditProfile = () => {
  const { id } = useParams();
  const { token, updatetoCreator, getRegions, regions } = useAuthContext();
  const classes = useStyles();
  const profile = useRef(null);
  const newLinkButton = useRef(null);
  const cover = useRef(null);
  const [social, setSocial] = useState({
    name: "none",
    link: "",
  });
  const [content, setContent] = useState("");
  const [data, setData] = useState({
    loading: true,
    day: "",
    month: "",
    year: "",
    socials: [],
    bio: "",
    gender: "",
    categories: "",
  });

  const getCategories = (data) => {
    return data?.map((item) => item.id);
  };

  const socialArray = [
    { id: 1, name: "facebook" },
    { id: 2, name: "instagram" },
    { id: 3, name: "youtube" },
    { id: 4, name: "twitter" },
    { id: 5, name: "twitch" },
    { id: 6, name: "discord" },
    { id: 7, name: "tiktok" },
    { id: 8, name: "others" },
  ];

  const places = ["yangon", "mandalay", "sagaing"];

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const getData = () => {
    api
      .get("/user")
      .then((res) => {
        const response = res.data.data;
        console.log(res);
        setData((prev) => ({
          ...prev,
          loading: false,
          day:
            response.user_info.dob === null
              ? ""
              : moment(response.user_info.dob).get("date"),
          month:
            response.user_info.dob === null
              ? ""
              : moment(response.user_info.dob).get("month"),
          year:
            response.user_info.dob === null
              ? ""
              : moment(response.user_info.dob).get("year"),
          socials: changeSocials(response.user_info.socials),
          ...response,
          bio: response.user_info.bio,
          gender: response.user_info.gender,
          categories: getCategories(response.categories),
        }));
      })
      .catch((err) => {
        console.log(err.message);
        // setIsSetData(false);
        // setError(err.message);
      });
  };

  React.useEffect(() => {
    const controller = new AbortController();

    async function anyfunction() {
      await getData();
      await getRegions();
    }
    anyfunction();
    return () => {
      controller.abort();
    };
  }, [id]);

  if (data.loading) {
    return <h3>loading....</h3>;
  }

  const removeLink = (i) => {
    const { socials } = data;
    let newSocials = socials.filter((data, index) => index !== i);
    setData((prev) => ({
      ...prev,
      socials: newSocials,
    }));
  };

  const handleNewSocial = (e) => {
    const { value, name } = e.target;

    if (e.key === "Enter") {
      addMore();
    }
  };

  const inputChange = (e) => {
    const { name, value, files } = e.target;
    const { user_info } = data;
    if (name === "newcover" || name === "newprofile") {
      if (name === "newprofile") {
        user_info.profile_image = files[0];
      } else {
        user_info.cover_photo = files[0];
      }

      setData((prev) => ({
        ...prev,
        user_info,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const genderChange = (gender) => {
    setData((prev) => ({
      ...prev,
      gender: gender,
    }));
  };
  const updateData = () => {
    let dob = moment()
      .add(data.day, "days")
      .month(data.month - 1)
      .year(data.year)
      .format("YYYY-MM-DD HH:mm:ss");
    let formData = new FormData();
    formData.append("name", data.user_info.user.name);
    formData.append("email", data.user_info.user.email);
    formData.append("phone_2", data.user_info.phone_no);
    formData.append("role_id", "");
    formData.append("cover_photo", data.user_info.cover_photo);
    formData.append("profile_image", data.user_info.profile_image);
    formData.append("categories", JSON.stringify(data.categories));
    formData.append("socials", JSON.stringify(data.socials));
    formData.append("gender", data.gender);
    formData.append("region_id", data.user_info.region.id ?? null);
    formData.append("dob", dob);
    formData.append("address", data.user_info.address);
    formData.append("bio", data.user_info.bio);
    formData.append("profile_url", data.user_info.profile_url);

    updatetoCreator(formData);
  };

  const addMore = () => {
    let acc = [];
    let cc = [];
    let { socials } = data;
    acc.push(social.name);
    acc.push(social.link);
    socials.push(acc);

    setData((prev) => ({
      ...prev,
      socials,
    }));
    setSocial({ link: "", name: "none" });
  };

  const inputLinkChange = (e) => {
    const { name, value } = e.target;
    if (name === "social") {
      setSocial((prev) => ({
        ...prev,
        name: value,
      }));
    } else {
      setSocial((prev) => ({
        ...prev,
        link: value,
      }));
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Typography variant="h4" gutterBottom component="div">
          Edit Profile
        </Typography>

        {/* <Box className={`${classes.boxer}  `}>
          <Avatar src='https://cdn-icons-png.flaticon.com/128/1946/1946429.png' />
          <h4>Username</h4>
          <FiEdit3 />
        </Box> */}

        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> profile photo </h5>
            <Button onClick={updateData}>Edit</Button>
            <input
              style={{ display: "none" }}
              type="file"
              ref={profile}
              onChange={inputChange}
              name="newprofile"
              accept="image/*"
              className={classes.hidddendiv}
            />
          </Box>
          {console.log(typeof data.user_info.profile_image)}
          <Box
            onClick={() => profile.current.click()}
            className={`${classes.profilephoto} imgDiv`}
            style={{ alignSelf: "center" }}
          >
            {console.log(typeof data.user_info.profile_image)}
            <Avatar
              sx={{ width: "80px", height: "80px" }}
              src={
                typeof data.user_info.profile_image === "string"
                  ? getFullUrl(data.user_info.profile_image)
                  : window.URL.createObjectURL(data.user_info.profile_image)
              }
            />
          </Box>
        </Box>

        <Divider className={classes.hrdiv} />

        {/* cover start */}
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> Cover photo </h5>
            <Button>Edit</Button>
            <input
              style={{ display: "none" }}
              type="file"
              ref={cover}
              onChange={inputChange}
              name="newcover"
              accept="image/*"
              className={classes.hidddendiv}
            />
          </Box>
          <Box
            className={`${classes.coverphoto} imgDiv`}
            onClick={() => cover.current.click()}
            style={{
              backgroundImage: `url('${
                typeof data.user_info.cover_photo === "string"
                  ? getFullUrl(data.user_info.cover_photo)
                  : window.URL.createObjectURL(data.user_info.cover_photo)
              }')`,
            }}
          ></Box>
        </Box>

        <Divider className={classes.hrdiv} />
        {/* bio start */}
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> Bio </h5>
            <Button onClick={updateData}>Edit</Button>
          </Box>

          <TextField
            id="filled-multiline-flexible"
            inputProps={{ "aria-label": "Without label" }}
            multiline
            fullWidth
            name="bio"
            defaultValue={data.bio}
            maxRows={4}
            onChange={inputChange}
            variant="standard"
          />
        </Box>
        <Divider className={classes.hrdiv} />
        {/* dob and gender  */}
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> General Info </h5>
            <Button onClick={updateData}>Edit</Button>
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
                    onClick={() => genderChange("male")}
                    style={{
                      backgroundColor: `${
                        data.gender === "male" ? "#333" : ""
                      }`,
                    }}
                  >
                    <MaleIcon />
                  </Button>
                  <Button
                    onClick={() => genderChange("female")}
                    style={{
                      backgroundColor: `${
                        data.gender === "female" ? "#333" : ""
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
              </Box>
              <Box className={classes.datePickupInput}>
                <span className={classes.xssize}>Day</span>
                <TextField
                  id="day"
                  type="text"
                  value={data.day}
                  // name={aemail}
                  name="day"
                  className={classes.inputField}
                  placeholder="XX"
                  onChange={inputChange}
                />
                <span className={classes.mdsize}>Day</span>
                <span className={classes.xssize}>Month</span>
                <TextField
                  variant="outlined"
                  type="text"
                  id="month"
                  value={data.month}
                  onChange={inputChange}
                  name="month"
                  placeholder="XX"
                />
                <span className={classes.mdsize}>Month</span>
                <span className={classes.xssize}>Year</span>
                <TextField
                  variant="outlined"
                  type="text"
                  name="year"
                  value={data.year}
                  onChange={inputChange}
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
          <Box className={classes.cusOptions}>
            <h5 className="input-label"> Links </h5>
            <Button onClick={updateData}>Edit</Button>
          </Box>
          <SelectOption
            fullWidth={true}
            data={socialArray}
            onChange={social.name}
            name="social"
            inputChange={inputLinkChange}
          />
          <TextField
            id="standard-basic"
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
            variant="standard"
            placeholder="https://www.example.com/..."
            onKeyUp={handleNewSocial}
            onChange={inputLinkChange}
            value={social.link}
          />

          <List>
            {data.socials.map((acc, i) => {
              return (
                <ListItem
                  key={i}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeLink(i)}
                    >
                      <RemoveCircleOutlineSharpIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={acc[1]} secondary={acc[0]} />
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Divider className={classes.hrdiv} />

        {/* email start 
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className='input-label'> Email </h5>
            <Button>Add</Button>
          </Box>

          <TextField
            id='standard-basic'
            inputProps={{ 'aria-label': 'Without label' }}
            fullWidth
            variant='standard'
            placeholder='example@gmail.com'
          />
        </Box>
        <Divider className={classes.hrdiv} />
         phone start 
        <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className='input-label'> Phone </h5>
            <Button>Add</Button> 
          </Box>

          <OutlinedInput
            fullWidth
            id='loginPh'
            // value={phone}
            // onChange={handlePhoneNumber}
            startAdornment={
              <InputAdornment position='start'>
                +95
                <KeyboardArrowRightIcon /> 9
              </InputAdornment>
            }
            aria-describedby='component-error-text'
            inputProps={{ type: 'number', 'aria-label': 'Without label' }}
            placeholder='000000000'
          />
        </Box>
        <Divider className={classes.hrdiv} /> */}

        {/* region start */}
        {/* <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className='input-label'> Regions </h5>
            <Button>Edit</Button>
          </Box>
          <SelectOption fullWidth={false} data={places} />
        </Box>
        <Divider className={classes.hrdiv} /> */}
        {/* region start */}
        {/* <Box className={classes.cusFormControl}>
          <Box className={classes.cusOptions}>
            <h5 className='input-label'> Address </h5>
            <Button>Edit</Button>
          </Box>
          <TextField
            id='filled-multiline-flexible'
            label='example street or quater,example township, example city'
            displayempty
            inputProps={{ 'aria-label': 'Without label' }}
            multiline
            fullWidth
            maxRows={4}
            onChange={() => console.log('helow')}
            variant='standard'
          />
        </Box> */}
        {/* button start */}
        {/* <Box className={classes.buttonGroup} sx={{ mt: 3 }}>
          <CButton bgcolor='#eeeeee' textcolor='#0f0f0f'>
            Cancel
          </CButton>
          <CButton>Save</CButton>
        </Box> */}

        {/* starting tier */}

        {data.subscription_plans &&
          data.subscription_plans.map((item, index) => {
            return (
              <div key={index}>
                <TierUpdate data={item} />
              </div>
            );
          })}

        <Divider className={classes.hrdiv} />
      </div>
    </div>
  );
};

export default EditProfile;
