import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/MainRoute";
import { HelmetProvider } from "react-helmet-async";
import MyAuthProvider from "./ContextApi/MyAuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyAuthProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </MyAuthProvider>
  </React.StrictMode>
);
