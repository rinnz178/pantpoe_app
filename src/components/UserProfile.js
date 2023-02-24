/** @format */

import React, { useEffect, useState } from "react";
import '../App.css';
import { useAuthContext } from "../context/AuthContext";
import UserAccount from "../pages/creator/UserAccount";
const UserProfile = () => {
  const { getUserData, user: authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setLoading(true);
    }
    getUserData()
      .then((res) => {
        console.log(res);
        setUser(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.status === 404) {
        //   setLoading(true);
        // }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // if (loading) {
  //   return (
  //     <div>
  //       <div className="loader-container">
  //     	  <div className="spinner"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <UserAccount user={authUser.role === "creator" ? user?.user_info : user} />
  );
};

export default UserProfile;
