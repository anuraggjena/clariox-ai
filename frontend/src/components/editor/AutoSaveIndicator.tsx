import { useEditorStore } from "@/store/useEditorStore";

export default function AutoSaveIndicator() {
  const isSaving = useEditorStore((s) => s.isSaving);

  return (
    <div className="text-sm text-muted-foreground">
      {isSaving ? "Saving changes..." : "All changes saved"}
    </div>
  );
}
