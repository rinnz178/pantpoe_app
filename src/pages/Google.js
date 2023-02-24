/** @format */

import React from "react";
import GoogleLogin from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import styles from "../assets/cus.module.css";
import { useAuthContext } from "../context/AuthContext";
import { useTranslation } from "../../src/languages";


export default function Google(props) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { loginByPovider } = useAuthContext();
  const onResponse = (googleResponse) => {
    console.log("helo");
    console.log(googleResponse);
    if (googleResponse) {
      const res = googleResponse.profileObj;
      console.log(res);
      const formData = {
        email: res?.email,
        token: res?.googleId,
        provider: "Google",
        name: res?.name,
        image: res?.imageUrl,
      };
      console.log(formData);
      loginByPovider(formData, "google");
    } else {
      console.log("none");
    }
  };
  return (
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`}
      autoLoad={false}
      isSignedIn={false}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          className={`${styles.mkBtn} ${styles.mkBtnBg}`}
        >
          <GoogleIcon />
          {t('continueWithGoogle')}
        </button>
      )}
      onSuccess={onResponse}
      onFailure={onResponse}
      cookiePolicy={"single_host_origin"}
    />
  );
}
