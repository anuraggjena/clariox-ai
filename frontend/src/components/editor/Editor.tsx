import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Toolbar from "./Toolbar";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";

import { useEditorStore } from "@/store/useEditorStore";
import AIControls from "./AIControls";

const theme = {
  paragraph: "mb-2",
};

function LoadContentPlugin() {
  const [editor] = useLexicalComposerContext();
  const content = useEditorStore((s) => s.content);

  useEffect(() => {
    if (content) {
      const editorState = editor.parseEditorState(content);
      editor.setEditorState(editorState);
    }
  }, [content, editor]);

  return null;
}

export default function Editor() {
  const setContent = useEditorStore((s) => s.setContent);

  const initialConfig = {
    namespace: "ClarioxAI",
    theme,
    onError: (error: any) => console.error(error),
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar />
      <AIControls />
      <div className="border rounded-lg p-4 bg-card min-h-100">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none min-h-75" />
          }
          placeholder={
            <div className="text-muted-foreground">
              Start writing...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />

        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const json = editorState.toJSON();
              setContent(json);
            });
          }}
        />

        <LoadContentPlugin />
      </div>
    </LexicalComposer>
  );
}
