import { create } from "zustand";

interface EditorState {
  currentPostId: number | null;
  title: string;
  content: any;
  isSaving: boolean;
  lastSavedHash: string | null;

  setPost: (id: number, title: string, content: any) => void;
  setContent: (content: any) => void;
  setTitle: (title: string) => void;
  setSaving: (saving: boolean) => void;
  setLastSavedHash: (hash: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  currentPostId: null,
  title: "",
  content: null,
  isSaving: false,
  lastSavedHash: null,

  setPost: (id, title, content) =>
    set({
      currentPostId: id,
      title,
      content,
    }),

  setContent: (content) => set({ content }),
  setTitle: (title) => set({ title }),
  setSaving: (isSaving) => set({ isSaving }),
  setLastSavedHash: (lastSavedHash) => set({ lastSavedHash }),
}));
