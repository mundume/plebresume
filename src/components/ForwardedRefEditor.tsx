import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
} from "react";

const Editor = dynamic(() => import("./InitializedMDXEditor"), {
  ssr: false,
});

export const ForwardRefEditor = forwardRef<
  MDXEditorMethods,
  MDXEditorProps & { value: string; onChange: (value: string) => void }
>((props, ref) => {
  const { value, onChange, ...rest } = props;
  const editorRef = useRef<MDXEditorMethods>(null);
  const [internalValue, setInternalValue] = useState<string>("");

  useImperativeHandle(ref, () => ({
    ...editorRef.current!,
    setMarkdown: (markdown: string) => {
      console.log("setMarkdown called with:", markdown);
      const sanitizedMarkdown = typeof markdown === "string" ? markdown : "";
      editorRef.current?.setMarkdown(sanitizedMarkdown);
      setInternalValue(sanitizedMarkdown);
    },
  }));

  useEffect(() => {
    console.log("Value prop changed:", value);
    if (typeof value === "string" && value !== internalValue) {
      console.log("Updating internal value to:", value);
      setInternalValue(value);
      editorRef.current?.setMarkdown(value);
    }
  }, [value]);

  const handleChange = (newValue: string) => {
    console.log("handleChange called with:", newValue);
    if (newValue !== internalValue) {
      setInternalValue(newValue);
      onChange(newValue);
    }
  };

  console.log("Rendering ForwardRefEditor with internalValue:", internalValue);

  return (
    <Editor
      {...rest}
      editorRef={editorRef}
      markdown={internalValue}
      onChange={handleChange}
    />
  );
});

ForwardRefEditor.displayName = "ForwardRefEditor";
