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

## 🔧 Required HTML Setup

Before using the editor, you need to add the following tags to your HTML `<head>` section:

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Editor X</title>
  <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
    rel="stylesheet"
  />
  <link
    rel="stylesheet"
    href="https://cdn.statically.io/gh/TORCH-Corp/SF-PRO-FONT/main/font/fonts.css"
  />
  <link
    rel="preload"
    href="https://cdn.statically.io/gh/TORCH-Corp/SF-PRO-FONT/main/font/SF-Pro.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
</head>
```

These dependencies provide:
- **RemixIcon**: Icon font used throughout the editor interface
- **SF Pro Font**: Primary font family for better typography
- **Font preloading**: Optimizes font loading performance

## 🚀 Quick Start

Import the editor 

```tsx
import { Editor, SerializedEditorState } from "text-editor-studio-ts";
```

### Complete Example with Live Preview

```tsx
"use client";

import { useState } from "react";
import { Editor, SerializedEditorState } from "text-editor-studio-ts";

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
    <div className=" p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Editor</h2>
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
          onHtmlChange={(html) => {
            console.log("HTML Content:", html);
            setHtmlContent(html);
          }}
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Rendered HTML Preview</h2>
        <div className="border rounded p-4 bg-white">
          <div
            className="max-w-none prose prose-slate"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
}
```

## 📊 Understanding Editor Data

### SerializedEditorState Structure

The `SerializedEditorState` is a JSON-serializable representation of the editor content. It follows Lexical's node structure:

```tsx
interface SerializedEditorState {
  root: {
    children: Array<SerializedNode>;
    direction: "ltr" | "rtl";
    format: string;
    indent: number;
    type: "root";
    version: number;
  };
}
```

**Key Components:**
- **root**: The top-level container for all editor content
- **children**: Array of paragraph, heading, list, and other block elements
- **text nodes**: Individual pieces of text with formatting (bold, italic, etc.)
- **direction**: Text direction (left-to-right or right-to-left)
- **version**: Lexical version for compatibility

### HTML Output

The editor automatically converts your content to clean HTML:

**Input:** `"Hello World 🚀"` (text node)
**Output:** `<p>Hello World 🚀</p>` (HTML paragraph)

**Benefits of HTML output:**
- 🎯 **Ready for display** - Direct rendering in your UI
- 📱 **SEO-friendly** - Search engines can index the content
- 💾 **Database storage** - Store both serialized state and HTML
- 📧 **Email templates** - Use HTML for email content
- 🔗 **Social sharing** - Clean HTML for meta descriptions

### Data Flow

```
User Types → Editor State → SerializedEditorState → HTML Output
     ↑                                                    ↓
  Display ←────────── Your Database ←──────────── Save Both
```

## 🔧 API Reference

### Editor Props

```tsx
interface EditorProps {
  // Initial content (JSON format)
  editorSerializedState?: SerializedEditorState;
  
  // Callback when content changes (serialized format)
  onSerializedChange?: (state: SerializedEditorState) => void;
  
  // Callback when HTML output changes
  onHtmlChange?: (html: string) => void;
  
  // Placeholder text
  placeholder?: string;
  
  // Custom CSS class
  className?: string;
}
```

### TypeScript Types

```tsx
import type { 
  Editor,
  EditorProps, 
  SerializedEditorState 
} from 'text-editor-studio-ts';
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
