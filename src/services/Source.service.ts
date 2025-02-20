import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  private source = new BehaviorSubject<string>('');

  setSource(source: string) {
    this.source.next(source);
  }

  getSource() {
    return this.source.asObservable();
  }
}