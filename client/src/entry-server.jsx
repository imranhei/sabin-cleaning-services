import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { createStore } from "./redux/store.js";

if (process.env.NODE_ENV !== "production") {
  React.enableLegacyMode();
}

export async function render(url) {
  const store = createStore();

  const app = (
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const html = renderToString(app);
  const helmet = Helmet.renderStatic();

  return {
    html,
    helmet: `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.script.toString()}
    `,
    preloadedState: store.getState(), // for client hydration
  };
}
