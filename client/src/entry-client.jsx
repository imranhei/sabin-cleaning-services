console.log("🌐 Client-side app loaded ...");
import "./index.css";
import { hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { createStore } from "./redux/store.js";

// Use preloaded state injected by the server
const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__; // clean up after hydration

const store = createStore(preloadedState);

hydrateRoot(
  document.getElementById("root"),
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
);
