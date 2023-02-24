/** @format */

import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import JoditEditor from "jodit-react";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import "../assets/style.css";
import Avatar from "@mui/material/Avatar";
import { CButton } from "../layout/CCButton";
import Editor from "./Editor";
import defaultCover from "./../assets/images/download.png";
import { useAuthContext } from "../context/AuthContext";
import { getFullUrl } from "../helpers/Constant";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Basic = ({ user, changeTab, freshData, generalInfo }) => {
  const cover = useRef(null);
  const profile = useRef(null);
  const editor = useRef(null);
  const [validation, setValidation] = React.useState();
  const {
    upgradetoCreator,
    user: authUser,
    errors,
    failed_status,
    success_status,
    modalOpen,
    handleClose,
    handleOpen,
    updateUserProfile,
  } = useAuthContext();
  const [content, setContent] = useState("");
  const [state, setState] = useState({
    name: "",
    desc: "",
    profile: "",
    cover: "",
    profile_url: "",
    plans: [],
    new_profile_image: "",
    new_cover: "",
    bio: "",
  });

  const showimage = (image) => {
    return URL.createObjectURL(image);
    // return window.URL.createObjectURL(image);
  };

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const inputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "new_cover" || name === "new_profile_image") {
      setState((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (name === "profile_url") {
      let regx = /^[a-zA-Z0-9]+$/;
      let pass = regx.test(value);
      console.log(pass);
      if (pass === true) {
        if (validation?.profile_url) {
          delete validation.profile_url;
        }
        setState((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        setValidation((prev) => ({
          ...prev,
          [name]: "Special Character, Uppercase and Space are not allowed! ",
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getUpdateData = (content) => {
    // console.log(content);
    setContent(content);
  };

  const handleSubmit = () => {
    let userformData = new FormData();
    userformData.append(
      "cover_photo",
      state.new_cover === "" ? state.cover : state.new_cover
    );
    userformData.append(
      "profile_image",
      state.new_profile_image === "" ? state.profile : state.new_profile_image
    );
    userformData.append("name", state.name);
    userformData.append("email", state.email);
    userformData.append("profile_url", state.profile_url);
    userformData.append("bio", content == undefined ? "" : content);
    userformData.append("phone_1", generalInfo.phone_no);
    userformData.append("phone_2", generalInfo.phone_no);

    userformData.append("gender", generalInfo.gender);
    userformData.append("address", generalInfo?.address);
    userformData.append(
      "region_id",
      Object.keys(generalInfo.region).length > 0 ? generalInfo.region.id : 0
    );

    userformData.append("dob", generalInfo.dob);

    let formData = new FormData();

    formData.append("name", state.name);
    formData.append("role_id", 2);
    formData.append("description", state.desc);

    formData.append("categories", localStorage.getItem("selectedCategory"));

    formData.append("bio", content == undefined ? "" : content);
    formData.append("profile_url", state.profile_url);
    formData.append(
      "content_status",
      Number(localStorage.getItem("sexual_content")) === 2 ? 1 : ""
    );
    try {
      updateUserProfile(userformData);
      upgradetoCreator(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitold = () => {
    let formData = new FormData();

    formData.append("name", state.name);
    formData.append("role_id", 2);
    formData.append("description", state.desc);

    formData.append("phone_1", generalInfo.phone_no);
    formData.append("phone_2", generalInfo.phone_no);

    formData.append("gender", generalInfo.gender);
    formData.append("address", generalInfo?.address);
    formData.append(
      "region_id",
      Object.keys(generalInfo.region).length > 0 ? generalInfo.region.id : 0
    );

    formData.append("dob", generalInfo.dob);

    formData.append(
      "cover_photo",
      state.new_cover === "" ? state.cover : state.new_cover
    );
    formData.append(
      "profile_image",
      state.new_profile_image === "" ? state.profile : state.new_profile_image
    );
    formData.append("categories", localStorage.getItem("selectedCategory"));

    formData.append("bio", content == undefined ? "" : content);

    formData.append(
      "content_status",
      Number(localStorage.getItem("sexual_content")) === 2 ? 1 : ""
    );
    try {
      upgradetoCreator(formData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    console.log(user);
    setState((prev) => ({
      ...prev,
      name: user?.user_info?.user?.name || user?.user?.name || "",
      email: user?.user_info?.user?.email || user?.user?.email,
      desc: user?.description || "",
      profile: user?.user_info?.profile_image || user?.profile_image,
      cover: user?.user_info?.cover_photo || user?.cover_photo,
      profile_url: user?.user_info?.profile_url || user?.profile_url || "",
      plans: user?.subscription_plans || [],
      region_id: user?.user_info?.region?.id || user?.user?.region_id,
    }));

    setContent(user?.user_info?.bio);
  }, [user]);

  return (
    <Grid sx={{ width: "100%" }} container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        justifyContent="center"
        alignItems="center"
      >
        <Typography gutterBottom variant="h4" textAlign="center">
          Basics
        </Typography>
        <Typography gutterBottom textAlign="center">
          Set your creator details helow
        </Typography>
      </Grid>

      <Grid
        item
        container
        xs={12}
        sm={12}
        md={8}
        direction="column"
        spacing={2}
      >
        <Grid item>
          <Card style={{ borderRadius: "0" }}>
            {/* <CardMedia
                        component='img'
                        height='140'
                        image='/static/images/cards/contemplative-reptile.jpg'
                        alt='green iguana'
                        /> */}
            <CardContent>
              <Grid container direction="row" spacing={3}>
                <Grid item container>
                  <Grid item xs={4} sm={4} md={4}>
                    <p className="input-label"> Name of PantPoe page </p>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8}>
                    <TextField
                      fullWidth
                      required
                      error={errors?.name ? true : false}
                      id="outlined-required"
                      name="name"
                      onChange={inputChange}
                      value={state.name}
                      placeholder="pseudonym, band name, personal name, whatever"
                      helperText={errors?.name ? errors?.name[0] : ""}
                      color="info"
                    />
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={4} sm={4} md={4} alignSelf="center">
                    <p className="input-label"> What are you creating? </p>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8}>
                    <TextField
                      fullWidth
                      helperText="Incorrect entry."
                      required
                      id="outlined-required"
                      name="desc"
                      onChange={inputChange}
                      value={state.desc}
                      placeholder="music videos, water color paintings, This American Life"
                      color="info"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            {/* <CardActions>
                        <Button size='small'>Share</Button>
                        <Button size='small'>Learn More</Button>
                        </CardActions> */}
          </Card>
        </Grid>
        <Grid item>
          <Card style={{ borderRadius: "0" }}>
            {/* <CardMedia
                        component='img'
                        height='140'
                        image='/static/images/cards/contemplative-reptile.jpg'
                        alt='green iguana'
                        /> */}
            <CardContent>
              <Grid container direction="row" spacing={3}>
                <Grid item container>
                  <Grid item xs={4} sm={4} md={4} alignSelf="center">
                    <p className="input-label"> Profile photo </p>
                    <p className="input-required subtitle">Required</p>
                    <span className="subtitle">
                      We recommend a 256px by 256px image.
                    </span>
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    sm={8}
                    md={8}
                    alignSelf="center"
                    className="container"
                  >
                    <Avatar
                      src={
                        state.new_profile_image !== ""
                          ? showimage(state.new_profile_image)
                          : getFullUrl(state.profile)
                      }
                      alt="Avatar"
                      className="image circle-img"
                      sx={{ width: 56, height: 56 }}
                    />

                    {/* <input type="file" name="file" id="profile1" className="profile" />
                                        <label htmlhtmlFor="profile1" className="show-profile"></label> */}
                    <div className="overlay">
                      <div className="upload">
                        <input
                          type="file"
                          name="new_profile_image"
                          onChange={inputChange}
                          ref={profile}
                          id="profile"
                          className="profile"
                          accept="image/*"
                        />
                        <label
                          htmlFor="profile"
                          className="show-profile"
                        ></label>
                        <div>Edit</div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={4} sm={4} md={4} alignSelf="center">
                    <p className="input-label"> Cover photo </p>
                    <p className="input-required subtitle">Required</p>
                    <span className="subtitle">
                      We recommend an image at least 1600px wide and 400px tall.
                    </span>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} alignSelf="center">
                    <input
                      type="file"
                      name="new_cover"
                      onChange={inputChange}
                      ref={cover}
                      id="cover-photo"
                      accept="image/*"
                      className="cover-photo"
                    />
                    <div className="show-cover-photo">
                      <img
                        src={
                          (state.new_cover && showimage(state.new_cover)) ||
                          getFullUrl(state.cover) ||
                          defaultCover
                        }
                        alt="div"
                        onClick={() => cover.current.click()}
                        sx={{ width: 120, height: 30 }}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={4} sm={4} md={4} alignSelf="center">
                    <p className="input-label"> PantpoeThu page URL </p>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8}>
                    <p style={{ marginTop: "20px", display: "inline-block" }}>
                      pantpoe.com/creators/
                    </p>
                    <TextField
                      error={validation?.profile_url ? true : false}
                      helperText={validation?.profile_url}
                      style={{ display: "inline-block" }}
                      id="outlined-required"
                      name="profile_url"
                      onChange={inputChange}
                      placeholder="creator account"
                      color="info"
                      value={state.profile_url}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            {/* <CardActions>
                        <Button size='small'>Share</Button>
                        <Button size='small'>Learn More</Button>
                        </CardActions> */}
          </Card>
        </Grid>
        <Grid item>
          <Card style={{ borderRadius: "0" }}>
            {/* <CardMedia
                        component='img'
                        height='140'
                        image='/static/images/cards/contemplative-reptile.jpg'
                        alt='green iguana'
                        /> */}
            <CardContent>
              <Grid container direction="row" spacing={3}>
                <Grid item container>
                  <Grid alignSelf="center">
                    <p className="input-label"> About your Pantpoethu page </p>
                    <p className="input-required subtitle">Required</p>
                    <span className="subtitle">
                      This is the first thing potential patrons will see when
                      they land on your page, so make sure you paint a
                      compelling picture of how they can join you on this
                      journey.
                    </span>
                  </Grid>
                </Grid>

                <Grid item alignSelf="center" style={{ width: "100%" }}>
                  <Editor getValue={getUpdateData} contents={content} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item>
        <CButton fullWidth onClick={handleSubmit}>
          Save Changes
        </CButton>
        <Card style={{ borderRadius: "0", marginTop: "12px" }}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              CHECKLIST
            </Typography>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                {state.name ? (
                  <CheckCircle style={{ color: "green" }} />
                ) : (
                  <RadioButtonUnchecked style={{ color: "red" }} />
                )}
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: state.name ? "green" : "red" }}>
                  Set your page name
                </span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                {state.desc ? (
                  <CheckCircle style={{ color: "green" }} />
                ) : (
                  <RadioButtonUnchecked style={{ color: "red" }} />
                )}
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: state.desc ? "green" : "red" }}>
                  Create your headline
                </span>
                <div className="input-required subtitle">
                  Required.{" "}
                  <Link href="#" className="blue-link">
                    Add Now
                  </Link>{" "}
                </div>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                {state.profile ? (
                  <CheckCircle style={{ color: "green" }} />
                ) : (
                  <RadioButtonUnchecked style={{ color: "red" }} />
                )}
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: state.profile ? "green" : "red" }}>
                  Upload profile picture
                </span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                {state.cover ? (
                  <CheckCircle style={{ color: "green" }} />
                ) : (
                  <RadioButtonUnchecked style={{ color: "red" }} />
                )}
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: state.cover ? "green" : "red" }}>
                  Upload cover image
                </span>
                <div className="input-required subtitle">
                  Required.{" "}
                  <Link href="#" className="blue-link">
                    Add Now
                  </Link>{" "}
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                {state.plans.length > 0 ? (
                  <CheckCircle style={{ color: "green" }} />
                ) : (
                  <RadioButtonUnchecked style={{ color: "red" }} />
                )}
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span
                  style={{
                    color: state.plans.length > 0 ? "green" : "red",
                  }}
                >
                  Create about Tiers
                </span>
                <div className="input-required subtitle">
                  Required.{" "}
                  <Link
                    href="#"
                    onClick={() => changeTab(1)}
                    className="blue-link"
                  >
                    Add Now
                  </Link>{" "}
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                {state.region_id ? (
                  <CheckCircle style={{ color: "green" }} />
                ) : (
                  <RadioButtonUnchecked style={{ color: "red" }} />
                )}
              </Grid>
              <Grid item xs={10} sm={10} md={11} lg={11}>
                <span style={{ color: state.region_id ? "green" : "red" }}>
                  Finish account details
                </span>
                <div className="input-required subtitle">
                  Required.{" "}
                  <Link
                    href="#"
                    onClick={() => changeTab(2)}
                    className="blue-link"
                  >
                    Add Now
                  </Link>{" "}
                </div>
              </Grid>
            </Grid>
            <Typography gutterBottom variant="h6" component="div">
              <p className="input-label">LEARN MORE</p>
            </Typography>
            <ul>
              <li>
                <Link href="#" className="gray-link">
                  Membership 101: Best Practices
                </Link>
              </li>
              <li>
                <Link href="#" className="gray-link">
                  How to choose your business model
                </Link>
              </li>
              <li>
                <Link href="#" className="gray-link">
                  How to talk about PantPoe to your audience
                </Link>
              </li>
              <li>
                <Link href="#" className="gray-link">
                  Knowing your worth as a creator
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Grid>
      <Modal
        open={modalOpen}
        onClose={() => {
          handleClose();
          freshData();
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {/* <span style={{marginLeft: '20vw'}}
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
              freshData();
              handleClose();
            }}
          >
            Close
          </CButton>
          {/* <p id="parent-modal-description">SuccessFully Updated!</p> */}
        </Box>
      </Modal>
    </Grid>
  );
};

export default Basic;
