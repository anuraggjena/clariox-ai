import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import type { Post } from "@/types/post";
import { useAuthStore } from "@/store/useAuthStore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppLayout from "@/components/layout/AppLayout";

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      setError("Failed to load drafts.");
    } finally {
      setLoading(false);
    }
  };

  const createDraft = async () => {
    try {
      const res = await api.post("/api/posts", {
        title: "Untitled",
        content: {
          root: {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
      });

      navigate(`/editor/${res.data.id}`);
    } catch {
      setError("Failed to create draft.");
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-8 py-10 space-y-10">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Clariox AI
              </h1>
              <p className="text-muted-foreground mt-1">
                Your intelligent writing workspace
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={createDraft}>
                New Draft
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-muted-foreground">
              Loading drafts...
            </div>
          )}

          {/* Empty State */}
          {!loading && posts.length === 0 && (
            <Card>
              <CardContent className="p-10 text-center space-y-4">
                <p className="text-lg font-medium">
                  No drafts yet
                </p>
                <p className="text-muted-foreground">
                  Start writing your first intelligent document.
                </p>
                <Button onClick={createDraft}>
                  Create Your First Draft
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Draft List */}
          {!loading && posts.length > 0 && (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  onClick={() => navigate(`/editor/${post.id}`)}
                  className="cursor-pointer hover:shadow-md transition-all"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {post.title || "Untitled"}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex justify-between text-sm text-muted-foreground">
                    <span>Status: {post.status}</span>
                    <span>
                      Updated:{" "}
                      {new Date(post.updated_at).toLocaleString()}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
