
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
    'index.csr.html': {size: 24229, hash: 'db78327a7ba9209414e51510f5944ebd8096809df902a31add2689c1395a958f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17187, hash: '13f1d92ca627ad9992beae6a46d99351138e069682bf3ac156ace632bf30520d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'health-claim/index.html': {size: 24793, hash: '7224ff08e1152cd3d58ca9aa29bdc8f3da8f2dafb7be6dc1dba4ce02fbb1a3d2', text: () => import('./assets-chunks/health-claim_index_html.mjs').then(m => m.default)},
    'index.html': {size: 24793, hash: '7224ff08e1152cd3d58ca9aa29bdc8f3da8f2dafb7be6dc1dba4ce02fbb1a3d2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'intimation/health-claim-submit/index.html': {size: 39060, hash: 'bb9d2234cde8fa4106460dfb064b7995678a265c4d376f7f903cea59a6c3c398', text: () => import('./assets-chunks/intimation_health-claim-submit_index_html.mjs').then(m => m.default)},
    'intimation/motor-claim/index.html': {size: 38513, hash: '9c794b1998f76a3d7c04611df6bba3a45708af6d6d4bfaca6f1ed24bd7bd24b2', text: () => import('./assets-chunks/intimation_motor-claim_index_html.mjs').then(m => m.default)},
    'intimation/index.html': {size: 26828, hash: '198a4a3db2e1683bf7da505ecdd43ff669371f1d13022c0f37dffc71bc2ffffe', text: () => import('./assets-chunks/intimation_index_html.mjs').then(m => m.default)},
    'claim-mis/index.html': {size: 34679, hash: 'ca0475c9a980d76acf89c4da579aba982f681eb551440aa983e98edf33ff99ce', text: () => import('./assets-chunks/claim-mis_index_html.mjs').then(m => m.default)},
    'styles-NSRP7YVH.css': {size: 34662, hash: 'I2btByf3sM8', text: () => import('./assets-chunks/styles-NSRP7YVH_css.mjs').then(m => m.default)}
  },
};
