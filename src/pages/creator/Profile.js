/** @format */

import React from "react";
import { useHistory, useParams, useLocation, Redirect } from "react-router-dom";
import CreatorProfileView from "../../components/CreatorProfileView";
import axios from "axios";
import { BaseUrl } from "../../helpers/Constant";
import { useAuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { username } = useParams();

  const { token, searchByprofileUrl } = useAuthContext();

  const { state: locationState } = useLocation();

  const history = useHistory();

  const [state, setState] = React.useState(null);
  const [isSetData, setIsSetData] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const controller = new AbortController();
    const fromData = new FormData();
    fromData.append("s", username);
    fromData.append("status", 1);
    axios
      .get(
        `${BaseUrl}/user/search`,
        {
          params: {
            status: "1",
            s: username,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data.data.length);
        if (res.data.data.length > 0) {
          setState({ ...res.data.data[0], subscribe: "" });
          searchByprofileUrl({ ...res.data.data[0], subscribe: "" });
          setIsSetData(false);
        } else {
          history.push("/*");
        }
      })
      .catch((err) => {
        setIsSetData(false);
        setError(err.message);
      });
    return () => {
      controller.abort();
    };
  }, [username]);

  if (isSetData) {
    return <h3>loading.....</h3>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return <>{state && <CreatorProfileView user={state} />}</>;
};

export default Profile;
