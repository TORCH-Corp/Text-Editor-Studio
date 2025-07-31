# TypeScript React Usage Guide

This guide shows you how to use Text Editor Studio in your TypeScript React application.

## Installation

```bash
# Install the package
npm install text-editor-studio
# or
yarn add text-editor-studio
# or
pnpm add text-editor-studio
```

## Quick Start

### 1. Import the Editor and Styles

```tsx
import React from 'react';
import { Editor, EditorProps } from 'text-editor-studio';
import 'text-editor-studio/styles';
```

### 2. Basic Usage

```tsx
import React, { useState } from 'react';
import { Editor, EditorState, SerializedEditorState } from 'text-editor-studio';
import 'text-editor-studio/styles';

function MyApp() {
  const [content, setContent] = useState<SerializedEditorState | null>(null);

  const handleChange = (serializedState: SerializedEditorState) => {
    setContent(serializedState);
    // Save to database, localStorage, etc.
  };

  return (
    <div className="p-4">
      <Editor
        onSerializedChange={handleChange}
        editorSerializedState={content || undefined}
        placeholder="Start typing..."
      />
    </div>
  );
}
```

## TypeScript Types

The package exports these TypeScript types:

```tsx
import type { 
  EditorProps,           // Props for the Editor component
  EditorState,           // Lexical editor state
  SerializedEditorState, // JSON-serializable editor state
  InitialConfigType      // Lexical initial config type
} from 'text-editor-studio';
```

### EditorProps Interface

```tsx
interface EditorProps {
  // Initial editor state (raw Lexical state)
  editorState?: EditorState;
  
  // Initial editor state (JSON serializable)
  editorSerializedState?: SerializedEditorState;
  
  // Callback when editor content changes (raw state)
  onChange?: (editorState: EditorState) => void;
  
  // Callback when editor content changes (serialized state)
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  
  // Callback when HTML output changes
  onHtmlChange?: (html: string) => void;
  
  // Placeholder text
  placeholder?: string;
  
  // Custom CSS class
  className?: string;
}
```

## Common Patterns

### 1. Saving Content to Database

```tsx
const [content, setContent] = useState<SerializedEditorState | null>(null);

const handleSave = async (serializedState: SerializedEditorState) => {
  setContent(serializedState);
  
  try {
    await fetch('/api/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: serializedState })
    });
  } catch (error) {
    console.error('Failed to save:', error);
  }
};

return (
  <Editor
    onSerializedChange={handleSave}
    editorSerializedState={content || undefined}
  />
);
```

### 2. Real-time Preview

```tsx
const [htmlOutput, setHtmlOutput] = useState<string>('');

return (
  <div className="grid grid-cols-2 gap-4">
    <Editor
      onHtmlChange={setHtmlOutput}
      placeholder="Type here..."
    />
    
    <div 
      className="prose"
      dangerouslySetInnerHTML={{ __html: htmlOutput }}
    />
  </div>
);
```

### 3. Form Integration

```tsx
interface FormData {
  title: string;
  content: SerializedEditorState | null;
}

const [formData, setFormData] = useState<FormData>({
  title: '',
  content: null
});

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.content) {
    alert('Please add some content');
    return;
  }

  // Submit form data
  await submitForm(formData);
};

return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={formData.title}
      onChange={(e) => setFormData(prev => ({ 
        ...prev, 
        title: e.target.value 
      }))}
      placeholder="Title"
    />
    
    <Editor
      onSerializedChange={(content) => setFormData(prev => ({ 
        ...prev, 
        content 
      }))}
      placeholder="Content"
    />
    
    <button type="submit">Save</button>
  </form>
);
```

### 4. Multiple Editors

```tsx
interface EditorInstance {
  id: string;
  content: SerializedEditorState | null;
}

const [editors, setEditors] = useState<EditorInstance[]>([
  { id: '1', content: null },
  { id: '2', content: null }
]);

const updateEditor = (id: string) => (content: SerializedEditorState) => {
  setEditors(prev => prev.map(editor => 
    editor.id === id ? { ...editor, content } : editor
  ));
};

return (
  <div>
    {editors.map(editor => (
      <Editor
        key={editor.id}
        editorSerializedState={editor.content || undefined}
        onSerializedChange={updateEditor(editor.id)}
      />
    ))}
  </div>
);
```

## Advanced Usage

### Custom Hook for Editor State

```tsx
import { useState, useCallback } from 'react';
import { SerializedEditorState } from 'text-editor-studio';

interface UseEditorOptions {
  autosave?: boolean;
  autosaveDelay?: number;
}

export function useEditor(initialContent?: SerializedEditorState, options: UseEditorOptions = {}) {
  const [content, setContent] = useState<SerializedEditorState | null>(initialContent || null);
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const handleContentChange = useCallback((newContent: SerializedEditorState) => {
    setContent(newContent);
    setIsDirty(true);

    if (options.autosave) {
      // Implement autosave logic
    }
  }, [options.autosave]);

  const save = useCallback(async () => {
    if (content) {
      // Implement save logic
      setIsDirty(false);
    }
  }, [content]);

  const reset = useCallback(() => {
    setContent(initialContent || null);
    setHtmlOutput('');
    setIsDirty(false);
  }, [initialContent]);

  return {
    content,
    htmlOutput,
    isDirty,
    handleContentChange,
    handleHtmlChange: setHtmlOutput,
    save,
    reset
  };
}

// Usage
function MyComponent() {
  const editor = useEditor();

  return (
    <div>
      <div className="mb-4">
        <button onClick={editor.save} disabled={!editor.isDirty}>
          Save {editor.isDirty && '*'}
        </button>
        <button onClick={editor.reset}>Reset</button>
      </div>
      
      <Editor
        editorSerializedState={editor.content || undefined}
        onSerializedChange={editor.handleContentChange}
        onHtmlChange={editor.handleHtmlChange}
      />
    </div>
  );
}
```

### With React Query (TanStack Query)

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SerializedEditorState } from 'text-editor-studio';

function useEditorContent(documentId: string) {
  return useQuery({
    queryKey: ['document', documentId],
    queryFn: async () => {
      const response = await fetch(`/api/documents/${documentId}`);
      return response.json();
    }
  });
}

function useUpdateDocument(documentId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (content: SerializedEditorState) => {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
    }
  });
}

function DocumentEditor({ documentId }: { documentId: string }) {
  const { data: document, isLoading } = useEditorContent(documentId);
  const updateDocument = useUpdateDocument(documentId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Editor
      editorSerializedState={document?.content}
      onSerializedChange={(content) => {
        updateDocument.mutate(content);
      }}
    />
  );
}
```

## Styling

The editor comes with built-in styles that you need to import:

```tsx
import 'text-editor-studio/styles';
```

You can also add custom CSS:

```css
/* Custom editor styles */
.my-editor .ContentEditable__root {
  min-height: 300px;
  padding: 1rem;
}

.my-editor .toolbar {
  background: var(--background-presentation-form-base);
  border-bottom: 1px solid var(--border-system-global-secondary);
}
```

## Error Handling

```tsx
import React, { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div className="p-4 border border-red-200 bg-red-50 rounded">
      <h2 className="text-red-800 font-semibold">Editor Error</h2>
      <p className="text-red-600">{error.message}</p>
      <button 
        onClick={resetErrorBoundary}
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
      >
        Try again
      </button>
    </div>
  );
}

function MyApp() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Editor placeholder="Start typing..." />
    </ErrorBoundary>
  );
}
```

## Web Component Usage (Optional)

You can also use the editor as a web component in TypeScript:

```tsx
// Extend the global JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'react-editor': any;
    }
  }
}

// Use in your component
function WebComponentExample() {
  useEffect(() => {
    const editor = document.querySelector('react-editor');
    if (editor) {
      (editor as any).onSerializedChange = (content: SerializedEditorState) => {
        console.log('Content changed:', content);
      };
    }
  }, []);

  return <react-editor placeholder="Type here..." />;
}
```

## Next.js Integration

For Next.js apps, you might need to load the editor dynamically:

```tsx
import dynamic from 'next/dynamic';
import { EditorProps } from 'text-editor-studio';

const Editor = dynamic(() => import('text-editor-studio').then(mod => ({ default: mod.Editor })), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
});

function NextJSComponent() {
  return (
    <Editor
      placeholder="Start typing..."
      onSerializedChange={(content) => {
        // Handle content changes
      }}
    />
  );
}
```

This completes the TypeScript React usage guide for Text Editor Studio!