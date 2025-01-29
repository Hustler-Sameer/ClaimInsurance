
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/motor-claim"
  },
  {
    "renderMode": 2,
    "route": "/health-claim"
  }
],
  assets: {
    'index.csr.html': {size: 23809, hash: '801212587731db70adf34d15b25342e818dfe73f336e67e4f777a3367887926d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17135, hash: '479907aac098370c89c943dea2a99ce8816ba142eb07461d21f234466e829be5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27797, hash: 'e85b2f17eb283667a21c1a9b2ed0abd25547ff4ea631518c665b8393d984ee04', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'health-claim/index.html': {size: 38479, hash: '7aa32adf4cf4a3ef3ae6978c69b7da89537c8a3ce0fb5ca215d5943ca3641c95', text: () => import('./assets-chunks/health-claim_index_html.mjs').then(m => m.default)},
    'motor-claim/index.html': {size: 37623, hash: '18ffbc9f6c6e9908e5c80920fd4c50c3555a9a7c54f661e4370a17d316667e4d', text: () => import('./assets-chunks/motor-claim_index_html.mjs').then(m => m.default)},
    'styles-N5IW5OPN.css': {size: 7227, hash: 'uG7d74986hQ', text: () => import('./assets-chunks/styles-N5IW5OPN_css.mjs').then(m => m.default)}
  },
};
