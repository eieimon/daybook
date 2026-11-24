import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Overview from "./pages/overview";
import DiaryContext from "./pages/diary";
import Tasks from "./pages/tasks";
import Calendar from "./pages/calendar";
import Notes from "./pages/notes";
import Login from "./pages/login";
import { PublicRoute, ProtectedRoute } from "./components/authGuard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public route: Redirect to login if not authenticated */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<App />}>
              <Route index element={<Overview />} />
              <Route path="my-diary" element={<DiaryContext />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="notes" element={<Notes />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
