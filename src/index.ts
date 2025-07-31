import { Editor, EditorWebComponent } from "./components/blocks/editor-x/editor";
import { EditorClient } from "./components/blocks/editor-x/editor-client";

// Export the main components
export { Editor, EditorWebComponent, EditorClient };

// Export types for TypeScript users
export type { EditorProps } from "./components/blocks/editor-x/editor";
export type { EditorState, SerializedEditorState } from "lexical";
export type { InitialConfigType } from "@lexical/react/LexicalComposer";
