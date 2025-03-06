import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequesterIdService {
  private requesterIdSubject = new BehaviorSubject<string>('');
  private localStorageKey = 'requestId';

  setRequesterId(requesterId: string) {
    localStorage.setItem(this.localStorageKey, requesterId);
    this.requesterIdSubject.next(requesterId);
  }

  getRequesterId() {
    return this.requesterIdSubject.asObservable();
  }

  getRequesterIdLocalStorage(): Observable<string> {
    const requestId = localStorage.getItem(this.localStorageKey);
    return of(requestId || '');
  }
}