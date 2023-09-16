import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ContextProvider } from "./Components/GlobalContext.jsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  //React.StrictMode>

  <BrowserRouter>
    <ContextProvider>
      <Toaster richColors />
      <App />
    </ContextProvider>
  </BrowserRouter>

  //</React.StrictMode>
);
