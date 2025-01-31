
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
    'index.csr.html': {size: 23809, hash: 'a014e72e02ebca49741b191fee0108f9c360ce498dc0f0171868ca14ec1580ec', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17135, hash: '9472c14d0390598e5b0c84292a41cafc23ea578d80bf641486a20d574f32547d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'motor-claim/index.html': {size: 38954, hash: '22553fee67b14cd763d28f0b541e0d2a0aaa0cbd919123d4bc4f67d5e3d3d2b6', text: () => import('./assets-chunks/motor-claim_index_html.mjs').then(m => m.default)},
    'index.html': {size: 27797, hash: 'fce56494c8a7d24d5d680678fde6f23c453f1cb6993f1f4bce831067f5a7e46f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'health-claim/index.html': {size: 39237, hash: '12f90fd576860cf049cdfa5cc246546f1a7c6af2de16b458880c149d573d1233', text: () => import('./assets-chunks/health-claim_index_html.mjs').then(m => m.default)},
    'styles-N5IW5OPN.css': {size: 7227, hash: 'uG7d74986hQ', text: () => import('./assets-chunks/styles-N5IW5OPN_css.mjs').then(m => m.default)}
  },
};
