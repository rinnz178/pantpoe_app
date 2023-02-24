/** @format */

import React from "react";
import { makeStyles } from "@mui/styles";
import ReactFacebookLogin from "react-facebook-login";
import styles from "../assets/cus.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useAuthContext } from "../context/AuthContext";
import { responsiveProperty } from "@mui/material/styles/cssUtils";
import { useTranslation } from "../../src/languages";


export default function FacebookLogin(props) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { loginByPovider } = useAuthContext();
  const onResponse = (resp) => {
    try {
      const current_time = new Date();
      console.log(current_time.getTime());

      console.log(resp);
      const formData = {
        email: resp?.email,
        token: resp?.id,
        provider: "Facebook",
        name: resp?.name,
        image: resp?.picture.data.url,
      };
      console.log(formData);
      loginByPovider(formData, "facebook");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ReactFacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID} // we created this, remember?
      autoLoad={false}
      fields="name,email,picture"
      callback={onResponse}
      cssClass={`${styles.mkBtn} ${styles.mkBtnBg}`}
      textButton={t('continueWithFacebook')}
      icon={<FacebookIcon />}
    />
  );
}
