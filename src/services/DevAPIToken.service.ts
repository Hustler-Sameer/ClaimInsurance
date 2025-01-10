import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevAPITokenService {
  private apiUrl = 'https://devapi.sbigeneral.in/v1/tokens'; // Replace with your API URL

  private headers = new HttpHeaders({
    'X-IBM-Client-Id': '458b817795bad480c5c59e6c424fd285',
    'X-IBM-Client-Secret': '51d9ae9279382a4fa6f1becd4c41ca84',
  });

  constructor(private http: HttpClient) {}

  // Method to fetch data from API
  fetchData(): Observable<any> {
    return this.http.get<any>(this.apiUrl , {headers:this.headers});
  }
}
