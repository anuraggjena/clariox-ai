import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/services/api";
import { useEditorStore } from "@/store/useEditorStore";
import { useAutoSave } from "@/hooks/useAutoSave";

import Editor from "@/components/editor/Editor";
import AutoSaveIndicator from "@/components/editor/AutoSaveIndicator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setPost, title, setTitle } = useEditorStore();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/api/posts/${id}`);
      const post = res.data;

      setPost(post.id, post.title, post.content);
    };

    fetchPost();
  }, [id]);

  useAutoSave();

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-8 py-10 space-y-8">

          {/* Top Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
            >
              Back to Dashboard
            </Button>

            <AutoSaveIndicator />
          </div>

          {/* Title */}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            className="text-5xl font-bold border-none shadow-none px-0 focus-visible:ring-0"
          />

          {/* Editor Surface */}
          <Editor />

        </div>
      </div>
    </AppLayout>
  );
}
