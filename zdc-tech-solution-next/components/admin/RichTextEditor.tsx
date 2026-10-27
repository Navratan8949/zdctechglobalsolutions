"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

// React-Quill uses document so it cannot be SSR'd
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-32 w-full animate-pulse bg-slate-100 dark:bg-white/5 rounded-md" />
  ),
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
    [],
  );

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
      />
      <style jsx global>{`
        /* Dark Theme Styles */
        .dark .rich-text-editor .ql-toolbar {
          background-color: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
        }
        .dark .rich-text-editor .ql-container {
          border-color: rgba(255, 255, 255, 0.1);
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          min-height: 150px;
          font-size: 14px;
          background-color: transparent;
          color: #f8fafc;
        }
        .dark .rich-text-editor .ql-stroke {
          stroke: rgba(255, 255, 255, 0.75) !important;
        }
        .dark .rich-text-editor .ql-fill {
          fill: rgba(255, 255, 255, 0.75) !important;
        }
        .dark .rich-text-editor .ql-picker {
          color: rgba(255, 255, 255, 0.75) !important;
        }
        .dark .rich-text-editor .ql-picker-options {
          background-color: #0f1729 !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
        }
        .dark .rich-text-editor .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.4);
        }

        /* Light Theme Styles */
        .light .rich-text-editor .ql-toolbar {
          background-color: #f8fafc;
          border-color: #cbd5e1;
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
        }
        .light .rich-text-editor .ql-container {
          border-color: #cbd5e1;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          min-height: 150px;
          font-size: 14px;
          background-color: #ffffff;
          color: #0f172a;
        }
        .light .rich-text-editor .ql-stroke {
          stroke: #475569 !important;
        }
        .light .rich-text-editor .ql-fill {
          fill: #475569 !important;
        }
        .light .rich-text-editor .ql-picker {
          color: #334155 !important;
        }
        .light .rich-text-editor .ql-picker-options {
          background-color: #ffffff !important;
          border-color: #cbd5e1 !important;
          color: #0f172a !important;
        }
        .light .rich-text-editor .ql-editor.ql-blank::before {
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}
