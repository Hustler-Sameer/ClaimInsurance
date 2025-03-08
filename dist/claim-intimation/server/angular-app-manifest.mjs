
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
    'index.csr.html': {size: 24229, hash: '6e7c92653edfe241aa3c8465984a147b7118fb9c33dded7be5930a921f206d69', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17187, hash: 'c7153016a98a54bb8d11282d07bd8c42648b507c7de51bcadee49dcfdabcabce', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 24793, hash: '7b6ab55c96b4847bce1d14879e365a5a497f0b188496419e91e05602223c2cbd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'health-claim/index.html': {size: 24793, hash: '7b6ab55c96b4847bce1d14879e365a5a497f0b188496419e91e05602223c2cbd', text: () => import('./assets-chunks/health-claim_index_html.mjs').then(m => m.default)},
    'intimation/health-claim-submit/index.html': {size: 39044, hash: '88211c3ee62ad8283cc311e66ee89783f16613291acfe80b7b2fd71102747c18', text: () => import('./assets-chunks/intimation_health-claim-submit_index_html.mjs').then(m => m.default)},
    'intimation/index.html': {size: 26812, hash: '05c131e8819388ee2620786f9c4d2e828d7e43eddcfd845109792e9fae5809b5', text: () => import('./assets-chunks/intimation_index_html.mjs').then(m => m.default)},
    'intimation/motor-claim/index.html': {size: 38497, hash: 'bce04155a6d9725140bf30d650acba4e61c075144dc8061e962f543e600685e0', text: () => import('./assets-chunks/intimation_motor-claim_index_html.mjs').then(m => m.default)},
    'claim-mis/index.html': {size: 24793, hash: '7b6ab55c96b4847bce1d14879e365a5a497f0b188496419e91e05602223c2cbd', text: () => import('./assets-chunks/claim-mis_index_html.mjs').then(m => m.default)},
    'claim-mis-test/index.html': {size: 34672, hash: '4864834f5e8091e24d7a0efb4f89e8c150724c2aea701f8359ead0663eb27d28', text: () => import('./assets-chunks/claim-mis-test_index_html.mjs').then(m => m.default)},
    'styles-NSRP7YVH.css': {size: 34662, hash: 'I2btByf3sM8', text: () => import('./assets-chunks/styles-NSRP7YVH_css.mjs').then(m => m.default)}
  },
};
