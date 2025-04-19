# Text Editor Studio

## Installation

you should already have  package.json in you project you should have module bundlers such as vite .

Install the package via npm:
```bash
npm install docs_editor_test
```


## Using Editor Component in a React App

> **Note:** This web component requires Remix Icon CDN  in the <head> of your HTML for proper styling and icon rendering:
>
> ```html
> <link
>   href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
>   rel="stylesheet"
> />
> ```

### Imports

```js
import "docs_editor_test/dist/index.css";
import { Editor } from "docs_editor_test/dist/index.js";
```

### `App.jsx` Example

```jsx
import "docs_editor_test/dist/index.css";
import { Editor } from "docs_editor_test/dist/index.js";
import { createRoot } from "react-dom/client";

function App({
  initialState = initialValue,
  onChange,
  onSerializedChange,
  onHtmlChange,
}) {
  // Using provided handlers or empty functions if not provided
  const handleEditorChange = onChange || (() => {});
  const handleSerializedChange = onSerializedChange || (() => {});
  const handleHtmlChange = (html) => {
    if (onHtmlChange) {
      onHtmlChange(html);
    }
  };


 
    <Editor
      editorSerializedState={initialState}
      onSerializedChange={han return (dleSerializedChange)}
      onChange={handleEditorChange}
      onHtmlChange={handleHtmlChange}
    />
}


// Define the custom element
class ReactEditorElement extends HTMLElement {
  constructor() {
  }
    super();
    this.onChange = null;
    this.onSerializedChange = null;
    this.onHtmlChange = null;


  connectedCallback() {
    // Get initial state if provided as an attribute
    let initialState = "";
     editorStateAttr = thisconst.getAttribute("editorSerializedState");


    if (editorStateAttr && editorStateAttr !== "null") {
      try {
        initialState = JSON.parse(editorStateAttr);
      } catch (e) {
        console.error("Failed to parse editor state:", e);
      }
    }


    // Render React component
    const root = createRoot(this);
    root.render(
      <App
        initialState={initialState}
        onChange={(state) => {
          if (this.onChange) this.onChange(state);
        }}
        onSerializedChange={(state) => {
          if (this.onSerializedChange) this.onSerializedChange(state);
        }}
        onHtmlChange={(html) => {
          if (this.onHtmlChange) this.onHtmlChange(html);
        }}
      />
    );
  }
}


// Register custom element
customElements.define("react-editor", ReactEditorElement);
export default App;
```


### `index.html`

```html
<!doctype html>
<html lang="en">
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
  <style>
    body {
      margin: 0;
      padding: 20px;
      min-height: 100vh;
    }
    .editor-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      height: calc(100vh - 40px);
    }
    .editor-section, .preview-container {
      height: 94.5%;
      overflow-y: auto;
    }
    .preview-container {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: white;
    }
    .preview-content {
      max-width: none;
      font-family: 'SF Pro', sans-serif;
    }
    react-editor {
      height: 100%;
      display: block;
    }
  </style>
  </head>
  <body>
    <div class="editor-container">
      <div class="editor-section">
        <react-editor 
          id="editor"
          editorState='null'
          editorSerializedState='null'
        ></react-editor>
      </div>
<div class="preview-container">
    <h2>Preview</h2>
    <div id="preview" class="preview-content"></div>
  </div>
</div>
<script type="module" src="/src/app.jsx"></script>


<script>
  function handleEditorChange(state) {
    console.log('Editor state changed:', state);
  }
  
  function handleSerializedChange(state) {
    console.log('Serialized state changed:', state);
  }
  
  function handleHtmlChange(html) {
    console.log('HTML changed:', html);
    const previewElement = document.getElementById('preview');
    previewElement.innerHTML = html;
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    const editor = document.querySelector('#editor');
    editor.onChange = handleEditorChange;
    editor.onSerializedChange = handleSerializedChange;
    editor.onHtmlChange = handleHtmlChange;
  });
</script>
  </body>
</html>
```
## Here’s a breakdown of all available props you can use with both the React and Web Component versions:
### Props

| Prop                    | Type                     | Description                                   |
|-------------------------|--------------------------|-----------------------------------------------|
| `editorState`           | `EditorState`            | (optional) Full control editor state object   |
| `editorSerializedState` | `SerializedEditorState`  | Initial JSON state                            |
| `onChange`              | `function`               | Callback on raw state change                  |
| `onSerializedChange`    | `function`               | Callback on serialized (JSON) state change     |
| `onHtmlChange`          | `function`               | Callback on HTML output change                |

<details>
<summary>Short list of props</summary>

- **editorState** – Raw EditorState instance  
- **editorSerializedState** – JSON-serializable state  
- **onChange** – `(state) => void` fires on every update  
- **onSerializedChange** – `(json) => void`  Callback for when the serialized editor state changes
- **onHtmlChange** – `(html) => void` Callback for when the HTML representation of the editor content changes

</details>

**you can have the data as sting using JSON.stringify(editorSerializedState)**

## Example Prop Usage

```jsx
<Editor
  editorSerializedState={mySerializedValue}
  onSerializedChange={(val) => localStorage.setItem('doc', JSON.stringify(val))}
  onHtmlChange={(html) => setPreview(html)}
  onChange={(state) => console.log(state)}
/>
```

## Web Component 

You can use the <react-editor> web component directly in any plain HTML environment after download the package
first in the main.jsx
you should call the editor and the style

```jsx
import "docs_editor_test/dist/index.css";
import { Editor } from "docs_editor_test/dist/index.js"; or import "docs_editor_test/dist/index.js";


window.addEventListener("DOMContentLoaded", () => {
  const editor = document.querySelector("#editor");
  editor.onChange = (state) => {
    console.log("Editor State", state);
  }
  editor.onSerializedChange = (serializedState) => {
    console.log("Serialized State", serializedState);
  };
  editor.onHtmlChange = (html) => {
    console.log("HTML Output", html);
    document.getElementById("preview").innerHTML = html;
  };
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Lexical Web Component</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: sans-serif;
        padding: 2rem;
        background: #f9f9f9;
      }

      react-editor {
        width: 100%;
        height: 400px;
        display: block;
        margin-bottom: 2rem;
      }

      #preview {
        padding: 1rem;
        background: white;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Lexical Editor Web Component</h1>

    <react-editor id="editor"></react-editor>

    <h2>Live Preview (HTML)</h2>
    <div id="preview">Start typing in the editor…</div>

    <script type="module" src="/main.js"></script>
  </body>
</html>

```

#### props use in it 
```html
<react-editor id="editor"></react-editor>
<script>
  document.getElementById("editor").onHtmlChange = (html) => {
    document.getElementById("preview").innerHTML = html;
  };
</script>
```