"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

// React-Quill uses document so it cannot be SSR'd
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="h-32 w-full animate-pulse bg-white/5 rounded-md" />,
});

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something amazing...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "clean"],
      ],
    }),
    []
  );

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="text-white border-white/10"
      />
      <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          background-color: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
        }
        .rich-text-editor .ql-container {
          border-color: rgba(255, 255, 255, 0.1);
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          min-height: 150px;
          font-size: 14px;
          background-color: transparent;
        }
        .rich-text-editor .ql-stroke {
          stroke: rgba(255, 255, 255, 0.7) !important;
        }
        .rich-text-editor .ql-fill {
          fill: rgba(255, 255, 255, 0.7) !important;
        }
        .rich-text-editor .ql-picker {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
