import { type Transformer } from "@lexical/markdown";
import { type LexicalNode, type TextNode } from "lexical";

import { $createImageNode, $isImageNode, ImageNode } from "../nodes/ImageNode";

// Create a custom transformer for image nodes
const imageTransformer: Transformer = {
  dependencies: [ImageNode],
  export: (node: LexicalNode): string | null => {
    if (!$isImageNode(node)) return null;

    const src = node.getSrc();
    const altText = node.getAltText() || "";

    // Return properly formatted markdown for images
    return `![${altText}](${src})`;
  },
  importRegExp: /!\[([^\]]*)\]\(([^)]+)\)$/,
  regExp: /!\[([^\]]*)\]\(([^)]+)\)$/,
  type: "text-match" as const,
  replace: (textNode: TextNode, match: RegExpMatchArray): void => {
    const altText = String(match[1] || "");
    const src = String(match[2] || "");
    const imageNode = $createImageNode({
      altText,
      src,
    });
    textNode.replace(imageNode);
  },
};

// Export as array
const IMAGE_TRANSFORMERS: Array<Transformer> = [imageTransformer];

export default IMAGE_TRANSFORMERS;
