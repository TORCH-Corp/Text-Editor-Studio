# Text Editor Studio TS

A powerful, feature-rich rich text editor built with Lexical and React, optimized for TypeScript applications.

[![npm version](https://badge.fury.io/js/text-editor-studio-ts.svg)](https://badge.fury.io/js/text-editor-studio-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Rich Text Editing** - Full-featured text editor with formatting options
- 📝 **Markdown Support** - Write in Markdown and see live preview
- 🖼️ **Media Support** - Images, videos, and embedded content
- 📊 **Tables** - Create and edit tables with ease
- 🎯 **Mentions** - @mentions with autocomplete
- 😊 **Emoji Picker** - Built-in emoji selection
- 📐 **Equations** - Mathematical expressions with KaTeX
- 🎨 **Excalidraw Integration** - Draw diagrams and sketches
- 🔗 **Links** - Smart link handling and validation
- 📋 **Lists** - Bulleted, numbered, and check lists
- 🎨 **Code Blocks** - Syntax highlighting for code
- 📱 **Responsive Design** - Works on all screen sizes
- ♿ **Accessibility** - WCAG compliant
- 🌙 **Theme Support** - Light and dark themes
- 🔧 **TypeScript Ready** - Full TypeScript support with proper type definitions

## 📦 Installation

```bash
npm install text-editor-studio-ts
# or
yarn add text-editor-studio-ts
# or
pnpm add text-editor-studio-ts
```

## 🚀 Quick Start

### Basic React Usage

```tsx
'use client'; // for Next.js 13+ (app router)

import React from 'react';
import { Editor } from 'text-editor-studio-ts';
import 'text-editor-studio-ts/styles';

function MyApp() {
  const handleChange = (editorState) => {
    console.log('Editor content changed:', editorState);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Editor
        onChange={handleChange}
        placeholder="Start typing your content..."
      />
    </div>
  );
}

export default MyApp;
```

### TypeScript Usage

```tsx
'use client';

import React, { useState } from 'react';
import { 
  Editor, 
  EditorProps, 
  EditorState, 
  SerializedEditorState 
} from 'text-editor-studio-ts';
import 'text-editor-studio-ts/styles';

function TypeScriptApp() {
  const [content, setContent] = useState<SerializedEditorState | null>(null);
  const [htmlOutput, setHtmlOutput] = useState<string>('');

  const handleEditorChange = (editorState: EditorState) => {
    console.log('Raw editor state:', editorState);
  };

  const handleSerializedChange = (serializedState: SerializedEditorState) => {
    setContent(serializedState);
    // Save to database or localStorage
    localStorage.setItem('editor-content', JSON.stringify(serializedState));
  };

  const handleHtmlChange = (html: string) => {
    setHtmlOutput(html);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Editor */}
      <div>
        <h2 className="text-xl font-bold mb-4">Editor</h2>
        <Editor
          onChange={handleEditorChange}
          onSerializedChange={handleSerializedChange}
          onHtmlChange={handleHtmlChange}
          editorSerializedState={content || undefined}
          placeholder="Start writing..."
        />
      </div>

      {/* Live Preview */}
      <div>
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <div 
          className="prose max-w-none border rounded-lg p-4 min-h-[400px]"
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
      </div>
    </div>
  );
}

export default TypeScriptApp;
```

## 📚 Import Options

### ✅ Recommended: Named Imports

```tsx
import { Editor, EditorProps, EditorState, SerializedEditorState } from 'text-editor-studio-ts';
import 'text-editor-studio-ts/styles';
```

### Alternative Import Methods

```tsx
// 1. Namespace import (if needed)
import * as TextEditor from 'text-editor-studio-ts';
const { Editor } = TextEditor;

// 2. Default import (also works)
import TextEditorStudio from 'text-editor-studio-ts';
const Editor = TextEditorStudio.Editor;

// 3. Dynamic import (for code splitting)
const Editor = React.lazy(() => 
  import('text-editor-studio-ts').then(module => ({
    default: module.Editor
  }))
);
```

## 🔧 API Reference

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

### Available Exports

```tsx
// Components
export { Editor, EditorWebComponent } from 'text-editor-studio-ts';

// Types
export type { 
  EditorProps, 
  EditorState, 
  SerializedEditorState,
  InitialConfigType 
} from 'text-editor-studio-ts';
```

## 🌐 Framework Integration

### Next.js 13+ (App Router)

```tsx
'use client';

import dynamic from 'next/dynamic';
import { EditorProps } from 'text-editor-studio-ts';
import 'text-editor-studio-ts/styles';

// Dynamic import to prevent SSR issues
const Editor = dynamic(
  () => import('text-editor-studio-ts').then(mod => ({ default: mod.Editor })),
  { 
    ssr: false,
    loading: () => <div>Loading editor...</div>
  }
);

export default function EditorPage() {
  return (
    <div className="container mx-auto p-4">
      <Editor placeholder="Start typing..." />
    </div>
  );
}
```

### Next.js 12 (Pages Router)

```tsx
import dynamic from 'next/dynamic';
import { EditorProps } from 'text-editor-studio-ts';

const Editor = dynamic(
  () => import('text-editor-studio-ts').then(mod => mod.Editor),
  { ssr: false }
);

// Import styles in _app.tsx
// import 'text-editor-studio-ts/styles';

export default function EditorPage() {
  return (
    <div>
      <Editor placeholder="Start typing..." />
    </div>
  );
}
```

### Vite + React

```tsx
import React from 'react';
import { Editor } from 'text-editor-studio-ts';
import 'text-editor-studio-ts/styles';

function App() {
  return (
    <div className="App">
      <Editor placeholder="Start typing..." />
    </div>
  );
}

export default App;
```

### Create React App

```tsx
import React from 'react';
import { Editor } from 'text-editor-studio-ts';
import 'text-editor-studio-ts/styles';

function App() {
  return (
    <div className="App">
      <Editor placeholder="Start typing..." />
    </div>
  );
}

export default App;
```

## 💾 Data Persistence

### Save to Database

```tsx
import { SerializedEditorState } from 'text-editor-studio-ts';

const saveToDatabase = async (content: SerializedEditorState) => {
  try {
    const response = await fetch('/api/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    
    if (response.ok) {
      console.log('Content saved successfully');
    }
  } catch (error) {
    console.error('Failed to save content:', error);
  }
};

function MyEditor() {
  return (
    <Editor
      onSerializedChange={saveToDatabase}
      placeholder="Your content will be auto-saved..."
    />
  );
}
```

### Load from Database

```tsx
import { useState, useEffect } from 'react';
import { SerializedEditorState } from 'text-editor-studio-ts';

function MyEditor() {
  const [content, setContent] = useState<SerializedEditorState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/get-content');
        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error('Failed to load content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Editor
      editorSerializedState={content || undefined}
      onSerializedChange={setContent}
      placeholder="Start editing..."
    />
  );
}
```

## 🎨 Styling

### Import Required Styles

```tsx
// Always import the base styles
import 'text-editor-studio-ts/styles';
```

### Custom Styling

```css
/* Custom editor styles */
.my-editor {
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.my-editor .ContentEditable__root {
  min-height: 300px;
  padding: 1rem;
  font-size: 16px;
  line-height: 1.6;
}

.my-editor .toolbar {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.5rem;
}

/* Dark theme support */
.dark .my-editor {
  border-color: #374151;
}

.dark .my-editor .ContentEditable__root {
  background: #1f2937;
  color: #f9fafb;
}
```

### Tailwind CSS Integration

```tsx
<Editor
  className="border border-gray-300 rounded-lg shadow-sm"
  placeholder="Start typing..."
/>
```

## 🔌 Web Component Usage

For non-React environments, you can use the web component:

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import 'text-editor-studio-ts';
  </script>
  <link rel="stylesheet" href="text-editor-studio-ts/styles">
</head>
<body>
  <react-editor
    placeholder="Start typing..."
    onchange="handleChange(event)"
  ></react-editor>

  <script>
    function handleChange(event) {
      console.log('Content changed:', event.detail);
    }
  </script>
</body>
</html>
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. "Module not found" error

Make sure you've installed the package:
```bash
npm install text-editor-studio-ts
```

#### 2. TypeScript errors

Ensure you're importing types correctly:
```tsx
import { Editor, EditorProps } from 'text-editor-studio-ts';
```

#### 3. Styles not loading

Always import the CSS file:
```tsx
import 'text-editor-studio-ts/styles';
```

#### 4. Next.js SSR issues

Use dynamic imports:
```tsx
const Editor = dynamic(() => import('text-editor-studio-ts').then(mod => mod.Editor), {
  ssr: false
});
```

#### 5. Build errors with bundlers

Make sure your bundler can handle CSS imports. For Vite, this works out of the box. For Webpack, you might need css-loader.

## 📖 Examples

### Form Integration

```tsx
interface FormData {
  title: string;
  content: SerializedEditorState | null;
}

function BlogPostForm() {
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

    // Submit to your API
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
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
        placeholder="Post title"
      />
      
      <Editor
        onSerializedChange={(content) => setFormData(prev => ({ 
          ...prev, 
          content 
        }))}
        placeholder="Write your post..."
      />
      
      <button type="submit">Publish Post</button>
    </form>
  );
}
```

### Real-time Collaboration Setup

```tsx
import { useEffect, useState } from 'react';
import { SerializedEditorState } from 'text-editor-studio-ts';

function CollaborativeEditor({ documentId }: { documentId: string }) {
  const [content, setContent] = useState<SerializedEditorState | null>(null);

  useEffect(() => {
    // Setup WebSocket connection for real-time updates
    const ws = new WebSocket(`ws://localhost:3001/collab/${documentId}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'content-update') {
        setContent(data.content);
      }
    };

    return () => ws.close();
  }, [documentId]);

  const handleContentChange = (newContent: SerializedEditorState) => {
    setContent(newContent);
    
    // Send to other collaborators
    fetch(`/api/documents/${documentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newContent })
    });
  };

  return (
    <Editor
      editorSerializedState={content || undefined}
      onSerializedChange={handleContentChange}
      placeholder="Start collaborating..."
    />
  );
}
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you encounter any issues or have questions:

1. Check this README for common solutions
2. Search existing issues on our repository
3. Create a new issue with a detailed description

## 🚀 What's Next?

- [ ] Plugin system for custom extensions
- [ ] More theme options
- [ ] Better mobile support
- [ ] Performance optimizations
- [ ] Additional export formats

---

**Made with ❤️ using [Lexical](https://lexical.dev/) and [React](https://reactjs.org/)**