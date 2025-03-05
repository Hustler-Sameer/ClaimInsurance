
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/ClaimIntimation"
  },
  {
    "renderMode": 2,
    "route": "/ClaimIntimation/motor-claim"
  },
  {
    "renderMode": 2,
    "route": "/ClaimIntimation/health-claim"
  },
  {
    "renderMode": 2,
    "route": "/ClaimIntimation/health-claim-submit"
  }
],
  assets: {
    'index.csr.html': {size: 24244, hash: '169e1d1ffd5abf23fc8aa47eded0e1bb2a8a7ab89b1bae302e3ae78e86ff4269', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17202, hash: 'e30d2a95d9e46e60e98fd305ceac75171bf72fd7a483ebf4f6c9013e6c6e0969', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'ClaimIntimation/motor-claim/index.html': {size: 24808, hash: 'ed524eecf69f39f953da86e25966b6e8694ea762a0e8a72a4ca39a8c1e89780f', text: () => import('./assets-chunks/ClaimIntimation_motor-claim_index_html.mjs').then(m => m.default)},
    'ClaimIntimation/index.html': {size: 36050, hash: '0871e3fb82fded8ecebf28372cea21c21790103e7eee2ec3e579157a9cd45f1b', text: () => import('./assets-chunks/ClaimIntimation_index_html.mjs').then(m => m.default)},
    'ClaimIntimation/health-claim-submit/index.html': {size: 24808, hash: 'ed524eecf69f39f953da86e25966b6e8694ea762a0e8a72a4ca39a8c1e89780f', text: () => import('./assets-chunks/ClaimIntimation_health-claim-submit_index_html.mjs').then(m => m.default)},
    'ClaimIntimation/health-claim/index.html': {size: 24808, hash: 'ed524eecf69f39f953da86e25966b6e8694ea762a0e8a72a4ca39a8c1e89780f', text: () => import('./assets-chunks/ClaimIntimation_health-claim_index_html.mjs').then(m => m.default)},
    'styles-NSRP7YVH.css': {size: 34662, hash: 'I2btByf3sM8', text: () => import('./assets-chunks/styles-NSRP7YVH_css.mjs').then(m => m.default)}
  },
};
