import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThankYou from "./pages/Thankyou";
import "./index.css";
import { CampaignProvider } from "./context/CampaignContext";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CampaignProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Router>
    </CampaignProvider>
  </React.StrictMode>
);
