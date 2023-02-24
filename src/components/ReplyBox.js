/** @format */

import { Button, TextareaAutosize, Avatar } from "@mui/material";
import React from "react";
import axios from "axios";
import { BaseUrl, getFullUrl } from "../helpers/Constant";
import { useAuthContext } from "../context/AuthContext";
import { useBlogContext } from "../context/PostBlogContext";
import { ReplyBoxDiv, ReplyDetail } from "./../styled/styles.js";

const ReplyBox = ({ result = "", ...props }) => {
  const [value, setValue] = React.useState("");
  const { id, cancelButton } = props;
  const { boxType } = props;
  const { token, user } = useAuthContext();
  const { reloading, setReloading } = useBlogContext();

  const enableCommentButton = () => {
    return value.length > 0 ? false : true;
  };
  const changeCommentButtonStyle = () => {
    return value.length > 0
      ? "comments-button-enabled"
      : "comments-button-disabled";
  };

  const getData = (e) => {
    // handleCommentValue(e);
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: `${BaseUrl}/comment-reply/`,
      data: { comment_id: id.toString(), comment: value },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setReloading(!reloading);
    cancelButton();
  };
  return (
    <ReplyBoxDiv>
      <Avatar alt="Avatar" src={getFullUrl(user?.profile_image)} />

      <ReplyDetail>
        <h4>{user?.name}</h4>
        <form
          style={{ marginRight: "8px", width: "100%" }}
          onSubmit={handleSubmit}>
          <TextareaAutosize
            // onKeyPress={enterCommentLine}
            value={value}
            name={boxType}
            id="comments-input"
            onChange={getData}
            variant="outlined"
            placeholder="Add a comment..."
            aria-label="minimum height"
            minRows={4}
            style={{ width: "100%", resize: "none" }}
          />
          <Button
            style={{ float: "right", marginTop: "10px", marginLeft: "20px" }}
            type="submit"
            variant="outlined"
            className="comments-button"
            id={changeCommentButtonStyle()}
            disabled={enableCommentButton()}>
            Reply
          </Button>
          <Button
            style={{ float: "right", marginTop: "10px" }}
            type="submit"
            color="secondary"
            variant="outlined"
            onClick={cancelButton}
            className="comments-button"
            id={changeCommentButtonStyle()}>
            Cancel
          </Button>
        </form>
      </ReplyDetail>
    </ReplyBoxDiv>
  );
};

export default ReplyBox;
