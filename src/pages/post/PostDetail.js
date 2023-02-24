/** @format */

import React, { useEffect } from "react";
import { useGlobalContext } from "./../../context/AuthContext";
import { useParams } from "react-router-dom";
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
import PostDetailView from "../../components/PostDetailView";
import { useAuthContext } from "../../context/AuthContext";
import { BaseUrl } from "./../../helpers/Constant";
import api from "./../../services/apifinal.service";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },

    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
}));
//first user view/ not creator view
const UserHome = () => {
  // const { getPostByid, post } = usePostContext();
  const { user: authUser, token } = useAuthContext();
  const classes = useStyle();
  const theme = useTheme();
  const islaptop = useMediaQuery(theme.breakpoints.down("md"));
  const [isdataSet, setDataSet] = React.useState(false);
  const [post, setPost] = React.useState(null);

  let { id } = useParams();

  const [changes, setChange] = React.useState(false);

  const changeData = () => {
    setChange(!changes);
  };

  React.useEffect(() => {
    var controller = new AbortController();
    // axios.get(`${BaseUrl}/content/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
    //   .then(res => {
    //       console.log(res.data);
    //     setPost(res.data.data);
    //     setDataSet(true);
    //   })
    api.get(`content/${id}`).then((res) => {
      // console.log(res.data);
      setPost(res.data.data);
      setDataSet(true);
    });

    return () => {
      controller.abort();
    };
  }, [id, changes]);

  if (!isdataSet) {
    return <h3>loading.....</h3>;
  }

  return (
    <Wrapper>
      <section className="container">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            display={{ xs: "block", sm: "block" }}
            order={{ xs: 1, sm: 2 }}>
            {isdataSet && (
              <PostDetailView changeData={changeData} post={post} />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            order={{ xs: 2, sm: 1 }}
            display={{ xs: "none", sm: "block" }}>
            {/* supporting */}

            <Card className="card">
              <CardContent className="cardcontent">
                <Grid
                  p={2}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center">
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 80, height: 80 }}
                  />
                  <Typography variant="subtitle1" mt={2} component="div">
                    chan lay
                  </Typography>
                </Grid>
                <Divider />
                <Grid p={2}>
                  <h3 m={0}>Supporting</h3>
                </Grid>
                <Divider />
                <Grid p={2}>
                  <span m={0}>You aren’t supporting any creators yet.</span>
                </Grid>
              </CardContent>
            </Card>

            <Box display={{ xs: "none", sm: "block", md: "none" }}>
              <Card className="card card-last ">
                <CardContent className="cardcontent">
                  <Grid p={2}>
                    <h3 m={0}>Supporting</h3>
                  </Grid>
                  <Divider />
                  <Grid p={2}>
                    <p m={0} mb={2}>
                      You're almost there! Complete your page and take it live.
                    </p>
                    <CustomButton>Finish my page</CustomButton>
                  </Grid>
                </CardContent>
              </Card>

              <Card className="card card-last">
                <CardContent className="cardcontent">
                  <Grid p={2}>
                    <h3 m={0}>FIND CREATORS YOU LOVE</h3>
                  </Grid>
                  <Divider />
                  <Grid p={2}>
                    <p m={0} mb={2}>
                      The creators you already love may be on PantPoe – connect
                      your social media to find them.
                    </p>
                    <CustomButton>Find creators</CustomButton>
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
            display={{ xs: "block", sm: "none", md: "block" }}>
            {/* find creator */}

            <Card className="card">
              <CardContent className="cardcontent">
                <Grid p={2}>
                  <h3 m={0}>Supporting</h3>
                </Grid>
                <Divider />
                <Grid p={2}>
                  <p m={0} mb={2}>
                    You're almost there! Complete your page and take it live.
                  </p>
                  <CustomButton>Finish my page</CustomButton>
                </Grid>
              </CardContent>
            </Card>

            <Card className="card card-last">
              <CardContent className="cardcontent">
                <Grid p={2}>
                  <h3 m={0}>FIND CREATORS YOU LOVE</h3>
                </Grid>
                <Divider />
                <Grid p={2}>
                  <p m={0} mb={2}>
                    The creators you already love may be on PantPoe – connect
                    your social media to find them.
                  </p>
                  <CustomButton>Find creators</CustomButton>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
    </Wrapper>
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
    border: 1px solid rgb(229, 227, 221);
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
