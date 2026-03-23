import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import amplifyOutputs from "../amplify_outputs.json";

import "./i18n";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

try {
  Amplify.configure(amplifyOutputs);
} catch {
  // Amplify backend not configured yet — portfolio still works without it
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
