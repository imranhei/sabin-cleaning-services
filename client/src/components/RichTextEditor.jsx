import React, { useRef, useMemo, useState, useEffect } from "react";

const RichTextEditor = ({ value, onChange, readOnly = false }) => {
  const [JoditEditor, setJoditEditor] = useState(null);
  const editor = useRef(null);

  // Same config memoized
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("jodit-react").then((module) => {
        setJoditEditor(() => module.default);
      });
    }
  }, []);

  if (!JoditEditor) {
    return <div>Loading editor...</div>;
  }

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
