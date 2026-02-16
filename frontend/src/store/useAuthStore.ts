import { create } from "zustand";
import api from "../services/api";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },

  login: async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    set({ token: res.data.access_token });
    localStorage.setItem("token", res.data.access_token);
  },

  register: async (email, password) => {
    const res = await api.post("/api/auth/register", { email, password });
    set({ token: res.data.access_token });
    localStorage.setItem("token", res.data.access_token);
  },
}));
