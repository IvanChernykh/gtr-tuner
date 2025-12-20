import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { MainScreen } from "./components/MainScreen.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainScreen />
  </StrictMode>
);
