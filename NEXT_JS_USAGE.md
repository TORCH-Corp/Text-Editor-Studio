# Using Text Editor Studio with Next.js

This package provides SSR-compatible components for Next.js applications.

## Installation

```bash
npm install text-editor-studio-ts
```

## Usage in Next.js

### Option 1: Use EditorClient Component (Recommended)

For Next.js applications, use the `EditorClient` component which handles SSR automatically:

```tsx
"use client";

import { EditorClient } from "text-editor-studio-ts";
import { useState } from "react";

export default function MyEditor() {
  const [editorState, setEditorState] = useState();

  return (
    <EditorClient
      editorSerializedState={editorState}
      onSerializedChange={setEditorState}
      onHtmlChange={(html) => console.log(html)}
    />
  );
}
```

### Option 2: Dynamic Import with ssr: false

Alternatively, you can use dynamic imports to disable SSR:

```tsx
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('text-editor-studio-ts').then((mod) => mod.Editor),
  { 
    ssr: false,
    loading: () => <div>Loading editor...</div>
  }
);

export default function MyEditor() {
  const [editorState, setEditorState] = useState();

  return (
    <Editor
      editorSerializedState={editorState}
      onSerializedChange={setEditorState}
      onHtmlChange={(html) => console.log(html)}
    />
  );
}
```

## Why SSR Compatibility is Needed

The editor uses browser-only APIs like `HTMLElement`, `document`, and `customElements` which are not available during server-side rendering. The `EditorClient` component ensures these APIs are only accessed on the client side.

## Features

- ✅ Complete mobile responsiveness
- ✅ SSR/Next.js compatibility 
- ✅ TypeScript support
- ✅ Rich text editing with Lexical
- ✅ Customizable toolbar
- ✅ Web component support (client-side only)

## Props

All components accept the same `EditorProps`:

```typescript
interface EditorProps {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  onHtmlChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
}
```

## Troubleshooting

If you still encounter SSR issues:

1. Make sure you're using `EditorClient` instead of `Editor`
2. Add `"use client"` directive to your component
3. Ensure you're not importing the editor in server-side code
4. Use dynamic imports with `ssr: false` as a fallback