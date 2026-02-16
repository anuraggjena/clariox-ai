import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/EditorPage";

function App() {
  const token = useAuthStore((state) => state.token);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {token ? (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editor/:id" element={<EditorPage />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
