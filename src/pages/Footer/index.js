import React, { useState } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Avatar, Grid, Typography } from "@mui/material";
import logo from "../../assets/images/logo-white.png";
import twitter from "../../assets/social/twitter.svg";
import facebook from "../../assets/social/facebook.svg";
import instagram from "../../assets/social/instagram.svg";
import youtube from "../../assets/social/youtube.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "../../languages";
import { LanguageChangeModal } from "./components/Modal";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import "../../assets/dropdown.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  // [theme.breakpoints.down('xl')]: {
  //   footer: {
  //     marginTop: theme.spacing(5),
  //     background: 'black',
  //     color: 'white',
  //     padding: '10px 0px',
  //     alignItems: 'center',
  //   }
  // },
  // [theme.breakpoints.down('lg')]: {
  //   footer: {
  //     marginTop: theme.spacing(5),
  //     background: 'black',
  //     color: 'white',
  //     padding: '10px 0px',
  //     alignItems: 'center',
  //   }
  // },
  [theme.breakpoints.up("md")]: {
    footer: {
      marginTop: theme.spacing(5),
      background: "black",
      color: "white",
      padding: "30px 100px",
      alignItems: "center",
    },
  },
  [theme.breakpoints.down("md")]: {
    footer: {
      marginTop: theme.spacing(5),
      background: "black",
      color: "white",
      padding: "20px 50px",
      alignItems: "center",
    },
    center: {
      textAlign: "center",
      margin: "auto",
    },
  },
  footerBorder: {
    border: "0.5px solid white",
    borderRadius: "2px",
    margin: "6px 0px",
    padding: "3px",
    height: "32px",
    cursor: "pointer",
  },
  subTitle: {
    fontSize: "13px",
  },
  social: {
    width: "25px",
    height: "25px",
    padding: "6px",
  },
  myanmar: {
    width: "20px",
    height: "20px",
    padding: "1px",
  },
}));

const PC = () => {
  const { t } = useTranslation();
  const [isOpenModal, setOpenModal] = useState(false);
  const { i18n } = useTranslation();
  //   get current language
  // console.log(i18n.language)
  const classes = useStyles();
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            alt="Remy Sharp"
            src={logo}
            sx={{ width: 70, height: 70 }}
            className={classes.center}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          lg={2}
          justifyContent="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" className={classes.center}>
            {t("weSucceedWhenYouSucceed")}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          onClick={() => {
            setOpenModal(true);
          }}
          // onClick={() => i18n.setLanguage("en")}
          item
          xs={12}
          sm={12}
          md={5}
          lg={4}
          justifyContent="center"
          alignItems="center"
          className={classes.footerBorder}
        >
          <Typography>Language: {t("languagechange")}</Typography>
        </Grid>
        <LanguageChangeModal
          visible={isOpenModal}
          onDismiss={() => setOpenModal(false)}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={1}
          lg={2}
          justifyContent="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          justifyContent="center"
          alignItems="center"
        >
          <Grid container item>
            <Grid
              item
              sm={1}
              md={1}
              lg={1}
              justifyContent="center"
              alignItems="center"
            ></Grid>
            <Grid
              item
              sm={5}
              md={5}
              lg={5}
              justifyContent="center"
              alignItems="center"
            >
              <Typography>{t("resource")}</Typography>
            </Grid>
            <Grid
              item
              sm={6}
              md={6}
              lg={6}
              justifyContent="center"
              alignItems="center"
            >
              <Typography>Company</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          justifyContent="center"
          alignItems="center"
          className={classes.footerBorder}
        >
          <ReactCountryFlag
            className="emojiFlag"
            countryCode="MM"
            style={{
              fontSize: "1.5em",
            }}
            aria-label="Myanmar"
          />
          <span>Myanmar (Burma)</span>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          lg={2}
          justifyContent="center"
          alignItems="center"
        ></Grid>

        <Grid
          container
          sx={{ display: { md: "none", lg: "none", xl: "none" } }}
        >
          <Grid
            item
            sm={1}
            md={1}
            lg={1}
            justifyContent="center"
            alignItems="center"
          ></Grid>
          <Grid
            item
            sm={3}
            md={3}
            lg={3}
            justifyContent="center"
            alignItems="center"
          >
            <Typography></Typography>
          </Grid>
          <Grid
            item
            sm={6}
            md={6}
            lg={6}
            justifyContent="center"
            alignItems="center"
          >
            <Typography>Company</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          justifyContent="center"
          alignItems="center"
        >
          <Grid container>
            <Grid
              item
              xs={1}
              sm={1}
              md={1}
              lg={1}
              justifyContent="center"
              alignItems="center"
            ></Grid>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              justifyContent=""
              alignItems=""
            >
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <span
                      style={{ cursor: "pointer", fontSize: "13px" }}
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      Tutorial for creators
                    </span>
                    <Popover
                      style={{ width: "100%" }}
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "150px",
                          borderRadius: "1px",
                          padding: "7px",
                        }}
                      >
                        <Link className="drop-cnt">Create account</Link>
                        <Divider />
                        <Link className="drop-cnt">Make a post</Link>
                        <Divider />
                        <Link className="drop-cnt">Define tiers</Link>
                        <Divider />
                        <Link className="drop-cnt">How to get paid</Link>
                      </div>
                    </Popover>
                  </div>
                )}
              </PopupState>
              {/* <Typography className={classes.subTitle}>{t("blog")}</Typography> */}
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <span
                      style={{ cursor: "pointer", fontSize: "13px" }}
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      Tutorial for Pantpoethu
                    </span>
                    <Popover
                      style={{ width: "100%" }}
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "150px",
                          borderRadius: "1px",
                          padding: "7px",
                        }}
                      >
                        <Link className="drop-cnt">Create account</Link>
                        <Divider />
                        <Link className="drop-cnt">Search a creator</Link>
                        <Divider />
                        <Link className="drop-cnt">Support a creator</Link>
                      </div>
                    </Popover>
                  </div>
                )}
              </PopupState>
              <Typography className={classes.subTitle}><Link to="/faq" style={{textDecoration:'none',color:'white'}}>FAQ</Link></Typography>

            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              justifyContent="center"
              alignItems="center"
            >
              <Typography className={classes.subTitle}>
                {t("aboutUs")}
              </Typography>
              <Typography
                style={{ textDecoration: "none", color: "white" }}
                className={classes.subTitle}
                to="/policy/termsAndcondition"
                component={Link}
              >
                {t("termAndCondition")}
              </Typography>
              <Typography className={classes.subTitle}>Privacy</Typography>
              <Typography className={classes.subTitle}>Contact us</Typography>
                        
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={4} sm={4} md={4} lg={4} display="inline-flex">
          <Avatar alt="Remy Sharp" src={twitter} className={classes.social} />
          <Avatar alt="Remy Sharp" src={facebook} className={classes.social} />
          <Avatar alt="Remy Sharp" src={instagram} className={classes.social} />
          <Avatar alt="Remy Sharp" src={youtube} className={classes.social} />
        </Grid>
      </Grid>
    </Box>
  );
};
const Mobile = () => {
  const { t } = useTranslation();
  const [isOpenModal, setOpenModal] = useState(false);
  const { i18n } = useTranslation();
  // console.log(i18n.language) // get current language
  const classes = useStyles();
  return (
    <Box style={{marginBottom:'7vh'}}>
      <Grid container >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          justifyContent="center"
          alignItems="center"
        >
          <Box style={{ marginLeft: "15vh" }}>
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{ width: 70, height: 70 }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          justifyContent="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" className={classes.center}>
            {t("weSucceedWhenYouSucceed")}
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ margin: "4px 0px" }}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.center}>
          <Typography variant="h5" display="inline-flex">
            <Avatar alt="Remy Sharp" src={twitter} className={classes.social} />
            <Avatar
              alt="Remy Sharp"
              src={facebook}
              className={classes.social}
            />
            <Avatar
              alt="Remy Sharp"
              src={instagram}
              className={classes.social}
            />
            <Avatar alt="Remy Sharp" src={youtube} className={classes.social} />
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          onClick={() => {
            setOpenModal(true);
          }}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          justifyContent="center"
          alignItems="center"
          className={classes.footerBorder}
        >
          <Typography>Language: {t("languagechange")}</Typography>
        </Grid>
        <LanguageChangeModal
          visible={isOpenModal}
          onDismiss={() => setOpenModal(false)}
        />

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          justifyContent="center"
          alignItems="center"
        ></Grid>
        <Grid
          onClick={() => i18n.setLanguage("my")}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          justifyContent="center"
          alignItems="center"
          className={classes.footerBorder}
        >
          <ReactCountryFlag
            className="emojiFlag"
            countryCode="MM"
            style={{
              fontSize: "1.5em",
            }}
            aria-label="Myanmar"
          />
          <span>Myanmar (Burma)</span>
        </Grid>
      </Grid>

      <Grid container sx={{ margin: "14px 0px" }}>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>{t("resource")}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>{t("company")}</Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          justifyContent="center"
          alignItems="center"
        >
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <span
                  style={{ cursor: "pointer", fontSize: "13px" }}
                  variant="contained"
                  {...bindTrigger(popupState)}
                >
                  Tutorial for creators
                </span>
                <Popover
                  style={{ width: "100%" }}
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <div
                    style={{
                      width: "150px",
                      borderRadius: "1px",
                      padding: "7px",
                    }}
                  >
                    <Link className="drop-cnt">Create account</Link>
                    <Divider />
                    <Link className="drop-cnt">Make a post</Link>
                    <Divider />
                    <Link className="drop-cnt">Define tiers</Link>
                    <Divider />
                    <Link className="drop-cnt">How to get paid</Link>
                  </div>
                </Popover>
              </div>
            )}
          </PopupState>

          {/* <Typography className={classes.subTitle}>{t("blog")}</Typography> */}
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          justifyContent="center"
          alignItems="center"
        >
          <Typography className={classes.subTitle}>{t("aboutUs")}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          justifyContent="center"
          alignItems="center"
        >
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <span
                  style={{ cursor: "pointer", fontSize: "13px" }}
                  variant="contained"
                  {...bindTrigger(popupState)}
                >
                  Tutorial for Pantpoethu
                </span>
                <Popover
                  style={{ width: "100%" }}
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <div
                    style={{
                      width: "150px",
                      borderRadius: "1px",
                      padding: "7px",
                    }}
                  >
                    <Link className="drop-cnt">Create account</Link>
                    <Divider />
                    <Link className="drop-cnt">Search a creator</Link>
                    <Divider />
                    <Link className="drop-cnt">Support a creator</Link>
                  </div>
                </Popover>
              </div>
            )}
          </PopupState>
          <Typography className={classes.subTitle}>{t("FAQ")}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          justifyContent="center"
          alignItems="center"
        >
          <Typography className={classes.subTitle}>
            {t("termAndCondition")}
          </Typography>
          <Typography className={classes.subTitle}>{t("privacy")}</Typography>
          <Typography className={classes.subTitle}>
            {t("Contact us")}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const ismatch = useMediaQuery(theme.breakpoints.up("md"));
  return (
    // <span>{`(min-width:600px) matches: ${matches}`}</span>

    <Box spacing={2} className={classes.footer}>
      {ismatch ? <PC /> : <Mobile />}
    </Box>
  );
};
export default Footer;
