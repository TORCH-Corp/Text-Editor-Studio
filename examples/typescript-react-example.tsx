/**
 * TypeScript React Example for Text Editor Studio
 * 
 * This example shows how to use the Text Editor Studio package
 * in a TypeScript React application.
 */

import React, { useState, useCallback } from 'react';
import { Editor, EditorProps, EditorState, SerializedEditorState } from 'text-editor-studio';
import 'text-editor-studio/styles';

interface AppState {
  content: SerializedEditorState | null;
  htmlOutput: string;
}

const TextEditorExample: React.FC = () => {
  const [state, setState] = useState<AppState>({
    content: null,
    htmlOutput: ''
  });

  // Handle editor state changes
  const handleEditorChange = useCallback((editorState: EditorState) => {
    console.log('Editor state changed:', editorState);
  }, []);

  // Handle serialized state changes (for saving to database)
  const handleSerializedChange = useCallback((serializedState: SerializedEditorState) => {
    setState(prev => ({
      ...prev,
      content: serializedState
    }));
    
    // You can save this to your database
    // await saveToDatabase(serializedState);
  }, []);

  // Handle HTML output (for preview or rendering)
  const handleHtmlChange = useCallback((html: string) => {
    setState(prev => ({
      ...prev,
      htmlOutput: html
    }));
  }, []);

  // Load content from database example
  const loadContent = useCallback(async () => {
    try {
      // const savedContent = await loadFromDatabase();
      // setState(prev => ({ ...prev, content: savedContent }));
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  }, []);

  // Save content to database example
  const saveContent = useCallback(async () => {
    if (state.content) {
      try {
        // await saveToDatabase(state.content);
        console.log('Content saved successfully');
      } catch (error) {
        console.error('Failed to save content:', error);
      }
    }
  }, [state.content]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Text Editor Studio - TypeScript Example</h1>
      
      <div className="mb-4 flex gap-4">
        <button 
          onClick={loadContent}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load Content
        </button>
        <button 
          onClick={saveContent}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={!state.content}
        >
          Save Content
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Editor</h2>
          <Editor
            onChange={handleEditorChange}
            onSerializedChange={handleSerializedChange}
            onHtmlChange={handleHtmlChange}
            editorSerializedState={state.content || undefined}
            placeholder="Start typing your content here..."
            className="min-h-[400px]"
          />
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Live Preview</h2>
          <div 
            className="border rounded-lg p-4 min-h-[400px] bg-white prose max-w-none"
            dangerouslySetInnerHTML={{ __html: state.htmlOutput }}
          />
        </div>
      </div>

      {/* Debug Section */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Debug Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Serialized Content (JSON):</h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-40">
              {state.content ? JSON.stringify(state.content, null, 2) : 'No content yet...'}
            </pre>
          </div>
          <div>
            <h3 className="font-medium mb-2">HTML Output:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-40">
              {state.htmlOutput || 'No HTML output yet...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditorExample;

/**
 * Advanced Usage Examples
 */

// Example 1: Editor with custom configuration
export const AdvancedEditorExample: React.FC = () => {
  const [editorKey, setEditorKey] = useState(0);

  const handleReset = () => {
    setEditorKey(prev => prev + 1);
  };

  const editorProps: EditorProps = {
    placeholder: "Write something amazing...",
    className: "custom-editor-class",
    onChange: (state) => {
      // Custom change handler
      console.log('Editor changed:', state);
    },
    onSerializedChange: (serialized) => {
      // Auto-save functionality
      localStorage.setItem('editor-content', JSON.stringify(serialized));
    },
    onHtmlChange: (html) => {
      // Real-time preview updates
      console.log('HTML updated:', html);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <button 
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset Editor
        </button>
      </div>
      
      <Editor 
        key={editorKey} 
        {...editorProps}
      />
    </div>
  );
};

// Example 2: Multiple editors
export const MultipleEditorsExample: React.FC = () => {
  const [editors, setEditors] = useState<{
    id: string;
    content: SerializedEditorState | null;
  }[]>([
    { id: 'editor-1', content: null },
    { id: 'editor-2', content: null }
  ]);

  const handleEditorChange = (id: string) => (serialized: SerializedEditorState) => {
    setEditors(prev => prev.map(editor => 
      editor.id === id ? { ...editor, content: serialized } : editor
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Multiple Editors</h2>
      
      {editors.map((editor) => (
        <div key={editor.id} className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Editor {editor.id}</h3>
          <Editor
            editorSerializedState={editor.content || undefined}
            onSerializedChange={handleEditorChange(editor.id)}
            placeholder={`Content for ${editor.id}...`}
          />
        </div>
      ))}
    </div>
  );
};

// Example 3: Integration with form handling
export const FormIntegrationExample: React.FC = () => {
  const [formData, setFormData] = useState<{
    title: string;
    content: SerializedEditorState | null;
  }>({
    title: '',
    content: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Submit to your API
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Post saved successfully!');
        setFormData({ title: '', content: null });
      }
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
      
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter post title..."
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Content
        </label>
        <Editor
          editorSerializedState={formData.content || undefined}
          onSerializedChange={(content) => setFormData(prev => ({ ...prev, content }))}
          placeholder="Write your post content..."
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Save Post
      </button>
    </form>
  );
};