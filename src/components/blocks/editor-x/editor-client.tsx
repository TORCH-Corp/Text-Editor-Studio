"use client";

import { useEffect, useState } from "react";
import { Editor, EditorProps } from "./editor";

/**
 * Client-only wrapper for the Editor component to prevent SSR issues
 * Use this component in Next.js applications to avoid HTMLElement errors
 */
export function EditorClient(props: EditorProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return null during SSR to prevent hydration mismatch
  if (!isClient) {
    return null;
  }

  return <Editor {...props} />;
}

export type { EditorProps } from "./editor";