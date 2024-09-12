import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import ChatApp from "./components/chatApp/ChatApp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChatApp />
  </React.StrictMode>
);
