import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "code"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code",
];

type Props = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const TextEditor: React.FC<Props> = ({ value = "", onChange, placeholder }) => {
  const handleChange = (content: string) => {
    onChange(content);
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      modules={modules}
      formats={formats}
      onChange={handleChange}
      placeholder={placeholder}
      defaultValue={value}
    />
  );
};

export default TextEditor;
