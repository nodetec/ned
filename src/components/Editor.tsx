import { CodeNode } from "@lexical/code";
import { HashtagNode } from "@lexical/hashtag";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
  ElementTransformer,
} from "@lexical/markdown";
import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import { ImageNode } from "../nodes/ImageNode";
import { CustomHashtagPlugin } from "../plugins/CustomHashtagPlugin";
import { ImagePlugin } from "../plugins/ImagePlugin";
import { ImageMarkdownTransformPlugin } from "../plugins/ImageMarkdownTransformPlugin";
import { OnBlurPlugin } from "../plugins/OnBlurPlugin";
import { OnChangeDebouncePlugin } from "../plugins/OnChangeDebouncePlugin";
import { OnFocusPlugin } from "../plugins/OnFocus";
import { ScrollCenterCurrentLinePlugin } from "../plugins/ScrollCenterCurrentLinePlugin";
import {
//   $setSelection,
  type EditorThemeClasses,
  type EditorState,
  type LexicalEditor,
  $getRoot,
  $isElementNode,
  $isParagraphNode,
  $isRootNode,
} from "lexical";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { cn } from "~/lib/utils";
import IMAGE_TRANSFORMERS from "../transformers/ImageMarkdownTransformer";

// Combine the default transformers with our custom image transformers
const COMBINED_TRANSFORMERS = [...TRANSFORMERS, ...IMAGE_TRANSFORMERS];

function onError(error: Error) {
  console.error(error);
}

interface EditorProps {
  initialMarkdown?: string;
  editable?: boolean;
  editorName: string;
  onChange: (markdown: string) => void;
  onBlur: (markdown: string) => void;
  onFocus: (markdown: string) => void;
  handleClick?: () => void;
  theme?: EditorThemeClasses;
  className?: string;
}

export function Editor({
  initialMarkdown = "",
  editable = true,
  editorName,
  onChange,
  onBlur,
  onFocus,
  handleClick,
  theme,
  className,
}: EditorProps) {
  function getInitalContent() {
    $convertFromMarkdownString(initialMarkdown, COMBINED_TRANSFORMERS, undefined, false);
    // $setSelection(null);
  }

  async function _onChange(
    editorState: EditorState,
    editor: LexicalEditor,
    _: Set<string>
  ) {
    await editor.read(async () => {
      // Use the combined transformers for proper image serialization
      const markdown = $convertToMarkdownString(COMBINED_TRANSFORMERS);
      
      // Log for debugging
      console.debug('Editor content converted to markdown:', markdown);
      
      onChange(markdown);
    });
  }

  async function _onBlur(event: FocusEvent, editor: LexicalEditor) {
    await editor.read(async () => {
      const markdown = $convertToMarkdownString(COMBINED_TRANSFORMERS);
      onBlur(markdown);
    });
  }

  async function _onFocus(event: FocusEvent, editor: LexicalEditor) {
    await editor.read(async () => {
      const markdown = $convertToMarkdownString(COMBINED_TRANSFORMERS);
      onFocus(markdown);
    });
  }

  const initialConfig: InitialConfigType = {
    namespace: "Neditor",
    editorState: () => getInitalContent(),
    nodes: [
      HorizontalRuleNode,
      QuoteNode,
      HeadingNode,
      CodeNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      HashtagNode,
      ImageNode,
    ],
    onError,
    theme,
    editable,
  };

  return (
    <LexicalComposer key={editorName} initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            onClick={handleClick}
            className={cn(
              "min-h-[calc(100vh-4rem)] flex-auto select-text flex-col pb-[50%] caret-sky-500/90 focus-visible:outline-none",
              className
            )}
            // TODO: placeholder doesn't work
            // aria-placeholder={"Enter some text..."}
            // placeholder={<div>Enter some text...</div>}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />

      <OnChangeDebouncePlugin onChange={_onChange} debounceTime={500} />
      <OnBlurPlugin onBlur={_onBlur} />
      <OnFocusPlugin onFocus={_onFocus} />
      <MarkdownShortcutPlugin transformers={COMBINED_TRANSFORMERS} />
      <HistoryPlugin />
      <CustomHashtagPlugin />
      <ImagePlugin />
      <ImageMarkdownTransformPlugin />
      <ScrollCenterCurrentLinePlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}
