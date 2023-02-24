import React, { useState } from "react";
import imgtwo from "../../assets/images/inmgtwo.png";
import Banner from "../../components/Banner";
import CreatorSearch from "../../components/CreatorSearch";
import CardSession from "../../components/CardSession";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchInput from "../../layout/SearchInput";
import { CustomButton } from "../../layout/CutomerButton";
import { CButton } from "../../layout/CCButton";
import CustomCard from "../../layout/CustomCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import TopicCard from "../../layout/TopicCard";
import { Redirect } from "react-router";
import { useTranslation } from "../../languages";
import Divider from "@mui/material/Divider";
import { useAuthContext } from "./../../context/AuthContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  blogContainer: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  blogtitle: {
    fontWeight: "800 !important",
  },
  blogSearch: {
    marginTop: theme.spacing(5),
    padding: "0px 30px",
    display: "flex",
    alignItems: "center",
  },
  blogcontent: {
    width: "90%",
    padding: "30px 20px",
    textAlign: "center",
    fontSize: "1.2em",
    lineHeight: "2.5rem",
  },
  blogsubtitle: {
    color: "#28a5ff",
    fontSize: "2.2rem",
  },
  CategoryColor: {
    color: (props) => (props.isSelected ? "#000" : "#28a5ff"),
    fontWeight: "500",
    fontSize: "1.8rem",
  },
  imgContainer: {
    marginTop: theme.spacing(10),
    backgroundImage: `linear-gradient( rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${imgtwo})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  profileBlog: {
    backgroundImage: `linear-gradient( rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${imgtwo})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    boxShadow: "-16px -2px 55px 2px rgba(0,0,0,0.45)",
  },
  readyBlog: {
    backgroundColor: "#fbfafa",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const categorylist = [
  "Podcasters",
  "Video Creators",
  "Musicians",
  "Visual Artists",
  "Communities",
  "Witers & Journalists",
  "Gaming Creators",
  "Nonprofits",
  "Tutorials and Education",
  "Creators-of-all-kinds",
];

const Home = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const classes = useStyles();
  const { token } = useAuthContext();

  if (token.length > 1) {
    return <Redirect to={"/home"} />;
  }

  return (
    <>
      <div className="App">
        <Banner />

        <Grid container justifyContent="center">
          <Grid item sm={2}></Grid>
          <Grid item sm={8}>
            <Container className={classes.blogContainer} align="center">
              <Typography variant="h4" className={classes.blogtitle}>
                Search 200,000+ creator on PantPoe
              </Typography>
              <Box className={classes.blogSearch}>
                <Box sx={{ flexGrow: 1, marginRight: "20px" }}>
                  <SearchInput />
                </Box>
                <Box>
                  <CButton fontSize="small">Search</CButton>
                </Box>
              </Box>
            </Container>
            <Container className={classes.blogContainer} align="center">
              <Typography variant="h4" className={classes.blogtitle}>
                {t("whatIsPantPoe")}
              </Typography>
              <Typography variant="body2" className={classes.blogcontent}>
                On PantPoe ,you can let your fans become active participants in
                the work they love by offering them a monthly membership. You
                give them access to exculsive content, community, and insight
                inot your creative process.In exchange,you get the freedom to do
                your best work, and the stability you need to build an
                independen creative career.
              </Typography>
            </Container>
            {/* Develop a recurring start */}

            <Container className={classes.blogContainer} align="center">
              <Grid container spacing={3}>
                <Grid item sm={6} order={1}>
                  <Typography
                    variant="h5"
                    align="left"
                    className={classes.blogsubtitle}
                  >
                    Develop a recurring income stream
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{ padding: "20px" }}
                  >
                    Stop rolling the dice of ad revenue and per-stream
                    payouts.Get recurring income through monthly payments from
                    your pantpoe.
                  </Typography>
                </Grid>
                <Grid item sm={6} order={2}>
                  <CustomCard />
                </Grid>
              </Grid>
            </Container>

            <Container className={classes.blogContainer} align="center">
              <Grid container spacing={3}>
                <Grid item sm={6} order={2}>
                  <Typography
                    variant="h5"
                    align="left"
                    className={classes.blogsubtitle}
                  >
                    Take back creative control
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{ padding: "20px" }}
                  >
                    Stop rolling the dice of ad revenue and per-stream
                    payouts.Get recurring income through monthly payments from
                    your pantpoe
                  </Typography>
                </Grid>
                <Grid item sm={6} order={1}>
                  <CustomCard />
                </Grid>
              </Grid>
            </Container>

            <Container className={classes.blogContainer} align="center">
              <Grid container spacing={3}>
                <Grid item sm={6} order={1}>
                  <Typography
                    variant="h5"
                    align="left"
                    className={classes.blogsubtitle}
                  >
                    Build a direct, meaningful connection with you audience
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{ padding: "20px" }}
                  >
                    Stop rolling the dice of ad revenue and per-stream
                    payouts.Get recurring income through monthly payments from
                    your pantpoe.
                  </Typography>
                </Grid>
                <Grid item sm={6} order={2}>
                  <CustomCard />
                </Grid>
              </Grid>
            </Container>
            <Container className={classes.blogContainer} align="center">
              <Typography variant="h4" className={classes.blogtitle}>
                Who uses Pantpoe?
              </Typography>
              <Typography variant="body2" className={classes.blogcontent}>
                On Pantpoe, you can let your fans become active participants in
                the work they love by offering them a monthly membership.You
                give
              </Typography>
            </Container>

            {/* //Links with photo */}

            <Grid container spacing={12}>
              <Grid item sm={6}>
                <Box
                  sx={{ height: "450px" }}
                  className={classes.imgContainer}
                ></Box>
              </Grid>
              <Grid item sm={6}>
                <List>
                  {categorylist.map((c, index) => {
                    return (
                      <ListItem key={c}>
                        <Typography
                          variant="h5"
                          className={classes.CategoryColor}
                        >
                          {c}
                        </Typography>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>

            <Container className={classes.blogContainer} align="center">
              <Typography variant="h4" className={classes.blogtitle}>
                It’s easier than you think .
              </Typography>
              <Typography variant="body2" className={classes.blogcontent}>
                There are many ways to delight you fans and every creator can
                find their own
              </Typography>

              <Box
                sx={{ height: "450px" }}
                className={classes.profileBlog}
              ></Box>
            </Container>

            <Container className={classes.blogContainer}>
              <Typography variant="h4" className={classes.blogtitle}>
                See how other creators use Pantpoe
              </Typography>
              <Grid container spacing={5} alignItems="stretch">
                <Grid item sm={4}>
                  <TopicCard
                    img="https://live-patreon-marketing.pantheonsite.io/wp-content/uploads/2020/12/is-patreon-right-for-you_2x.jpg"
                    title="Is Patreon Right for you and your Business"
                    info="n this article, we want to introduce you to the membership model—an effective, field-tested way for independent creators"
                  />
                </Grid>
                <Grid item sm={4}>
                  <TopicCard
                    img="https://live-patreon-marketing.pantheonsite.io/wp-content/uploads/2020/12/is-patreon-right-for-you_2x.jpg"
                    title="6 Membership-based Business Models You Can Use On Patreon Today"
                    info="n this article, we want to introduce you to the membership model—an effective, field-tested way for independent creators"
                  />
                </Grid>
                <Grid item sm={4}>
                  <TopicCard
                    img="https://live-patreon-marketing.pantheonsite.io/wp-content/uploads/2020/12/is-patreon-right-for-you_2x.jpg"
                    title="The 20 Modst  Useful Parteron Features adn Integrations"
                    info="n this article, we want to introduce you to the membership model—an effective, field-tested way for independent creators"
                  />
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item sm={2}></Grid>
        </Grid>
        <Divider style={{ marginTop: "7vh", opacity: "0.2" }} />
        <div className={classes.readyBlog} align="center">
          <Typography variant="h4" className={classes.blogtitle} pb={3}>
           Are you ready to take back Control?
          </Typography>

          <Link to="/register" style={{textDecoration:'none',color:'white'}}><CButton fontSize="small"> Get Started</CButton></Link>
        </div>
      </div>
    </>
  );
};
export default Home;
