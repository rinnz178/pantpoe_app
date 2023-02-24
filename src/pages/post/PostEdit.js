/** @format */

import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import Loading from "./../../components/Loading";
import MultipleSelectCheckmarks from "./../../components/CheckboxSelect";
import SelectSubscriptions from "./../../components/Subscript";
import { Grid, Box, Typography, TextField, Divider } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormLabel from "@mui/material/FormLabel";
import { FaTimes } from "react-icons/fa";

import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";

import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CloseIcon from "@mui/icons-material/Close";
import { itemData } from "./../../assets/data";
import OptionTabs from "./CreatePostTab";
import { usePostContext } from "./../../context/PostContext";
import { useSubscriptionContext } from "./../../context/SubscriptionContext";
import { Audio } from "../../components/Audio";
import Gridview from "./../../components/Gridview";
import { CButton } from "../../layout/CCButton";
import { display, fontWeight } from "@mui/system";
import { customFetcher, getFullUrl } from "../../helpers/Constant";
import LinkPreview from "../../components/LinkPreview";
import { useAuthContext } from "../../context/AuthContext";
import { BaseUrl } from "../../helpers/Constant";
import api from "./../../services/apiAction.service";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10vh",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      padding: "8px",
    },
  },
  item: {
    padding: "19px 0px !important",
  },
  PostCreateDiv: {
    width: "100%",
  },
  TitleTab: {
    borderBottom: "1px solid rgb(229,227,221)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "0px 14px 8px 14px",
  },

  title: {
    color: "rgb(36, 30, 18)",
    fontWeight: "700 !important",
    fontSize: "0.875rem !important",
    textTransform: "uppercase",
  },
  postTitle: {
    margin: "20px 0",
    appearance: "none",
    background: "none",
    width: "100%",
    border: "none",
    resize: "none",
    fontWeight: "bold",
    fontSize: " 1.625rem !important",
  },
  postDiv: {
    border: "none",
    width: "100%",
    cursor: "text",
    height: "100px",
    resize: "none",
    overflow: "hidden",
    overflowY: "auto",
    "&:focus": {
      height: "200px",
      resize: "none",
      overflow: "hidden",
      overflowY: "auto",
    },
  },
  optionDiv: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    display: "grid",
  },
  SubTitle: {
    marginTop: "8px",
    fontWeight: "800px",
    textTransform: "uppercase",
    marginBottom: 0,
  },
  divider: {
    border: "1px solid rbg(201,201,200)",
    margin: "16px 0px",
  },
  previewDiv: {
    position: "relative",
  },
  removeicon: {
    position: "absolute",
    top: "4px",
    display: "flex",
    right: 4,
    color: "#333",
    fontSize: "1.4rem",
    alignSelf: "flex-end",
    border: "1px solid #eee",
    padding: 0,
    borderRadius: "50px",
    backgroundColor: "orange",
    "&:hover": {
      transform: "scale(1.5)",
      transition: "ease-in",
      color: "red",
    },
  },
  textCounting: {
    fontSize: "0.825rem",
    display: "flex",
    justifyContent: "flex-end",
    fontWeight: "600 !important",
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
}));
const PostEdit = () => {
  // getting data of customFetcher

  /* customFetcher('https://youtu.be/Wjl1lGFqwJw').then(data => {
   console.log(data);
 });*/

  const { id } = useParams();

  const { isloading, categories, getCategories, getSubscriptions } =
    useSubscriptionContext();
  const { token } = useAuthContext();

  const history = useHistory();

  // for checkbox
  // console.log(categories)
  const [state, setState] = React.useState({
    title: "",
    content: "",
    subscription_plan: [],
    category_id: "",
    seefirst: "tierChoices",
    linkSelected: false,
    link: "undefined",
    oldpollOption: [],
    pollOption: [],
    postid: "",
  });

  // end

  const {
    isImageSelected,
    isVideoSelected,
    video, //preview
    imageData, //preview
    audio, //preview
    isAudioSelected,
    removeImage,
    removeVideo,
    removeAudio,
    isPollSelected,
    postUpdated,
    post,
    poll_options,
    handleEditInputImage,
    RemoveData,
  } = usePostContext();

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [textCounting, setTextCounting] = useState(540);

  const inputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "link") {
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // console.log(value);
      setState((prev) => ({
        ...prev,
        linkSelected: true,
      }));
      setState((prev) => ({
        ...prev,
        link: value,
      }));
    }
  };

  const getPollOption = (data) => {
    setState((prev) => ({
      ...prev,
      pollOption: data,
    }));
  };

  React.useEffect(() => {
    let data = true;
    if (data) {
      async function anyfunction() {
        await getCategories();
        await getSubscriptions();
        await getDatabyid(id);
      }
      anyfunction();
    }
    return (data = false);
  }, [id]);

  const getDatabyid = async (id) => {
    try {
      await api.get(`/content/${id}`).then((res) => {
        let data = res.data.data;
        console.log(data);
        setState((prev) => ({
          postid: data.id,
          title: data.title,
          content: data.content,
          subscription_plan: data.subscription_plans.map((i) => i.id),
          category_id: data.category.id,
          seefirst: data.type,
          linkSelected: data.link === "undefined" ? false : true,
          link: data.link || "",
          oldpollOption: data.poll_options,
        }));
        console.log(typeof data.image);
        let object = {
          isImageSelected: data.image === null ? false : true,
          isVideoSelected: data.video === null ? false : true,
          isAudioSelected: data.audio === null ? false : true,
          isPollSelected: data.poll_options.length > 0 ? true : false,
          imageData:
            data.image === null
              ? []
              : JSON.parse(data.image).map((i) => getFullUrl(i)), //preveiw
          video: data.video === null ? "" : getFullUrl(data.video), //preview
          audio: data.audio === null ? "" : getFullUrl(data.audio), //preview
        };
        // console.log(object);
        handleEditInputImage(object);
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  const getTiers = (data) => {
    // console.log(data);
    // setTier(data);
    setState((prev) => ({
      ...prev,
      subscription_plan: data,
    }));
  };

  const getCategory = (data) => {
    // console.log(data);
    //setCategory(data);
    setState((prev) => ({
      ...prev,
      category_id: data,
    }));
  };

  // const handlePost = (data) => {
  //   //console.log(post)
  //   setPost(post)
  // }

  const CancelPostHandling = () => {
    RemoveData();
    history.push("/home");
  };

  const ChangefileHandler = (e) => {
    console.log(e.target.files);
    // setFiles(e.target.files[0]);
  };

  const updatedPost = () => {
    console.log(state.link);
    let formData = new FormData();
    formData.append("title", state.title);
    formData.append("content", state.content);
    formData.append("category_id", state.category_id);
    formData.append(
      "subscription_plan",
      JSON.stringify(state.subscription_plan)
    );
    formData.append("type", state.seefirst);

    formData.append("link", state.link);
    formData.append("poll_options", JSON.stringify(state.pollOption));

    formData.append("_method", "PUT");
    postUpdated(formData, id);
    // history.push('/home')
  };

  const checkingTextCount = (e) => {
    let textLenght = e.target.value.length;
    console.log(textLenght);
    setTextCounting(textCounting - textLenght);
  };

  const removeInput = () => {
    setState((prev) => ({
      ...prev,
      linkSelected: false,
      link: "undefined",
    }));
  };

  // if (isloading) {
  //   return <Loading />
  // }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={12} md={1}></Grid>
        <Grid item xs={12} sm={12} md={10}>
          <Grid container spacing={{ xs: 1, sm: 0, md: 2 }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              className={` ${classes.item} FaintBox ${classes.PostCreateDiv}`}
            >
              {/* post creating start */}
              <Box className={classes.TitleTab}>
                <Typography
                  variant="subtitle1"
                  component="div"
                  className={classes.title}
                >
                  Update Post
                </Typography>
                <CloseIcon onClick={CancelPostHandling} />
              </Box>
              {/* Post title */}

              <Box style={{ padding: "8px" }}>
                <input
                  type="text"
                  className={classes.postTitle}
                  name="title"
                  value={state.title}
                  placeholder="Post title(required)"
                  onChange={inputChange}
                />

                <textarea
                  className={classes.postDiv}
                  placeholder="what's on your mind"
                  name="content"
                  value={state.content}
                  onChange={inputChange}
                ></textarea>

                {/* preview start here */}
                <Box>
                  {/* {isPollSelected && } */}

                  {isImageSelected && (
                    <div className={classes.previewDiv}>
                      <Gridview images={imageData} />

                      <button
                        className={classes.removeicon}
                        onClick={() => {
                          removeImage();
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}

                  {isVideoSelected && (
                    <div className={classes.previewDiv}>
                      <video
                        src={video}
                        style={{ width: "100%", height: "auto" }}
                        controls
                      ></video>

                      <button
                        className={classes.removeicon}
                        onClick={() => {
                          removeVideo();
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}

                  {isAudioSelected && (
                    <div className={classes.previewDiv}>
                      <Audio audio={audio} />

                      <button
                        className={classes.removeicon}
                        onClick={() => {
                          removeAudio();
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}

                  {state.oldpollOption.length > 0 && (
                    <div className={classes.pollDiv}>
                      {state.oldpollOption.map((item, i) => {
                        return (
                          <Box key={i} className={classes.pollFormControl}>
                            <Checkbox {...label} disabled={true} />
                            <TextField
                              readOnly
                              id="outlined-basic"
                              variant="outlined"
                              fullWidth
                              name={item.name}
                              value={item.name}
                            />
                          </Box>
                        );
                      })}
                    </div>
                  )}

                  {/* padding preview */}
                  {state.linkSelected && (
                    <React.Fragment>
                      {loading && <h2> loading...</h2>}
                      {Object.keys(state.link).length > 0 && (
                        <div className={classes.previewDiv}>
                          <LinkPreview link={state.link} />
                          <button
                            className={classes.removeicon}
                            onClick={removeInput}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </Box>
                {/* preview start here */}
                <OptionTabs
                  getPollOption={getPollOption}
                  inputChange={inputChange}
                />
              </Box>
              {/*P post creating end */}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CButton fullWidth onClick={updatedPost}>
                Publish Now
              </CButton>
              <Box className={`${classes.optionDiv} FaintBox`}>
                {/* choose categrory */}
                <h4 variant="h6" className={classes.SubTitle}>
                  Categories
                </h4>

                <MultipleSelectCheckmarks
                  getCategory={getCategory}
                  categories={categories}
                  category_id={state.category_id}
                />

                <Divider className={classes.divider} />
                {/* who can see first */}
                <h4 variant="h6" className={classes.SubTitle}>
                  Who can see first?
                </h4>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="seefirst"
                    value={state.seefirst}
                    onChange={inputChange}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="public"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="pantpoethu only"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="Select Tier"
                    />
                  </RadioGroup>
                </FormControl>
                <Divider className={classes.divider} />

                {/* Select tier access*/}
                <h4 variant="h6" className={classes.SubTitle}>
                  Select which tiers have access
                </h4>
                <SelectSubscriptions
                  getTiers={getTiers}
                  tiers={state.subscription_plan}
                />
                <Divider className={classes.divider} />

                {/* text teaser start */}
                <Box>
                  <h4 className={classes.SubTitle}>TEASTER TEXT</h4>
                  <h5 style={{ marginTop: "5px" }}>
                    The First 540 characters of your post will display publicly
                    as teasers to fans and pantpoethu who do not have access to
                    this post.
                  </h5>
                  <TextareaAutosize
                    onChange={checkingTextCount}
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Add public taster text ..."
                    style={{
                      width: "100%",
                      height: 80,
                      border: "1px solid rgb(229,227,221)",
                      borderRadius: "4px",
                      backgroundColor: "rgb(208,221,229)",
                    }}
                  />
                  <span className={classes.textCounting}>
                    {" "}
                    <span>{textCounting}</span> characters left
                  </span>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={1}></Grid>
      </Grid>
    </>
  );
};

export default PostEdit;
