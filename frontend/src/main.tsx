import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Overview from "./pages/overview/index.tsx";
import DiaryContext from "./pages/diary/index.tsx";
import Tasks from "./pages/tasks/index.tsx";
import Calendar from "./pages/calendar/index.tsx";
import Notes from "./pages/notes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Overview />} />
          <Route path="my-diary" element={<DiaryContext />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="notes" element={<Notes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
