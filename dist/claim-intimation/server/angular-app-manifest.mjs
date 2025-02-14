
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
    'index.csr.html': {size: 24243, hash: '9106cf57438e86e1542f5ddf8c943452cba7796a49f108e154cc4fb9aa2f0168', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17187, hash: 'ef0ae4b403832eb181a7cbb36853bc70d199c1ea72522c0af103ba49cfe8d9e4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 36209, hash: 'a7b93b96cee212a55e987fb2f3785060ff3d560fdd785dad6475aa6688e0f7bd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'motor-claim/index.html': {size: 47269, hash: '4327284ce6a513c50549457a879fa3bc0e23b114b657d36d4e6c6a1010504a11', text: () => import('./assets-chunks/motor-claim_index_html.mjs').then(m => m.default)},
    'health-claim/index.html': {size: 41128, hash: '801f0f324de8e0c1c93c1af5130b878f43a4d4d142161c1c12bc0dfb1686b694', text: () => import('./assets-chunks/health-claim_index_html.mjs').then(m => m.default)},
    'styles-73PKIQUE.css': {size: 33095, hash: 'alAr0KQgkGk', text: () => import('./assets-chunks/styles-73PKIQUE_css.mjs').then(m => m.default)}
  },
};
