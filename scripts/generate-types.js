#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the correct TypeScript declarations
const typeDeclarations = `import { EditorState, SerializedEditorState } from 'lexical';
import { InitialConfigType } from '@lexical/react/LexicalComposer';
import * as React from 'react';

export interface EditorProps {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  onHtmlChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export declare const Editor: React.FC<EditorProps>;
export declare const EditorWebComponent: any;

// Re-export useful types from Lexical
export type { EditorState, SerializedEditorState } from 'lexical';
export type { InitialConfigType } from '@lexical/react/LexicalComposer';
`;

const distDir = path.join(__dirname, '..', 'dist');
const typesFile = path.join(distDir, 'index.d.ts');

try {
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Write the correct type declarations
  fs.writeFileSync(typesFile, typeDeclarations, 'utf8');
  
  console.log('✅ TypeScript declarations generated successfully!');
  console.log(`📝 Generated: ${typesFile}`);
  
  // Verify the file was written correctly
  const written = fs.readFileSync(typesFile, 'utf8');
  if (written.includes('export declare const Editor')) {
    console.log('✅ Verification: Editor export found in declarations');
  } else {
    console.error('❌ Verification failed: Editor export not found');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error generating TypeScript declarations:', error);
  process.exit(1);
}