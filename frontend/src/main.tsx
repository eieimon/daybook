import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Overview from "./pages/overview/index.tsx";
import DiaryContext from "./pages/diary/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Overview />} />
          <Route path="my-diary" element={<DiaryContext />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
