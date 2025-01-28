import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface PolicyResponse {
  lob: string;
  // Add other fields here as per your API response.
}

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private apiUrl = 'https://ansappsuat.sbigen.in/Intimation/getIntimationPolicyDetails';

  constructor(private http: HttpClient) {}

  getPolicyDetails(policyNumber: string): Observable<PolicyResponse[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });

    return this.http.post<PolicyResponse[]>(this.apiUrl, policyNumber, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching policy details:', error);
        return throwError(() => error);
      })
    );
  }
}
