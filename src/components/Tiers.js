/** @format */

import React, { useState } from "react";
import { useSubscriptionContext } from "../context/SubscriptionContext";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Loading from "./../components/Loading";
import "../assets/page_not_found.css";
import { CButton } from "../layout/CCButton";
import {
  Typography,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import DOMPurify from "dompurify";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Editor from "./Editor";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "../assets/style.css";
import { useAuthContext } from "../context/AuthContext";
import { getFullUrl } from "../helpers/Constant";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  tierImage: {
    display: "inline-flex",
    justifyContent: "space-around",
    alignItems: "center",
    "& .MuiAvatar-root": {
      width: "80px",
      height: "80px",
    },
  },
}));
let initialdata = {
  subcriptPlans: [],
  newDialog: false,
  editDialog: false,
  level: "",
  price: "",
  image: "",
  desc: "",
  isError: {
    title: "",
    price: "",
    image: "",
  },
};

const Tiers = ({ changeTab, user: updateUser }) => {
  const classes = useStyles();
  const { user } = useAuthContext();
  const {
    getSubscriptions,
    subscriptions,
    updateSubscription,
    createSubscriptions,
    tierError,
  } = useSubscriptionContext();
  // console.log(data)
  const [state, setState] = React.useState(initialdata);
  const [refresh, setRefresh] = useState();
  const history = useHistory();

  // const editor = useRef(null);
  const [content, setContent] = useState("");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [preview, setPreview] = React.useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const newhandleClose = () => {
    setState({
      ...state,
      newDialog: false,
    });
    // setState((state) => {
    //   return { ...state, newData: { ...state.newData, desc: value } }
    // })
  };

  const newhandleOpen = (e) => {
    setState({
      ...state,
      newDialog: true,
    });
  };
  const edithandleClose = (e) => {
    setState({
      ...state,
      editDialog: false,
    });
  };
  const edithandleOpen = (id) => {
    const subscription = subscriptions.filter((item) => item.id === id)[0];

    setState({
      subcriptPlans: [],
      newDialog: false,
      level: subscription?.level,
      price: subscription?.price,
      image: subscription?.image,
      desc: subscription?.desc,
      editDialog: true,
      id: id,
      isError: {
        title: "",
        price: "",
        image: "",
      },
    });
    setContent(subscription?.description);
    setPreview(getFullUrl(subscription.image));
  };

  // console.log(state)
  const NewformInputValue = (e) => {
    const { name, value, files } = e.target;

    //console.log(name,value);

    // const { isError } = state;

    // switch (name) {
    //   case 'title':
    //     isError.title = value.length < 0 ? 'data is required' : ''
    //     break
    //   case 'price':
    //     isError.price = value.length < 0 ? 'data is required' : ''
    //     break
    //   case 'image':
    //     isError.image = files[0].size < 0 ? 'data is required' : ''
    //     break
    // }

    if (name !== "image") {
      setState((prevState) => ({
        ...prevState,

        [name]: value,
      }));
    } else {
      setPreview(URL.createObjectURL(files[0]));
      setState((prevState) => ({
        ...prevState,

        image: files[0],
      }));
    }

    // if (name === 'title') {
    //   isError.title = value.length < 0 ? 'data is required' : ''
    //   setLevel(value)
    //   setState({ ...state, isError })
    // }

    // if (name === 'price') {
    //   isError.price = value.length < 0 ? 'data is required' : ''
    //   setPrice(value)
    //   setState({ ...state, isError })
    // }

    // if (name === 'image') {
    //   isError.price = files[0].size < 0 ? 'data is required' : ''
    //   setImage(files[0])
    //   setState({ ...state, isError })
    // }

    // setState({
    //   ...state,
    //   isError,
    //   newData: { ...state.newData, [name]: value },
    // })
  };
  // console.log(state.newData)

  // Edit
  const EditformInputValue = (e) => {
    const { name, value, files } = e.target;
    const { isError, newData } = state;

    if (name !== "image") {
      setState({
        ...state,
        editDialog: true,
        [name]: value,
      });
    } else {
      setPreview(URL.createObjectURL(files[0]));
      setState({
        ...state,
        editDialog: true,
        image: files[0],
      });
    }
  };

  const NewgetValue = (value) => {
    setState((prev) => ({
      ...prev,
      desc: value,
    }));
    // setDescription(value)
    // setState({ ...state, isError })
    setContent(value);
  };
  const editGetValue = (value) => {
    setState({
      ...state,
      editData: { ...state.editData, desc: value },
    });
    setContent(value);
  };

  const reload = () => {
    setRefresh(!refresh);
  };

  React.useEffect(() => {
    getSubscriptions();
  }, [refresh, updateUser]);

  const createHandleSubmit = () => {
    const formData = new FormData();
    formData.append("level", state.level);
    formData.append("price", state.price);
    formData.append("image", state.image);
    formData.append("description", state.desc);
    // const newformData = {
    //   level: state.title,
    //   price: state.price,
    //   image: state.image,
    //   desc: state.desc,
    // }
    // console.log(newformData)
    try {
      createSubscriptions(formData);
    } catch (error) {
      console.log(error);
      alert("heo");
    }
    reload();
  };

  const updateTier = () => {
    const formData = new FormData();
    formData.append("level", state.level);
    formData.append("price", state.price);
    formData.append("image", state.image);
    formData.append("description", content);
    formData.append("_method", "PUT");
    // const newformData = {
    //   level: state.title,
    //   price: state.price,
    //   image: state.image,
    //   desc: state.desc,
    // }
    // console.log(newformData)
    try {
      updateSubscription(formData, state?.id);
      setState(initialdata);
      setPreview("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
    reload();
  };
  console.log(updateUser);

  if (
    updateUser?.user_info?.user.role.name === "user" ||
    updateUser?.user?.role.name === "user"
  ) {
    return (
      <div style={{ marginTop: "2em" }}>
        <div id="notfound">
          <div class="notfound">
            <div class="notfound-404">
              <div></div>
              <h1>403</h1>
            </div>
            <h2>Unauthorize to Access</h2>
            <p>This page is unavaliable to access until becoming a Creator!</p>
            <CButton
              onClick={() => {
                changeTab(0);
              }}
            >
              Become a Creator
            </CButton>
          </div>
        </div>
      </div>
    );
  }

  // if (user?.role == process.env.REACT_ROLE_USER_NAME) {
  //   history.push("/page-setup");
  // }
  //console.log(subscriptions)
  return (
    <>
      <Grid container spacing={2}>
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
            Tiers
          </Typography>
          <Typography gutterBottom textAlign="center">
            Choose what to offer your pantpoes
          </Typography>
        </Grid>
        <Grid item container direction="column" spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card style={{ borderRadius: "0" }}>
              {/* <CardMedia
                        component='img'
                        height='140'
                        image='/static/images/cards/contemplative-reptile.jpg'
                        alt='green iguana'
                        /> */}
              <CardContent>
                <Grid container direction="row" spacing={2}>
                  {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Card style={{ borderRadius: '0' }}>
                      <CardContent>
                        <Grid item container>
                          <Grid item xs={10} sm={10} md={10} lg={10}>
                            <div className='subtitle'>
                              {' '}
                              Published Oct 18, 2021{' '}
                            </div>
                            <div className='subtitle'>0 pantpoethus</div>
                          </Grid>
                          <Grid item xs={2} sm={2} md={2} lg={2}>
                            <a
                              href='#'
                              className='blue-link'
                              onClick={edithandleOpen}
                              data-name='editPlan'
                            >
                              Edit Tier
                            </a>
                          </Grid>
                        </Grid>
                        <br />
                        <Grid item container>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className='input-label'> Official Pantpoe</div>
                            <div className='subtitle'>$3 per month</div>
                          </Grid>
                        </Grid>
                        <Grid item container>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div
                              style={{
                                fontWeight: 'bold',
                                backgroundColor: 'rgb(245, 244, 242)',
                                padding: '6px',
                                margin: '16px 0px',
                              }}
                            >
                              {' '}
                              Behind-the-scenes content
                            </div>
                            <div
                              style={{
                                fontWeight: 'bold',
                                backgroundColor: 'rgb(245, 244, 242)',
                                padding: '6px',
                                margin: '16px 0px',
                              }}
                            >
                              {' '}
                              Patron-only polls
                            </div>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid> */}

                  {subscriptions.map((plan, index) => {
                    const { id, level, price, description, image } = plan;

                    return (
                      <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                        <Card style={{ borderRadius: "0" }}>
                          <CardContent>
                            <Grid item container>
                              <Grid item xs={10} sm={10} md={10} lg={10}>
                                <div className="subtitle">
                                  Published at{" "}
                                  {moment(plan?.created_at, [
                                    "YYYY",
                                    moment.ISO_8601,
                                  ]).format("MMM Do YY")}
                                </div>
                                <div className="subtitle">
                                  {plan?.subscription_counts} pantpoethus
                                </div>
                              </Grid>
                              <Grid item xs={2} sm={2} md={2} lg={2}>
                                <a
                                  href="#"
                                  className="blue-link"
                                  onClick={() => edithandleOpen(id)}
                                  data-name="editPlan"
                                >
                                  Edit Tier
                                </a>
                              </Grid>
                            </Grid>
                            <br />
                            <Grid item container>
                              <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div className="input-label">{level}</div>
                                <div className="subtitle">
                                  Ks {price} per month
                                </div>
                              </Grid>
                              <Grid item xs={6} sm={6} md={6} lg={6}>
                                <Avatar
                                  alt="Remy Sharp"
                                  src={getFullUrl(image)}
                                  style={{
                                    float: "right",
                                    marginRight: "20px",
                                  }}
                                />
                              </Grid>
                            </Grid>
                            <Grid item container>
                              <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    backgroundColor: "rgb(245, 244, 242)",
                                    padding: "6px",
                                    margin: "16px 0px",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(description),
                                  }}
                                ></div>
                                {/* <div
                                  style={{
                                    fontWeight: 'bold',
                                    backgroundColor: 'rgb(245, 244, 242)',
                                    padding: '6px',
                                    margin: '16px 0px',
                                  }}
                                >
                                  {' '}
                                  Patron-only polls
                                </div> */}
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}

                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <div
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "rgb(245, 244, 242)",
                        padding: "16px",
                        margin: "16px 0px",
                        textAlign: "center",
                        borderRadius: "4px",
                      }}
                    >
                      +{" "}
                      <a
                        href="#"
                        className="blue-link"
                        onClick={newhandleOpen}
                        data-name="createPlan"
                      >
                        Add Tiers
                      </a>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
              {/* <CardActions>
                        <Button size='small'>Share</Button>
                        <Button size='small'>Learn More</Button>
                        </CardActions> */}
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/* create new dialog start */}
      <Dialog
        open={state.newDialog}
        onClose={newhandleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle>Create New Subscription</DialogTitle>

        <DialogContent>
          <span style={{ color: "red" }}>{tierError?.message}</span>
          <Grid container style={{ margin: "16px 0px" }}>
            <Grid item xs={12} sm={12} md={4}>
              <p className="input-label"> Tier title </p>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <TextField
                error={tierError?.level ? true : false}
                fullWidth
                required
                id="outlined-required"
                label="Required"
                defaultValue=""
                placeholder="Please enter plan  name"
                color="info"
                name="level"
                helperText={tierError?.level ? "Name is required" : ""}
                onChange={NewformInputValue}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={4}>
              <p className="input-label"> Tier Price </p>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <TextField
                error={tierError?.price ? true : false}
                fullWidth
                required
                id="outlined-required"
                label="Required"
                defaultValue=""
                placeholder="Please enter Price!"
                color="info"
                name="price"
                helperText={tierError?.level ? "Price is required" : ""}
                onChange={NewformInputValue}
              />
            </Grid>
          </Grid>
          <Grid container style={{ margin: "16px 0px" }}>
            <Grid item xs={12} sm={12} md={4}>
              <p className="input-label"> Tier Image </p>
            </Grid>
            <Grid item xs={12} sm={12} md={8} style={{ alignSelf: "center" }}>
              <Box className={classes.tierImage}>
                <input
                  accept="image/*"
                  className=""
                  id="contained-button-file"
                  multiple
                  type="file"
                  name="image"
                  onChange={NewformInputValue}
                />

                <Avatar alt="Remy Sharp" src={preview} />
              </Box>
              <p style={{ color: "red" }}>{tierError?.image}</p>
              <label htmlFor="contained-button-file"></label>
            </Grid>
          </Grid>

          <Grid container style={{ margin: "16px 0px" }}>
            <Grid item xs={12} sm={12} md={4}>
              <p className="input-label"> Tier Description </p>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Editor contents={content} getValue={NewgetValue} />
              <label htmlFor="contained-button-file"></label>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={newhandleClose} data-name="createPlan">
            Cancel
          </Button>
          <Button onClick={createHandleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* edit new dialog start */}
      <Dialog
        open={state.editDialog}
        onClose={edithandleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        data-name="editPlan"
      >
        <DialogTitle>Update Subscription</DialogTitle>
        <DialogContent>
          <Grid container style={{ margin: "16px 0px" }}>
            <Grid item xs={12} sm={12} md={4}>
              <p className="input-label"> Tier title </p>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <TextField
                fullWidth
                required
                id="outlined-required"
                label="Required"
                color="info"
                name="level"
                defaultValue={state.level}
                onChange={EditformInputValue}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={4}>
              <p className="input-label"> Tier Price </p>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <TextField
                fullWidth
                required
                id="outlined-required"
                label="Required"
                defaultValue={state.price}
                placeholder="300000"
                color="info"
                name="price"
                onChange={EditformInputValue}
              />
            </Grid>
          </Grid>
          <Grid container style={{ margin: "16px 0px" }}>
            <Grid item xs={12} sm={12} md={4}>
              <p className="input-label"> Tier Image </p>
            </Grid>
            <Grid item xs={12} sm={12} md={8} style={{ alignSelf: "center" }}>
              <Box className={classes.tierImage}>
                <input
                  accept="image/*"
                  className=""
                  id="contained-button-file"
                  type="file"
                  name="image"
                  onChange={EditformInputValue}
                />
                <Avatar alt="Remy Sharp" src={preview} />
              </Box>
              <label htmlFor="contained-button-file"></label>
            </Grid>
          </Grid>

          <Grid container style={{ margin: "16px 0px" }}>
            <Grid item xs={12} sm={12} md={4}>
              <p className="input-label"> Tier Description </p>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Editor contents={content} getValue={editGetValue} />
              <label htmlFor="contained-button-file"></label>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={edithandleClose} data-name="editPlan">
            Cancel
          </Button>
          <Button onClick={updateTier}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Tiers;
