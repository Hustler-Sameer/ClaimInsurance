
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
  }
],
  assets: {
    'index.csr.html': {size: 24229, hash: '20bde8a16ac637469778f0fbb608026ec9e2a4cffebb88da0a0710e2f5a38eaa', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17187, hash: '887cfbf7a7603d9f5ad413a64965edee795069e6d319898d640b6109ff63ac27', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'health-claim/index.html': {size: 24793, hash: '960e00fcbd3d518cb641fc6984472486367e9208ff636ca0c8bfcaf609d30194', text: () => import('./assets-chunks/health-claim_index_html.mjs').then(m => m.default)},
    'intimation/index.html': {size: 26828, hash: 'f4a2ebcd19c52e61bd021f704a9979dfc32f2c95ff0b0062616e72f13bc2c975', text: () => import('./assets-chunks/intimation_index_html.mjs').then(m => m.default)},
    'index.html': {size: 24793, hash: '960e00fcbd3d518cb641fc6984472486367e9208ff636ca0c8bfcaf609d30194', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'intimation/health-claim-submit/index.html': {size: 39060, hash: '12cc02624df831f76bd128e4aec114319d2a146a9e85ec3f5c893ab6584323ad', text: () => import('./assets-chunks/intimation_health-claim-submit_index_html.mjs').then(m => m.default)},
    'intimation/motor-claim/index.html': {size: 38513, hash: '151c4c0dd7c004c250410d1c3bb24702ab7c3f953611f0053cd9a5c5a4ee0b15', text: () => import('./assets-chunks/intimation_motor-claim_index_html.mjs').then(m => m.default)},
    'claim-mis/index.html': {size: 34672, hash: '0a2687d03e4987fdd2bbbf27cdb75c83f8d8d6ede4108eaf0c9eb345e97267bc', text: () => import('./assets-chunks/claim-mis_index_html.mjs').then(m => m.default)},
    'styles-NSRP7YVH.css': {size: 34662, hash: 'I2btByf3sM8', text: () => import('./assets-chunks/styles-NSRP7YVH_css.mjs').then(m => m.default)}
  },
};
