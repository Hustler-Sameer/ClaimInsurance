// import { DBConfig } from 'ngx-indexed-db';

// export const dbConfig: DBConfig = {
//   name: 'MyDb',
//   version: 1,
//   objectStoresMeta: [{
//     store: 'tokenApiData',
//     storeConfig: { keyPath: 'id', autoIncrement: true },
//     storeSchema: [
//         { name: 'token', keypath: 'token', options: { unique: false } },
//         { name: 'clientId', keypath: 'clientId', options: { unique: false } },
//         { name: 'agentId', keypath: 'agentId', options: { unique: false } },
//         { name: 'source', keypath: 'source', options: { unique: false } },
//         { name: 'policyNo', keypath: 'policyNo', options: { unique: false } }
//     ]
//   }]
// };

import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'tokenApiData',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'token', keypath: 'token', options: { unique: false } },
      { name: 'clientId', keypath: 'clientId', options: { unique: false } },
      { name: 'agentId', keypath: 'agentId', options: { unique: false } },
      { name: 'source', keypath: 'source', options: { unique: false } },
      { name: 'policyNo', keypath: 'policyNo', options: { unique: false } }
    ]
  }]
};