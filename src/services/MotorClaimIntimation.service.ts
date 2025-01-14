
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class MotorClaimIntimation{

    private apiUrl: string = 'https://ansappsuat.sbigen.in/Intimation/motorClaimIntimationMotoveyss';

    constructor(private http: HttpClient) {}
    intimateClaim(payload:any): Observable<any>{
        console.log(this.apiUrl);
        return this.http.post<any>(this.apiUrl,payload);
    }
  }


