
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
    'index.csr.html': {size: 24243, hash: '0608785092c081260479e418493fdc256269412cfa42a2f18a31cc9d027aaa77', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17187, hash: 'b9ca0b8fb98a10f29092b69d4469f033c818663ab23c6d52c700fb6d03519005', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'motor-claim/index.html': {size: 47042, hash: '9207c919de90c09bc0e2387783a7f7bf76ded29410427540e08935b8a383d88c', text: () => import('./assets-chunks/motor-claim_index_html.mjs').then(m => m.default)},
    'health-claim/index.html': {size: 40901, hash: 'cf51bb5b056886da74c136d2f59cf97ab68d8bd4c270686ba5f9a679c39dd724', text: () => import('./assets-chunks/health-claim_index_html.mjs').then(m => m.default)},
    'index.html': {size: 35982, hash: 'e3aec009ba86c512f9d3ed32d366e7603b5b3118478f4e216f02f35d09ff2664', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-73PKIQUE.css': {size: 33095, hash: 'alAr0KQgkGk', text: () => import('./assets-chunks/styles-73PKIQUE_css.mjs').then(m => m.default)}
  },
};
