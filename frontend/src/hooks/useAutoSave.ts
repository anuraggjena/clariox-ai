import { useEffect, useRef } from "react";
import api from "@/services/api";
import { useEditorStore } from "@/store/useEditorStore";
import { debounce } from "@/utils/debounce";

export function useAutoSave() {
  const {
    currentPostId,
    title,
    content,
    setSaving,
    lastSavedHash,
    setLastSavedHash,
  } = useEditorStore();

  const saveToServer = async () => {
    if (!currentPostId || !content) return;

    const currentHash = JSON.stringify({ title, content });

    if (currentHash === lastSavedHash) return;

    try {
      setSaving(true);

      await api.patch(`/api/posts/${currentPostId}`, {
        title,
        content,
      });

      setLastSavedHash(currentHash);
    } catch (error) {
      console.error("Auto-save failed:", error);
    } finally {
      setSaving(false);
    }
  };

  const debouncedRef = useRef(debounce(saveToServer, 2000));

  useEffect(() => {
    debouncedRef.current();
  }, [content, title]);
}
