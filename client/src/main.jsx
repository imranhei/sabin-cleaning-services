import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from 'react-helmet-async';
import "react-big-calendar/lib/css/react-big-calendar.css";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </HelmetProvider>
);
