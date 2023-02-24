/** @format */

import React, { useRef, useEffect } from "react";
import JoditEditor from "jodit-react";

const config = {
  buttons: [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "ul",
    "ol",
    "|",
    "center",
    "left",
    "right",
    "justify",
    "|",
    "link",
    // 'image',
  ],
  uploader: { insertImageAsBase64URI: true },
  removeButtons: ["brush", "file", "image"],
};

const Editor = (props) => {
  const { contents, getValue } = props;
  // console.log(contents);

  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={contents}
      config={config}
      // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {
        console.log(newContent);
        getValue(newContent);
      }}
    />
  );
};

export default Editor;
