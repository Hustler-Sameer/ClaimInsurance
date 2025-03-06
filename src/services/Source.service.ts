import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  private source = new BehaviorSubject<string>('');
  private localStorageKey = 'source';

  setSource(source: string) {
    localStorage.setItem(this.localStorageKey, source);
    this.source.next(source);
  }

  getSource() {
    return this.source.asObservable();
  }

  getSourceLocalStorage(): Observable<string> {
    const source = localStorage.getItem(this.localStorageKey);
    return of(source || '');
  }
}