import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom'; // Changed from 'react-router-dom/server'
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './redux/store.js';

export async function render(url) {
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );
  
  const helmet = Helmet.renderStatic();
  
  return {
    html,
    helmet: `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.script.toString()}
    `
  };
}