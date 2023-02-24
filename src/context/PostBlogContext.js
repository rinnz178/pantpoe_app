/** @format */

import React, { createContext } from "react";
import axios from "axios";
import { BaseUrl } from "../helpers/Constant.js";
import { useAuthContext } from "./AuthContext";
import Pusher from "pusher-js";
import { ListTwoTone } from "@mui/icons-material";

const PostBlogContext = createContext();
const PostBlogProvider = ({ children }) => {
  const [newPosts, setNewPost] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [querypage, setQueryPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [reloading, setReloading] = React.useState(false);
  const { token } = useAuthContext();
  const [postType, setPostType] = React.useState({
    "public-content": { data: [], page: 1, lastPage: 1 },
    "pantpoe-content": { data: [], page: 1, lastPage: 1 },
    "subscribe-content": { data: [], page: 1, lastPage: 1 },
  });

  const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    encrypted: true,
  });

  // const listen = () => {
  //   Pusher.logToConsole = true;

  //   const pusher = new Pusher("cbae929ae26fb6b1d072", {
  //     cluster: "ap1",
  //     encrypted: true,
  //   });

  //   var channel = pusher.subscribe("comment-channel");
  //   channel.bind("newComment", function (data) {
  //     var data = data.comment;
  //     refresh();
  //   });
  // };

  const sendGetRequest = async (endPoint = "public-content", page) => {
    if (postType[endPoint].lastPage >= postType[endPoint].page) {
      try {
        const res = await axios({
          method: "get",
          url: `${BaseUrl}/${endPoint}?page=${page}`,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const response = res.data;
        if (response.success) {
          setPosts(res.data?.data);

          setPostType((oldPost) => ({
            ...oldPost,
            [endPoint]: {
              data: [...oldPost[endPoint].data, ...res.data?.data],
              page: page,
              lastPage: res.data?.last_page,
            },
          }));

          setNewPost(false);
          //setQueryPage(0);
        } else {
          const errors = response.data.message;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const refresh = () => {
    setReloading(!reloading);
  };

  const newPostfetch = (data) => {
    setNewPost(data);
  };
  // React.useEffect(() => listen(), []);

  return (
    <PostBlogContext.Provider
      value={{
        postType,
        loading,
        setLoading,
        sendGetRequest,
        pusher,
        reloading,
        setReloading,
        newPostfetch,
        setNewPost,
        newPosts,
        setQueryPage,
      }}
    >
      {children}
    </PostBlogContext.Provider>
  );
};

export const useBlogContext = () => {
  return React.useContext(PostBlogContext);
};

export { PostBlogProvider };