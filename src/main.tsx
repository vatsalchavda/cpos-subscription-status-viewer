import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./amplifyClient.js";
import { AppRoutes } from "./routes.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
