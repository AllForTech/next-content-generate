'use client'

import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view'; // Core view and basic features
import { EditorState } from '@codemirror/state'; // Core state management
import { markdown } from '@codemirror/lang-markdown'; // Markdown language support
import { useContent } from '@/context/GenerationContext';
import { useEffect, useRef, useState } from 'react';

const basicMarkdownTheme = EditorView.theme({
  // Sets the overall background and text color to match your dark theme
  "&": {
    backgroundColor: "#1e1e1e", // A dark gray for the background
    color: "#f3f4f6",           // Light text color
    fontSize: "11px",           // text-xs equivalent
    height: "100%",             // Ensures full height within parent
    width: "100%",              // Ensures full width
  },
  // Optional: Style for the active line highlight
  ".cm-activeLine": {
    backgroundColor: "#37415180" // Slightly lighter background for current line
  },

  ".cm-gutters": {
    backgroundColor: "#171717",
    borderRight: "1px solid #333", // Subtle line separating gutter from content
  },

  // --- Active Line/Cursor ---
  ".cm-activeLineGutter": {
    backgroundColor: "transparent", // Don't highlight the line number gutter
  },
  ".cm-cursor": {
    borderLeft: "2px solid #5C7AFF", // Custom blue cursor color
  },

  // --- Selection and Highlighting ---
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "#2c3e5080", // Custom selection background color
  }
});

export default function EditorHighlight(){
  const { generatedContent } = useContent();

  const editorRef = useRef(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const [markdownText, setMarkdownText] = useState(generatedContent);

  // Function to get the current content for copying
  const getCurrentContent = () => {
    return editorViewRef.current?.state.doc.toString() || markdownText;
  };

  useEffect(() => {
    // --- 1. Define Extensions ---
    const extensions = [
      // Provides essential editing features (line numbers, history, cursor)
      basicSetup,

      // Enables Markdown syntax highlighting
      markdown(),

      // Apply your custom dark theme and font size
      basicMarkdownTheme,

      // Use a listener to keep React state updated with editor changes
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          setMarkdownText(update.state.doc.toString());
        }
      })
    ];

    // --- 2. Create Editor Instance ---
    const startState = EditorState.create({
      doc: generatedContent,
      extensions: extensions,
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current!,
    });

    editorViewRef.current = view;

    // --- 3. Cleanup ---
    return () => {
      view.destroy();
      editorViewRef.current = null;
    };
  }, [generatedContent]); // Re-initialize only if initial text changes

  // NOTE: You would integrate the copy logic here, using getCurrentContent()
  // ...

  return (
    <div
      ref={editorRef}
      className="w-full h-full absolute inset-0 border border-gray-700 rounded-md overflow-hidden"
    />
  );
}