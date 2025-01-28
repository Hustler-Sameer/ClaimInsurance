
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  assets: {
    'index.csr.html': {size: 23860, hash: 'ae727fd68c64317d3565972d9f69dce9573ee5536353ce362fa43266b2813b5d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17186, hash: 'dee30a694336e065b333640b09f3e1de7d814249f375fb85558f39231d5df35e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27749, hash: 'f0cfa98101d403b247a3fd687fbad1c197f58b212a8e4415c4610969bc864fed', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-N5IW5OPN.css': {size: 7227, hash: 'uG7d74986hQ', text: () => import('./assets-chunks/styles-N5IW5OPN_css.mjs').then(m => m.default)}
  },
};
