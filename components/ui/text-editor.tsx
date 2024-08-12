import { cn } from "@/lib/utils";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: any;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

// Define editor modules
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link"],
    [{ align: [] }],
    ["clean"],
  ],
};

// Define editor formats
const formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "link",
  "align",
];

export default QuillEditor;
