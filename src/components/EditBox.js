/** @format */

import React from "react";
import { CommentDetail } from "../styled/styles";
import { TextareaAutosize, Button } from "@mui/material";

const EditBox = ({ name, oldcontent, handleUpdate, cancelUpdate }) => {
  const [content, setContent] = React.useState("");
  const handleClick = () => {
    handleUpdate(content);
  };
  React.useEffect(() => setContent(oldcontent), [oldcontent]);
  return (
    <CommentDetail>
      <h4>{name}</h4>
      {/*  comment input handleing start  */}
      <div style={{ marginRight: "8px", width: "100%" }}>
        <TextareaAutosize
          // onKeyPress={enterCommentLine}
          value={content}
          name="content"
          id="comments-input-edit"
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          placeholder="Add a comment..."
          aria-label="minimum height"
          minRows={4}
          style={{ width: "100%", resize: "none" }}
        />
        <Button
          style={{ float: "right", marginTop: "10px" }}
          onClick={handleClick}
          type="submit"
          variant="outlined"
          className="comments-button">
          Save
        </Button>
        <Button
          style={{ float: "left", marginTop: "10px" }}
          onClick={() => cancelUpdate()}
          color="secondary"
          type="submit"
          variant="outlined"
          className="comments-button">
          Cancel
        </Button>
      </div>
      {/* comment input handling end */}
    </CommentDetail>
  );
};

export default EditBox;
