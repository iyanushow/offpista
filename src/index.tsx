import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HotelProvider } from "./context/Hotel/HotelContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <HotelProvider>
      <App />
    </HotelProvider>
  </React.StrictMode>
);
