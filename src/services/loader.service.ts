import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public spinner$: Subject<any>;

  constructor() {
    this.spinner$ = new Subject<any>();
  }

  showSpinner() {
    this.spinner$.next(true);
  }

  hideSpinner() {
    this.spinner$.next(false);
  }
}