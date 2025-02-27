import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodeToNearestRoot } from "@lexical/utils";
import { COMMAND_PRIORITY_EDITOR } from "lexical";
import { createCommand } from "lexical";
import { useEffect } from "react";

import { $createImageNode, ImagePayload } from "../nodes/ImageNode";

export const INSERT_IMAGE_COMMAND = createCommand<ImagePayload>("INSERT_IMAGE_COMMAND");

export function ImagePlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = editor.registerCommand<ImagePayload>(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const imageNode = $createImageNode(payload);
        $insertNodeToNearestRoot(imageNode);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    return () => {
      unregister();
    };
  }, [editor]);

  return null;
}