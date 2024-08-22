import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
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

  useImperativeHandle(ref, () => ({
    ...editorRef.current!,
    setMarkdown: (markdown: string) => {
      editorRef.current?.setMarkdown(markdown);
    },
  }));

  useEffect(() => {
    if (editorRef.current && editorRef.current.getMarkdown() !== value) {
      editorRef.current.setMarkdown(value);
    }
  }, [value]);

  return (
    <Editor
      {...rest}
      editorRef={editorRef}
      markdown={value}
      onChange={(newValue) => {
        if (newValue !== value) {
          onChange(newValue);
        }
      }}
    />
  );
});

ForwardRefEditor.displayName = "ForwardRefEditor";
