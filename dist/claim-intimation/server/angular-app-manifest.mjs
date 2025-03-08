
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
    "route": "/health-claim"
  },
  {
    "renderMode": 2,
    "route": "/intimation"
  },
  {
    "renderMode": 2,
    "route": "/intimation/health-claim-submit"
  },
  {
    "renderMode": 2,
    "route": "/intimation/motor-claim"
  },
  {
    "renderMode": 2,
    "route": "/claim-mis"
  },
  {
    "renderMode": 2,
    "route": "/claim-mis-test"
  }
],
  assets: {
    'index.csr.html': {size: 24229, hash: '4bd472d56082c590e905e9f1aab1ebe17718ff1d8c7efcbcbc279e31bb86c092', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17187, hash: 'c4edba056c036b0018fee578d29639e9225b5b5b4e05765d60651ff3eb4e7dd2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'health-claim/index.html': {size: 24793, hash: '614bbfe00506890741e37181d992c87cc112a2e949d28ff30e943dbac0f548a4', text: () => import('./assets-chunks/health-claim_index_html.mjs').then(m => m.default)},
    'intimation/index.html': {size: 26812, hash: '972227c1bbd983c65476a6f3df37a54753e79d453b0795dc8bfff0e6062fc24f', text: () => import('./assets-chunks/intimation_index_html.mjs').then(m => m.default)},
    'intimation/health-claim-submit/index.html': {size: 39044, hash: '22c48068ca10ce052f70dba066ea1d61a30cf28a677952311010c241a569968b', text: () => import('./assets-chunks/intimation_health-claim-submit_index_html.mjs').then(m => m.default)},
    'claim-mis/index.html': {size: 24793, hash: '614bbfe00506890741e37181d992c87cc112a2e949d28ff30e943dbac0f548a4', text: () => import('./assets-chunks/claim-mis_index_html.mjs').then(m => m.default)},
    'intimation/motor-claim/index.html': {size: 38497, hash: '399ad9c6dddc037abb59538cde1f745f890f2decffa8ed4a5f7a67fa78e09f4e', text: () => import('./assets-chunks/intimation_motor-claim_index_html.mjs').then(m => m.default)},
    'index.html': {size: 24793, hash: '614bbfe00506890741e37181d992c87cc112a2e949d28ff30e943dbac0f548a4', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'claim-mis-test/index.html': {size: 34679, hash: 'd3833b6f698509cc8abbb51ae111b148c6b02ca0fa5f86da60782becadcd9025', text: () => import('./assets-chunks/claim-mis-test_index_html.mjs').then(m => m.default)},
    'styles-NSRP7YVH.css': {size: 34662, hash: 'I2btByf3sM8', text: () => import('./assets-chunks/styles-NSRP7YVH_css.mjs').then(m => m.default)}
  },
};
