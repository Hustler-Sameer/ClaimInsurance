import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyNumberService {
  private policyNumberSubject = new BehaviorSubject<string>('');

  setPolicyNumber(policyNumber: string) {
    this.policyNumberSubject.next(policyNumber);
  }

  getPolicyNumber() {
    return this.policyNumberSubject.asObservable();
  }
}
