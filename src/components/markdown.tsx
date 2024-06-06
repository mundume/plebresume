import React, { useCallback, useState } from "react";
import SimpleMDE, { SimpleMDEReactProps } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export const ControlledUsage = ({
  value,
}: {
  value: string;
  onChange: any;
}) => {
  const options: SimpleMDEReactProps = {
    options: {
      hideIcons: ["preview", "side-by-side", "fullscreen"],
    },
  };

  const [editor, setEditor] = useState("");
  const onChange = useCallback((value: string) => {
    setEditor(value);
  });
  return <SimpleMDE value={value} onChange={onChange} options={options} />;
};
