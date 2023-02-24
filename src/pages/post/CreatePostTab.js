/** @format */

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import PhoneIcon from "@mui/icons-material/Phone";
import { FiType } from "react-icons/fi";
import { BiImageAdd, BiLink } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";
import { ImHeadphones } from "react-icons/im";
import { FaPollH } from "react-icons/fa";
import { makeStyles } from "@mui/styles";
import { CButton } from "./../../layout/CCButton";
import { display } from "@mui/system";
import { usePostContext } from "./../../context/PostContext";
import { NearMeDisabledRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const useStyles = makeStyles((theme) => ({
  dshow: {
    display: "none",
  },
  cusTab: {
    height: "45vh",
  },
  postDiv: {
    border: "none",
    width: "100%",
    cursor: "text",
    height: "250px",
    resize: "none",
    overflow: "hidden",
    overflowY: "auto",
  },
  fileUpload: {
    backgroundColor: "rgb(251,247,243)",
    display: "flex",
    flexDirection: "column",
    minHeight: "40vh",
    justifyContent: "center",
    border: "2px dashed rgb(229,227,221)",
    marginBottom: "6px",
    alignItems: "center",
    "& input": {
      display: "none",
    },
  },
  pollDiv: {
    backgroundColor: "rgb(251,247,243)",
    display: "flex",
    flexDirection: "column",
    minHeight: "40vh",
    justifyContent: "center",
    border: "2px dashed rgb(229,227,221)",
    marginBottom: "6px",
    padding: "20px",
  },
  pollFormControl: {
    marginBottom: "2vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  linkDiv: {
    backgroundColor: "rgb(251,247,243)",
    display: "flex",
    flexDirection: "column",
    minHeight: "40vh",
    justifyContent: "center",
    border: "2px dashed rgb(229,227,221)",
    marginBottom: "6px",
    padding: "0px 150px",
    [theme.breakpoints.only("xs")]: {
      padding: "0px 10px",
    },
    "& span": {
      display: "block",
      textAlign: "center",
    },
  },
  smalltext: {
    color: "rgb(201,201,196)",
    fontSize: "0.725rem",
    padding: "8px",
  },
  BtnContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gridAutoRows: "20vh",
    borderTop: "1px solid rgb(229,227,221)",
    borderLeft: "1px solid rgb(229,227,221)",
    "& .MuiBox-root": {
      borderBottom: "1px solid rgb(229,227,221)",
      borderRight: "1px solid rgb(229,227,221)",
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
      fontSize: "2.5rem",
      color: "rgb(59,113,149)",
    },
    "&:hover": {
      cursor: "pointer",

      "& svg": {
        color: "#333",
        fontSize: "2.8rem",
      },
    },
  },
  iconText: {
    color: "#333",
    fontSize: "1rem",
    textTransform: "capitalize",
    paddingTop: theme.spacing(1),
    alignSelf: "center",
  },
}));

const initalData = {
  imgSelected: false,
  videoSelected: false,
  audioSelected: false,
  pollSelected: false,
  linkSelected: false,
  textSelected: false,
};
export default function BasicTabs(props) {
  const { handleInputImage, handleInputVideo, handleInputAudio } =
    usePostContext();

  const { getImage } = props;
  const classes = useStyles();
  const image = React.useRef();
  const audio = React.useRef();
  const video = React.useRef();

  const [showing, setShowing] = React.useState(initalData);
  const [post, setPost] = React.useState("");

  const [optionInput, setOptionInput] = React.useState([
    { optionName: "" },
    { optionName: "" },
  ]);

  const [value, setValue] = React.useState(0);

  const handleImageChange = (e) => {
    handleInputImage(e.target.files);
    hideInputType("imgSelected");
  };
  const handleVideoChange = (e) => {
    handleInputVideo(e.target.files);
    hideInputType("videoSelected");
  };
  const handleAudioChange = (e) => {
    handleInputAudio(e.target.files);
    hideInputType("audioSelected");
  };

  const changeLink = (e) => {
    props.inputChange(e);
    setTimeout(() => {
      hideInputType("linkSelected");
    }, 1000);
  };

  const handleAddMoreOptionClick = () => {
    setOptionInput([...optionInput, { optionName: "" }]);
  };

  const handleInputChange = (e, index) => {
    console.log(index);
    const { name, value } = e.target;

    console.log("helo");
    const opt = [...optionInput];
    opt[index][name] = value;
    setOptionInput(opt);
    props.getPollOption(optionInput.map((i) => i.optionName));
  };

  const removePoll = (i) => {
    const opt = optionInput;
    let newarr = opt.filter((option, index) => i !== index);
    setOptionInput(newarr);
    props.getPollOption(newarr.map((i) => i.optionName));
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const showInputType = (type) => {
    const newOptions = Object.assign({}, initalData);
    newOptions[type] = true;
    // if (type === 'textSelected') {
    //   initalData.textSelected = true
    // } else if (type === 'imgSelected') {
    //   initalData.imgSelected = true
    // } else if (type === 'videoSelected') {
    //   initalData.videoSelected = true
    // } else if (type === 'audioSelected') {
    //   initalData.audioSelected = true
    // } else if (type === 'pollSelected') {
    //   initalData.pollSelected = true
    // } else if (type === 'linkSelected') {
    //   initalData.linkSelected = true
    // } else {
    // }

    setShowing(newOptions);
  };

  const hideInputType = (type) => {
    const newOptions = Object.assign({}, initalData);
    newOptions[type] = false;
    setShowing(newOptions);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {showing.textSelected && (
        <Box className={` ${classes.fileUpload}`}>
          <h2>show Text</h2>
        </Box>
      )}
      {/* upload Image */}
      {showing.imgSelected && (
        <Box className={` ${classes.fileUpload}`}>
          <input
            type="file"
            ref={image}
            onChange={handleImageChange}
            accept="image/*"
            multiple={true}
          />
          <CButton onClick={() => image.current.click()}>Upload photo</CButton>
          <span className={classes.smalltext}>Upload photo here!</span>
        </Box>
      )}
      {/* upload video */}
      {showing.videoSelected && (
        <Box className={` ${classes.fileUpload}`}>
          <input
            type="file"
            ref={video}
            onChange={handleVideoChange}
            accept="video/*"
          />
          <CButton onClick={() => video.current.click()}>Upload Video</CButton>
          <span className={classes.smalltext}>Most Video up to 20 MB </span>
        </Box>
      )}
      {/* upload audio */}
      {showing.audioSelected && (
        <Box className={` ${classes.fileUpload}`}>
          <input
            type="file"
            ref={audio}
            onChange={handleAudioChange}
            accept="audio/*"
          />
          <CButton onClick={() => audio.current.click()}>Upload audio</CButton>
          <span className={classes.smalltext}>
            Upload Audio(mp3/mpeg) up to 1MB here!
          </span>
        </Box>
      )}
      {/* upload poll */}
      {showing.pollSelected && (
        <Box className={` ${classes.pollDiv} `}>
          {optionInput.map((opt, i) => {
            return (
              <Box key={i} className={classes.pollFormControl}>
                <Checkbox {...label} />
                <TextField
                  id="outlined-basic"
                  label="Enter poll Option"
                  variant="outlined"
                  fullWidth
                  name="optionName"
                  onKeyUp={(e) => handleInputChange(e, i)}
                />
                <IconButton onClick={() => removePoll(i)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Box>
            );
          })}

          <Button
            style={{ alignSelf: "self-start", marginLeft: "10px" }}
            onClick={handleAddMoreOptionClick}>
            Add more option
          </Button>
        </Box>
      )}
      {/* upload Link */}
      {showing.linkSelected && (
        <Box className={` ${classes.linkDiv}`}>
          {/* starting now to embbed link */}

          <TextField
            id="outlined-basic"
            inputProps={{ "aria-label": "Without label" }}
            placeholder="Enter URl Link"
            variant="outlined"
            name="link"
            onChange={changeLink}
          />

          <span className={classes.smalltext}>Enter Embedded Link here!</span>
        </Box>
      )}

      <Box className={classes.BtnContainer}>
        {/* <Box className={classes.BtnTools}>
          <Button onClick={() => showInputType('textSelected')}>
            <span className={`${classes.toolIcon}`}>
              <FiType />
            </span>
            <span className={classes.iconText}>Text</span>
          </Button>
        </Box> */}
        <Box className={classes.BtnTools}>
          <Button onClick={() => showInputType("imgSelected")}>
            <span className={`${classes.toolIcon}`}>
              <BiImageAdd />
            </span>
            <span className={classes.iconText}>Image</span>
          </Button>
        </Box>
        <Box className={classes.BtnTools}>
          <Button onClick={() => showInputType("videoSelected")}>
            <span className={`${classes.toolIcon}`}>
              {" "}
              <BsCameraVideo />
            </span>{" "}
            <span className={classes.iconText}>Video</span>
          </Button>
        </Box>
        <Box className={classes.BtnTools}>
          <Button onClick={() => showInputType("audioSelected")}>
            <span className={`${classes.toolIcon}`}>
              <ImHeadphones />
            </span>
            <span className={classes.iconText}>Audio</span>
          </Button>
        </Box>
        <Box className={classes.BtnTools}>
          <Button onClick={() => showInputType("pollSelected")}>
            <span className={`${classes.toolIcon}`}>
              <FaPollH />
            </span>
            <span className={classes.iconText}>poll</span>
          </Button>
        </Box>
        <Box className={classes.BtnTools}>
          <Button onClick={() => showInputType("linkSelected")}>
            <span className={`${classes.toolIcon}`}>
              <BiLink />
            </span>
            <span className={classes.iconText}>Link</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
