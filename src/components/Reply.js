/** @format */

import React from "react";
import {
  MainReply,
  ReplyInfo,
  ReplyDetail,
  Counting,
} from "../styled/styles.js";
import { Avatar, IconButton, Badge } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import EditBox from "./EditBox.js";
import axios from "axios";
import { BaseUrl } from "../helpers/Constant.js";
import { useAuthContext } from "../context/AuthContext.js";
import { useBlogContext } from "../context/PostBlogContext.js";

const Reply = ({ id, item }) => {
  const [edit, setEdit] = React.useState(false);
  const [status, setStatus] = React.useState(false);

  const { user, token } = useAuthContext();
  const { reloading, setReloading } = useBlogContext();

  const handleUpdate = (data) => {
    const formData = new FormData();
    formData.append("comment_id", item.comment_id);
    formData.append("comment", data);
    formData.append("_method", "put");

    try {
      const response = axios({
        method: "post",
        url: `${BaseUrl}/comment-reply/${id}`,
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

  const cancelUpdate = () => {
    setEdit(false);
  };

  const replyDelete = () => {
    try {
      const response = axios({
        method: "DELETE",
        url: `${BaseUrl}/comment-reply/${id}`,
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

  React.useEffect(() => setStatus(item?.user_info?.user.id === user?.id), [id]);

  return (
    <MainReply>
      <ReplyInfo>
        <Avatar alt="Avatar" src={item?.user_info.profile_image} />
        {!edit && (
          <ReplyDetail>
            <h4>{item?.user_info.user.name}</h4>
            <p>{item?.comment}</p>
            {status && (
              <IconButton aria-label="Example" onClick={() => setEdit(!edit)}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {status && (
              <IconButton aria-label="Example" onClick={replyDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </ReplyDetail>
        )}
        {edit && (
          <EditBox
            name={item?.user_info.user.name}
            oldcontent={item?.comment}
            handleUpdate={handleUpdate}
            cancelUpdate={cancelUpdate}
          />
        )}
      </ReplyInfo>
      <div className="commentTime">
        {edit || moment(item?.created_at).fromNow(true)}
      </div>
    </MainReply>
  );
};

export default Reply;
