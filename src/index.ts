import { Editor, EditorWebComponent } from "./components/blocks/editor-x/editor";
import "./index.css";

// Export the main components
export { Editor, EditorWebComponent };

// Export types for TypeScript users
export type { EditorProps } from "./components/blocks/editor-x/editor";
export type { EditorState, SerializedEditorState } from "lexical";
export type { InitialConfigType } from "@lexical/react/LexicalComposer";
