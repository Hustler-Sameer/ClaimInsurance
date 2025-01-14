import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { DevAPITokenService } from '../../services/DevAPIToken.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
  // Corrected the property name
})
export class MainContentComponent implements OnDestroy {
  // Component logic here
  policyNumber: string = '';
  lob:string="";
  private devAPIToken:any;
  constructor(private http: HttpClient, private loadingService: LoaderService , private DevAPITokenService:DevAPITokenService) {}
  @Output() responseSelected = new EventEmitter<PolicyResponse[]>(); 
  @Output() lobSelected = new EventEmitter<string>(); // passing component to parent element


  // ngOnInit(): void {    
  //   this.fetchToken();

  //   this.devAPIToken = setInterval(() => {
  //     this.fetchToken();
  //   }, 150000);
  // }

  // fetchToken(): void {
  //   this.DevAPITokenService.fetchData().subscribe(
  //     data => {
  //       console.log('DevAPI Token :', data);  
        
  //     },
  //     error => {
  //       console.error('Error fetching token:', error);
  //     }
  //   );
  // }
  // fetchToken(): void {
  //   this.DevAPITokenService.fetchData().subscribe(
  //     data => {
  //       console.log('DevAPI Token:', data);
  
  //       // Assuming `data` contains the token in the format { accessToken: 'your-token' }
  //       if (data && data.accessToken) {
  //         // Store the token in localStorage
  //         localStorage.setItem('devapiToken', data.accessToken);
  
  //         console.log('Token stored in localStorage successfully.');
  //       } else {
  //         console.warn('No access token found in the response.');
  //       }
  //     },
  //     error => {
  //       console.error('Error fetching token:', error);
  //     }
  //   );
  // }
  

  ngOnDestroy(): void {
    if (this.devAPIToken) {
      clearInterval(this.devAPIToken);
    }
  }

  searchPolicy() {
    this.loadingService.showSpinner();
    // this.fetchToken();

    this.devAPIToken = setInterval(() => {
      // this.fetchToken();
    }, 150000);
    
    
    this.http
      .post<PolicyResponse[]>(
        'https://ansappsuat.sbigen.in/SECUREAPI/getPolicyInfo',
        this.policyNumber,
        {
          headers: { 'Content-Type': 'text/plain' },
        }
      )

      .subscribe(
        (response:PolicyResponse[]) => {
          console.log('Response ' + response);
          this.lob = response[0].lob;
          console.log("Product Name: ", this.lob);
          this.responseSelected.emit(response); 
          this.lobSelected.emit(this.lob); //sending it to parent element
          this.loadingService.hideSpinner();
        },  
        (error) => {
          console.log(error);
          this.loadingService.hideSpinner();
        }
      );
  }

  setPolicyNumber(e: any) {
    this.policyNumber = e.target.value;
  }



}



export interface PolicyResponse {
  POLICY_NO: string;
  CUSTOMER_NAME: string;
  Customer_MobileNumber: string;
  Customer_EmailId: string;
  PolicyStartDate: string;
  PolicyEndDate: string;
  PRODUCT_NAME: string;
  AGREEMENT_CODE: string;
  INTERMEDIARY_CODE: string;
  INTERMEDIARY_NAME: string;
  SBI_BRANCH: string;
  SECONDARY_SALES_MANAGER_CODE: string;
  SECONDARY_SALES_MANAGER_NAME: string;
  SALES_MANAGER_EMAIL_ID: string;
  SM_MOBILE_NUMBER: string;
  LOB: string;
  SM_ID: string;
  customer_EmailId: string;
  sm_MOBILE_NUMBER: string;
  customer_MobileNumber: string;
  policyEndDate: string;
  agreement_CODE: string;
  sbi_BRANCH: string;
  sm_ID: string;
  sales_MANAGER_EMAIL_ID: string;
  secondary_SALES_MANAGER_NAME: string;
  customer_NAME: string;
  policy_NO: string;
  product_NAME: string;
  intermediary_NAME: string;
  intermediary_CODE: string;
  secondary_SALES_MANAGER_CODE: string;
  policyStartDate: string;
  lob: string;
}
