# Text Editor Studio

A powerful, feature-rich rich text editor built with Lexical and React. This editor provides a comprehensive set of tools for creating rich content with support for various media types, formatting options, and interactive elements.

## Features

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
- 🔧 **Customizable** - Highly configurable and extensible

## Installation

```bash
npm install text-editor-studio
# or
yarn add text-editor-studio
# or
pnpm add text-editor-studio
```

## Quick Start

```tsx
import React from 'react';
import { Editor } from 'text-editor-studio';
import 'text-editor-studio/styles';

function App() {
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

export default App;
```

## Advanced Usage

### With Custom Configuration

```tsx
import React from 'react';
import { Editor } from 'text-editor-studio';
import 'text-editor-studio/styles';

function App() {
  const handleChange = (editorState) => {
    console.log('Editor content changed:', editorState);
  };

  const handleSerializedChange = (serializedState) => {
    // Save to database
    saveToDatabase(serializedState);
  };

  const handleHtmlChange = (html) => {
    // Get HTML output
    console.log('HTML output:', html);
  };

  return (
    <Editor
      onChange={handleChange}
      onSerializedChange={handleSerializedChange}
      onHtmlChange={handleHtmlChange}
      editorState={initialState} // Optional: Set initial content
      placeholder="Start writing your story..."
    />
  );
}
```

### Web Component Usage

The editor is also available as a web component for use in non-React environments:

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import 'text-editor-studio';
  </script>
  <link rel="stylesheet" href="text-editor-studio/styles">
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

## API Reference

### Editor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onChange` | `(editorState: EditorState) => void` | - | Callback when editor content changes |
| `onSerializedChange` | `(serializedState: SerializedEditorState) => void` | - | Callback with serialized editor state |
| `onHtmlChange` | `(html: string) => void` | - | Callback with HTML output |
| `editorState` | `EditorState` | - | Initial editor state |
| `editorSerializedState` | `SerializedEditorState` | - | Initial serialized editor state |

### Editor State

The editor uses Lexical's `EditorState` for managing content. You can:

- **Serialize**: Convert to JSON for storage
- **Deserialize**: Restore from JSON
- **Export HTML**: Get HTML output
- **Import HTML**: Load HTML content

```tsx
import { $generateHtmlFromNodes } from '@lexical/html';

// Get HTML from editor state
const html = $generateHtmlFromNodes(editor, editorState);

// Serialize for storage
const serialized = editorState.toJSON();
```

## Styling

The editor comes with built-in Tailwind CSS styles. You can customize the appearance by:

1. **Importing the default styles**:
```tsx
import 'text-editor-studio/styles';
```

2. **Customizing with CSS variables**:
```css
:root {
  --editor-bg: #ffffff;
  --editor-text: #000000;
  --editor-border: #e5e7eb;
  --editor-toolbar-bg: #f9fafb;
}
```

3. **Using custom CSS classes**:
```tsx
<Editor className="my-custom-editor" />
```

## Plugins

The editor includes many built-in plugins:

- **AutoLinkPlugin** - Automatic link detection
- **CodeHighlightPlugin** - Syntax highlighting
- **EmojiPickerPlugin** - Emoji selection
- **MentionsPlugin** - @mentions with autocomplete
- **TablePlugin** - Table creation and editing
- **ImagePlugin** - Image upload and management
- **ExcalidrawPlugin** - Diagram creation
- **EquationsPlugin** - Mathematical expressions
- **PollPlugin** - Interactive polls
- **LayoutPlugin** - Multi-column layouts

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the [documentation](https://github.com/yourusername/text-editor-studio)
2. Search [existing issues](https://github.com/yourusername/text-editor-studio/issues)
3. Create a [new issue](https://github.com/yourusername/text-editor-studio/issues/new)

## Acknowledgments

- [Lexical](https://lexical.dev/) - The underlying editor framework
- [React](https://reactjs.org/) - The UI library
- [Tailwind CSS](https://tailwindcss.com/) - The styling framework
- [Radix UI](https://www.radix-ui.com/) - The component primitives
