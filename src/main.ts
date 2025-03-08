import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideIndexedDb } from 'ngx-indexed-db';
import { dbConfig } from './components/db/indexedDb';




// bootstrapApplication(AppComponent, {
//   providers: [provideHttpClient(),provideRouter(routes)],
// });

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideIndexedDb(dbConfig)
  ],
}).catch((err) => console.error(err));