import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _response: any = null;

  get response() {
    return this._response;
  }

  set response(data: any) {
    this._response = data;
  }
}
