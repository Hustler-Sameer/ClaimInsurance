import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequesterIdService {
  private requesterIdSubject = new BehaviorSubject<string>('');

  setRequesterId(requesterId: string) {
    this.requesterIdSubject.next(requesterId);
  }

  getRequesterId() {
    return this.requesterIdSubject.asObservable();
  }
}