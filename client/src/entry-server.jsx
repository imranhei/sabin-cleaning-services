import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "./redux/store";

export function render(url) {
  const store = createStore({}); // pass preloaded state if needed

  const html = renderToString(
    <StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </StrictMode>
  );

  return { html, preloadedState: store.getState() };
}