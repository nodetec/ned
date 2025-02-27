import { 
  $isElementNode, 
  ElementNode, 
  LexicalNode, 
  TextNode,
  SerializedElementNode,
  SerializedTextNode,
  SerializedLexicalNode
} from "lexical";
import { $isImageNode, ImageNode } from "../nodes/ImageNode";

// Helper function to traverse the editor nodes to find images
export function findImageNodesInEditor(
  node: LexicalNode,
  imageNodes: ImageNode[] = []
): ImageNode[] {
  if ($isImageNode(node)) {
    imageNodes.push(node);
  }

  if ($isElementNode(node)) {
    const children = node.getChildren();
    for (const child of children) {
      findImageNodesInEditor(child, imageNodes);
    }
  }

  return imageNodes;
}

// This function can be used to help debug what nodes are in the editor
export function logEditorNodesStructure(node: LexicalNode, depth: number = 0) {
  const indent = "  ".repeat(depth);
  const nodeType = node.getType();
  
  console.log(`${indent}${nodeType}`);
  
  if ($isElementNode(node)) {
    const children = node.getChildren();
    for (const child of children) {
      logEditorNodesStructure(child, depth + 1);
    }
  }
}