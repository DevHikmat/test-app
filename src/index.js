import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import "swiper/css/bundle";
import "./index.scss";
import App from "./App";
import { InfoContextProvider } from "./ContextApi/InfoContext";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <InfoContextProvider>
      <ToastContainer />
      <App />
    </InfoContextProvider>
  </Router>
  // </React.StrictMode>
);
