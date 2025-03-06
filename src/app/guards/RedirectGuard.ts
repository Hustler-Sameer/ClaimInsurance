// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { RequesterIdService } from '../../services/RequesterId.service';
// import { SourceService } from '../../services/Source.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RedirectGuard implements CanActivate {
//     requestId:string="";
//     source:string="";

//   constructor(private router: Router,
//     private requestIdService:RequesterIdService,
//     private sourceService:SourceService
//   ) {}

//   canActivate(): boolean {
//     this.requestIdService.getRequesterId().subscribe((id:string) => {
//         this.requestId = id;
//     });

//     this.sourceService.getSource().subscribe((source:string) => {
//         this.source = source;
//     });
//     // Check if it's a page refresh
//     if (!window.performance || window.performance.navigation.type === 1) {
//       // Redirect to the home page
//     //   this.router.navigate(['/']);
//       this.router.navigate([""], {
//         queryParams: { requestId: this.requestId, source:this.source },
//       });
//       return false;
//     }
//     return true;
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RequesterIdService } from '../../services/RequesterId.service';
import { SourceService } from '../../services/Source.service';
import { Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
    requestId: string = '';
    source: string = '';

  constructor(
    private router: Router,
    private requestIdService: RequesterIdService,
    private sourceService: SourceService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.requestIdService.getRequesterIdLocalStorage().pipe(
      tap((id: string) => {
        this.requestId = id;
      }),
      switchMap(() => this.sourceService.getSourceLocalStorage()),
      map((source: string) => {
        this.source = source;

        // Check if it's a page refresh
        if (!window.performance || window.performance.navigation.type === 1) {
          // Redirect to the home page with query parameters
          this.router.navigate([""], {
            queryParams: { requestId: this.requestId, source: this.source },
          });
          return false;
        }
        return true;
      })
    );
  }
}
