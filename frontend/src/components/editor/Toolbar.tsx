import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, $getSelection } from "lexical";
import { Button } from "@/components/ui/button";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";

export default function Toolbar() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="flex gap-2 border-b pb-2 mb-4">

      {/* Bold */}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        }
      >
        Bold
      </Button>

      {/* Italic */}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }
      >
        Italic
      </Button>

      {/* H1 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if (selection) {
              $setBlocksType(selection, () =>
                $createHeadingNode("h1")
              );
            }
          });
        }}
      >
        H1
      </Button>

    </div>
  );
}
