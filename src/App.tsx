"use client";

import { useState } from "react";

import { SerializedEditorState } from "lexical";
import { Editor } from "./components/blocks/editor-x/editor";

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Hello World 🚀",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function EditorDemo() {
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue);
  const [htmlContent, setHtmlContent] = useState<string>("");
  console.log("HTML Content:", htmlContent);

    return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-hidden bg-background">
      <div className="h-full w-full max-w-full p-2 md:p-4 overflow-x-hidden">
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
          onHtmlChange={(html) => {
            console.log("HTML Content:", html);
            setHtmlContent(html);
          }}
        />
      </div>
    </div>
  );
}
