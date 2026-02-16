import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import api from "@/services/api";
import { useState } from "react";

export default function AIControls() {
  const [editor] = useLexicalComposerContext();
  const [loading, setLoading] = useState<string | null>(null);

  const handleAI = async (mode: string) => {
    let plainText = "";

    editor.getEditorState().read(() => {
      plainText = $getRoot().getTextContent();
    });

    if (!plainText.trim()) return;

    try {
      setLoading(mode);

      const res = await api.post("/api/ai/generate", {
        text: plainText,
        type: mode,
      });

      const aiText = res.data.result;

      editor.update(() => {
        const root = $getRoot();
        root.clear();

        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(aiText));
        root.append(paragraph);
      });

    } catch (error) {
      console.error("AI failed:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="secondary"
        disabled={loading !== null}
        onClick={() => handleAI("summary")}
      >
        {loading === "summary" ? "Summarizing..." : "Summarize"}
      </Button>

      <Button
        size="sm"
        variant="secondary"
        disabled={loading !== null}
        onClick={() => handleAI("grammar")}
      >
        {loading === "grammar" ? "Fixing..." : "Fix Grammar"}
      </Button>

      <Button
        size="sm"
        variant="secondary"
        disabled={loading !== null}
        onClick={() => handleAI("improve")}
      >
        {loading === "improve" ? "Improving..." : "Improve Writing"}
      </Button>
    </div>
  );
}
