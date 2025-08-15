import React, { useRef, useMemo, useState, useEffect } from "react";

const RichTextEditor = ({ value = "", onChange = () => {}, readOnly = false }) => {
  const [JoditEditor, setJoditEditor] = useState(null);
  const [mounted, setMounted] = useState(false);
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
    setMounted(true); // Marks that we're on the client
    import("jodit-react").then((module) => {
      setJoditEditor(() => module.default);
    });
  }, []);

  if (!mounted) {
    return null; // Render nothing on server to avoid mismatch
  }

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
