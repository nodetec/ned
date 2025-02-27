import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getRoot, COMMAND_PRIORITY_EDITOR } from "lexical";

import { $isImageNode } from "../nodes/ImageNode";
import { logEditorNodesStructure } from "../utils/ConversionHelpers";

// This plugin helps ensure that images are properly identified during markdown conversion
export function ImageMarkdownTransformPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        // Debug: Uncomment to log the editor structure when needed
        // const root = $getRoot();
        // logEditorNodesStructure(root);
        
        // Here we could implement any additional logic needed to properly transform 
        // images to markdown if the standard transformers aren't working
      });
    });
  }, [editor]);

  return null;
}