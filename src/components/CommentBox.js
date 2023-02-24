/** @format */

import { Button, IconButton, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import Picker from "emoji-picker-react";
import axios from "axios";
import { BaseUrl } from "../helpers/Constant.js";
import { useAuthContext } from "../context/AuthContext";
import { useBlogContext } from "../context/PostBlogContext";
import { Send } from "@mui/icons-material";
import "../assets/cus.module.css";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const CommentBox = ({ result = "", ...props }) => {
  // const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setValue((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
  const [value, setValue] = useState("");
  const { id } = props;
  const { boxType } = props;
  const { token } = useAuthContext();
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
      url: `${BaseUrl}/comment/`,
      data: { content_id: id.toString(), comment: value },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setReloading(!reloading);
    setValue("");
  };
  return (
    <div className="row">
      <form
        className="mx-auto picker-container"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <input
          // onKeyPress={enterCommentLine}
          className="form-control-sm input-style"
          value={value}
          name={boxType}
          // id="comments-input"
          onChange={getData}
          variant="outlined"
          placeholder="Add a comment..."
          minRows={1}
          style={{
            width: "100%",
            resize: "none",
            // padding: 12,
            borderRadius: "30px",
            backgroundColor: "#eff1f1",
            // borderColor: "#D9D8D8",
            border: "none",
            borderWidth: "0.5px",
            height: "40px",
          }}
        />

        <div style={{
            backgroundColor: "#eff1f1",
            borderRadius: "50px",
            border: "none",
            padding: "8px",
            // marginTop: "2px",
            cursor: "pointer",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",}}>
          <EmojiEmotionsIcon
            style={{
              color: "gray",
              fontSize: "25px",
            }}
            className="emoji-icon"
            // src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            onClick={() => setShowPicker((val) => !val)}
          />
        </div>
        <button
          style={{
            backgroundColor: "#eff1f1",
            borderRadius: "50px",
            border: "none",
            padding: "8px",
            // marginTop: "2px",
            cursor: "pointer",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
          onSubmit={handleSubmit}
          type="submit"
          variant="outlined"
          className="comments-button"
          id={changeCommentButtonStyle()}
          disabled={enableCommentButton()}
        >
          <Send
            style={{
              fontSize: "25px",
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              flexDirection: "row",
              alignItems: "flex-start",
              color: "gray",
            }}
            // icon={faSearchDollar}
          />
        </button>
      </form>
      {showPicker && (
        <Picker
          pickerStyle={{ width: "100%", top: "2vh" }}
          onEmojiClick={onEmojiClick}
        />
      )}
    </div>
  );
};

export default CommentBox;
