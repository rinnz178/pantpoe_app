/** @format */

import React, { useEffect } from "react";
import { useHistory, Redirect, useLocation } from "react-router";
import { useAuthContext, useGlobalContext } from "./../../context/AuthContext";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Avatar, Typography, Divider } from "@mui/material";
import { CustomButton } from "../../layout/CutomerButton";
import TabContents from "../../components/TabContentSec";
import { getFullUrl, BaseUrl } from "../../helpers/Constant";
import api from "../../services/apifinal.service";
import axios from "axios";
import { PostBlogProvider } from "../../context/PostBlogContext";
import SuccessAlert from "./../../layout/SuccessAlert";
import { useTranslation } from "../../languages";
import { CButton } from "../../layout/CCButton";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },

    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  wrapper: {
    // minHeight: "100vh",
    display: "grid",

    placeItems: "center",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      margin:'auto'
      // padding: "20px",
    },
  },
  container: {
    width: "90%",
    textAlign: "center",
    height: "auto",
    [theme.breakpoints.only("xs")]: {},
  },
  card: {
    marginTop: "10px !important",
    boxShadow: "none !important",
    border: "1px solid rgb(229, 227, 221)",
    "& h3": {
      margin: "0px",
    },
  },

  cardcontent: {
    padding: "16px",
  },
  cardLast: {
    marginTop: "8px",
  },
}));

//first user view/ not creator view
const UserHome = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { token, user, success_status } = useAuthContext();
  const { state: locationState } = useLocation();

  const history = useHistory();
  const classes = useStyle();
  const theme = useTheme();
  const islaptop = useMediaQuery(theme.breakpoints.down("md"));
  const [creators, setCreator] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const goToEdit = () => {
    if (user.role === "creator") {
      history.push("/page-setup");
    } else {
      history.push("/step/1");
    }
  };

  const getCreators = async () => {
    setLoading(false);
    await axios
      .get(BaseUrl + "/user/get-creators", {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setCreator(res.data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getCreators();
  }, []);

  return (
    <div className={classes.wrapper}>
      <section className={classes.container}>
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            display={{ xs: "block", sm: "block" }}
            order={{ xs: 1, sm: 2 }}
          >
            <PostBlogProvider>
              <TabContents />
            </PostBlogProvider>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            order={{ xs: 2, sm: 1 }}
            display={{ xs: "none", sm: "block" }}
          >
            {/* supporting */}

            <Card className={classes.card}>
              <CardContent className={classes.cardcontent} style={{'padding':'14px'}}>
                <Grid
                  p={2}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={getFullUrl(user.profile_image)}
                    sx={{ width: 80, height: 80 }}
                  />
                  <span style={{marginTop:'10px'}} component="div">
                    <h5 style={{fontWeight:'bold'}}>{user.name}</h5>
                  </span>
                </Grid>
                <Divider />
                <Grid p={2}>
                  <h4>{t("supporting")}</h4>
                </Grid>
                <Divider />
                <Grid p={2}>
                  {creators.length > 0 || <span m={0}>{t("youAreNot")}</span>}

                  {creators.length > 0 &&
                    creators.map((item, index) => (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography
                          variant="body1"
                          component="div"
                          gutterBottom={false}
                        >
                          {item.creator.user_info.user.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          component="div"
                          gutterBottom={false}
                        >
                          ({item.creator.user_info.profile_url})
                        </Typography>
                      </Box>
                    ))}
                </Grid>
              </CardContent>
            </Card>

            <Box display={{ xs: "none", sm: "block", md: "none" }}>
              <Card className="card card-last ">
                <CardContent className="cardcontent">
                  <Grid p={2}>
                    <h4 m={0}>{t("supporting")}</h4>
                  </Grid>
                  <Divider />
                  <Grid p={2}>
                    <p m={0} mb={2}>
                      You're almost there! Complete your page and take it live.
                    </p>
                    <CustomButton onClick={goToEdit}>
                      {user.role === "creator"
                        ? "Finish My Page"
                        : "Become a creator"}
                    </CustomButton>
                  </Grid>
                </CardContent>
              </Card>

              <Card className="card card-last">
                <CardContent className="cardcontent">
                  <Grid p={2}>
                    <h4 m={0}>FIND CREATORS YOU LOVE</h4>
                  </Grid>
                  <Divider />
                  <Grid p={2}>
                    <p m={0} mb={2}>
                      The creators you already love may be on Patreon – connect
                      your social media to find them.
                    </p>
                    <CustomButton >
                      Find creators
                    </CustomButton>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
            order={{ xs: 2, sm: 3 }}
            display={{ xs: "flex", sm: "none", md: "flex" }}
            flexDirection="column"
          >
            {/* find creator */}

            <Card className={classes.card}>
              <CardContent className={classes.cardcontent}>
                <Grid p={2}>
                  <h4 m={0}>{t("supporting")}</h4>
                </Grid>
                <Divider />
                <Grid>
                  <p m={0} mb={1}>
                    You're almost there! Complete your page and take it live.
                  </p>
                  <CButton onClick={goToEdit}>{t("finishMyPage")}</CButton>
                </Grid>
              </CardContent>
            </Card>

            <Card className={`${classes.card} ${classes.cardLast}`}>
              <CardContent className={classes.cardcontent}>
                <Grid p={2}>
                  <h4 m={0}>{t("findCreatorsYouLove")}</h4>
                </Grid>
                <Divider />
                <Grid px={2} py={1}>
                  <p>
                    The creators you already love may be on Patreon – connect
                    your social media to find them.
                  </p>
                  <CButton component={Link} to="/creator/find-creator">{t("findCreators")}</CButton>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

const Wrapper = styled.section`
  margin: 20px 0px;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 1200px;
    height: auto;
    display: flex;
  }

  .card {
    box-shadow: none !important;
    border: 0.5px solid rgb(229, 227, 221);
  }

  .cardcontent {
    padding: 0px;
  }
  .card h3 {
    margin: 0px;
  }

  .card-last {
    margin-top: 8px;
  }
`;

export default UserHome;
