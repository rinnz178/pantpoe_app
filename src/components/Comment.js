/** @format */

import React from "react";
import { Avatar, IconButton, Badge } from "@mui/material";
import {
  CommentContent,
  Content,
  CommentDetail,
  MainReply,
} from "../styled/styles.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import Reply from "./Reply";
import { useAuthContext } from "../context/AuthContext.js";
import { useBlogContext } from "../context/PostBlogContext.js";
import axios from "axios";
import { BaseUrl } from "../helpers/Constant.js";
import EditBox from "./EditBox";
import CommentBox from "./CommentBox.js";
import ReplyBox from "./ReplyBox.js";

const Comment = ({ id, comment, item }) => {
  const [likes, setLikes] = React.useState([]);
  const [liked, setLiked] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [reply, setReply] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const { user, token } = useAuthContext();
  const { reloading, setReloading, pusher } = useBlogContext();

  const handleUpdate = (data) => {
    const formData = new FormData();
    formData.append("content_id", item.content_id);
    formData.append("comment", data);
    formData.append("_method", "put");

    try {
      const response = axios({
        method: "post",
        url: `${BaseUrl}/comment/${id}`,
        data: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      response.then((data) => {
        //  getPosts();
      });
    } catch (response) {
      console.log(response);
    }
    setEdit(false);
    setReloading(!reloading);
  };

  const commentDelete = () => {
    try {
      const response = axios({
        method: "DELETE",
        url: `${BaseUrl}/comment/${id}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      response.then((data) => {
        //  getPosts();
      });
    } catch (response) {
      console.log(response);
    }
    setReloading(!reloading);
  };

  const cancelUpdate = () => {
    setEdit(false);
  };

  const commentLiked = () => {
    let response = null;
    try {
      if (liked) {
        let like_obj = likes.filter(
          (item) => item?.user_info.user.id === user.id
        );
        console.log(like_obj);
        response = axios({
          method: "DELETE",
          url: `${BaseUrl}/comment-like/${like_obj[0].id}`,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = axios({
          method: "post",
          url: `${BaseUrl}/comment-like/`,
          data: { comment_id: id.toString() },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      response.then((data) => {
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
    setReloading(!reloading);
  };

  React.useEffect(() => {
    setLikes(item.comment_likes);
    setList(item?.comment_replies);
  }, [id, item?.comment_likes]);

  React.useEffect(
    () =>
      setLiked(
        item.comment_likes.findIndex(
          (like) => like.user_info.user.id === user?.id
        ) !== -1
      ),
    [likes]
  );

  React.useEffect(() => setStatus(item?.user_info?.user.id === user?.id), [id]);

  React.useEffect(() => {
    var channel = pusher.subscribe("comment-reply-channel");
    channel.bind("newCommentReply", function (data) {
      var res = data.comment_reply;

      if (Number(res.comment_id) === item?.id) {
        console.log(res);
        setList((prev) => [res, ...prev]);
      }
    });
  }, []);

  return (
    <div>
      <CommentContent>
        <Content>
          <Avatar alt="User" src={item?.user_info.profile_image} />
          {!edit && (
            <CommentDetail>
              <h5>{item?.user_info.user.name}</h5>
              <p>{item?.comment}</p>
              <IconButton aria-label="Example" onClick={commentLiked}>
                <Badge
                  badgeContent={item?.comment_like_counts}
                  color={"secondary"}
                >
                  {liked ? (
                    <FavoriteOutlinedIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </Badge>
              </IconButton>
              <IconButton aria-label="Example" onClick={() => setReply(!reply)}>
                <ChatBubbleOutlineIcon fontSize="small" />
              </IconButton>
              {status && (
                <IconButton aria-label="Example" onClick={() => setEdit(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              {status && (
                <IconButton aria-label="Example" onClick={commentDelete}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </CommentDetail>
          )}
          {edit && (
            <EditBox
              name={item?.user_info.user.name}
              oldcontent={item?.comment}
              handleUpdate={handleUpdate}
              cancelUpdate={cancelUpdate}
            />
          )}
        </Content>
        <div className="commentTime">
          {!edit && moment(item?.created_at).fromNow(true)}
        </div>
      </CommentContent>

      {reply && <ReplyBox id={id} cancelButton={() => setReply(false)} />}

      {list &&
        list.map((reply, index) => {
          return <Reply key={index} id={reply?.id} item={reply} />;
        })}
    </div>
  );
};

export default Comment;
