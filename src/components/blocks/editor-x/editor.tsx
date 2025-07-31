import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import { EditorState, SerializedEditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// Dynamic import of r2wc for web component creation

import { FloatingLinkContext } from "@/components/editor/context/floating-link-context";
import { SharedAutocompleteContext } from "@/components/editor/context/shared-autocomplete-context";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";

import { nodes } from "./nodes";
import { Plugins } from "./plugins";

export interface EditorProps {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  onHtmlChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
}

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  onHtmlChange,
  placeholder,
  className,
}: EditorProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border-system-global-secondary bg-background-system-body-primary shadow w-full h-full max-w-full">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <SharedAutocompleteContext>
            <FloatingLinkContext>
              <Plugins />
              {onHtmlChange ? (
                <HtmlChangePlugin onChange={onHtmlChange} />
              ) : null}
              <OnChangePlugin
                ignoreSelectionChange={true}
                onChange={(editorState) => {
                  onChange?.(editorState);
                  onSerializedChange?.(editorState.toJSON());
                }}
              />
            </FloatingLinkContext>
          </SharedAutocompleteContext>
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

function HtmlChangePlugin({ onChange }: { onChange: (html: string) => void }) {
  const [editor] = useLexicalComposerContext();

  editor.registerUpdateListener(() => {
    editor.update(() => {
      const html = $generateHtmlFromNodes(editor);
      onChange(html);
    });
  });

  return null;
}

// Create web component from React component (browser only)
let EditorWebComponent: any = null;

// Async function to create web component
async function createWebComponent() {
  if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
    try {
      const r2wc = await import("@r2wc/react-to-web-component");
      const r2wcFunction = r2wc.default || r2wc;
      
      EditorWebComponent = r2wcFunction(Editor, {
        props: {
          editorState: "json",
          editorSerializedState: "json",
          onChange: "function",
          onSerializedChange: "function",
          onHtmlChange: "function",
        },
      });

      // Register the web component only if not already defined
      if (!customElements.get("react-editor")) {
        customElements.define("react-editor", EditorWebComponent);
      }
    } catch (error) {
      console.warn("Failed to create web component:", error);
    }
  }
}

// Initialize web component when in browser environment
if (typeof window !== 'undefined') {
  createWebComponent();
}

// Export both the React component and the web component
export { Editor, EditorWebComponent };
