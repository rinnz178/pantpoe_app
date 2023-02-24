/** @format */

import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ oldvalue = "", ...props }) => {
  const { contents, getValue } = props;
  console.log(contents);
  const [content, setContent] = React.useState("");
  const editor = useRef(null);

  const placeholder = " type herr";
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

  return useMemo(
    () => (
      <JoditEditor
        ref={editor}
        value={contents}
        config={config}
        onChange={(content) => getValue(content)}
      />
    ),
    []
  );
};

export default Editor;
