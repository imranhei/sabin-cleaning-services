import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ value, onChange, readOnly = false }) => {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: readOnly,
    placeholder: "Write the blog content here...",
    height: 400,
    toolbarAdaptive: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "ul",
      "ol",
      "align",
      "outdent",
      "indent",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "link",
      "image",
      "table",
      "undo",
      "redo",
      "hr",
      "eraser",
      "fullsize",
    ],
    uploader: {
      insertImageAsBase64: true,
    },
  }), [readOnly]);

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onChange={onChange}
    />
  );
};

export default RichTextEditor;
