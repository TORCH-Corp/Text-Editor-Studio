// Test TypeScript imports for text-editor-studio-ts package
import { Editor, EditorProps, EditorState, SerializedEditorState, InitialConfigType } from './dist/index.js';

// Test that types are properly exported
const testProps: EditorProps = {
  placeholder: "Test placeholder",
  className: "test-class",
  onChange: (state: EditorState) => {
    console.log('State changed:', state);
  },
  onSerializedChange: (serialized: SerializedEditorState) => {
    console.log('Serialized changed:', serialized);
  },
  onHtmlChange: (html: string) => {
    console.log('HTML changed:', html);
  }
};

// Test that Editor component is properly typed
const editor: React.FC<EditorProps> = Editor;

console.log('✅ All imports work correctly!');
console.log('✅ Editor component:', typeof Editor);
console.log('✅ EditorProps interface available');
console.log('✅ Lexical types re-exported');

export { Editor, EditorProps, EditorState, SerializedEditorState, InitialConfigType };