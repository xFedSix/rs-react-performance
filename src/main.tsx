import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
