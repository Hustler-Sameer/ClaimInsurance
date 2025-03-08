import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoaderService } from '../../services/loader.service';
import { RedirectionService } from '../../services/Redirection.service';
import { Router } from '@angular/router';
import { PolicyResponse } from '../main-content/main-content.component';
import { DialogAnimationsExampleDialog } from '../custom-modal/custom-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { StateService } from '../../services/SharedService.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-dummy-page',
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule,MatProgressSpinnerModule,MatDialogModule],
  templateUrl: './dummy-page.component.html',
  styleUrl: './dummy-page.component.css'
})
export class DummyPageComponent implements OnInit {
  form: FormGroup;
  showClaimIntimation = false;
  showClaimMis = false;
  showViewClaimStatus = false;
  showClientId = false;
  lob: string = "";
  isLoading = false;
  showPolicyNumber = true;
  

  constructor(private fb: FormBuilder, private http: HttpClient,private loaderService: LoaderService, private redirectionService : RedirectionService, private router :Router,private dialog: MatDialog,
    private stateService:StateService
  ) {
    this.loaderService.spinner$.subscribe((data: boolean) => {
      this.isLoading = data;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      source: [''],
      claimType: [''],
      clientId: [''],
      userId: [''],
      policyNo: ['']
    });
  }

  onSourceChange(source: string) {
    if (source === 'Simba') {
      this.showClaimIntimation = true;
      this.showClaimMis = true;
      this.showViewClaimStatus = true;
      this.showClientId=true;
      
    } else if (source === 'Customer Portal') {
      this.showClaimIntimation = true;
      this.showClaimMis = false;
      this.showViewClaimStatus = true;
      this.showClientId=false;
    }
  }
  onClaimTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const claimType = selectElement.value;
  
    if (claimType === "Claim MIS") {
      console.log("Disable policy wala option");
      this.showPolicyNumber = false;
    }
  }



  // onSubmit: any async =()=> {
  //   const formData = this.form.value;
  //   console.log(formData)
  //   const policyNo1 = this.form.value.policyNo;
  //   const requestBody: requestBody = {
  //     clientId: formData.clientId,
  //     agentId: formData.userId, // Assuming userId is the agentId
  //     source: formData.source,
  //     policyNo: formData.policyNo
  //   }; 
  //   // this.http.post('your-api-endpoint', formData).subscribe(response => {
  //   //   console.log('API response:', response);
  //   // });
  //   console.log(requestBody);
  //   this.loaderService.showSpinner();
  //  await this.http.post('http://localhost:7002/Intimation/getToken', requestBody).subscribe(
  //     (response: any) => {
  //       console.log('API response:', response);
  //       // Handle the response here
  //       this.handleResponse(response,formData );
  //       this.loaderService.hideSpinner();
  //     },
  //     (error) => {
  //       console.error('API error:', error);
  //       this.loaderService.hideSpinner();
  //       // Handle the error here
  //     }
  //   );

  //   console.log("After request");
  //   // this.loaderService.showSpinner();
  //   await   this.http
  //     .post<PolicyResponse[]>(
  //       "http://localhost:7002/Intimation/getIntimationPolicyDetails",
  //       '0000000000381325',
  //       {
  //         headers: { "Content-Type": "text/plain",
  //           "Authorization" : 'Bearer ' + `${this.redirectionService.getToken()}`

  //          },
  //       }
  //     )
  //     .subscribe(
  //       (response: PolicyResponse[]) => {
  //         console.log("Response " + response);
  //         this.lob = response[0].lob;
  //         // console.log("Product Name: ", this.lob);
  //         // this.responseSelected.emit(response);
  //         // this.lobSelected.emit(this.lob); //
  //         // sending it to parent element
  //         // this.navigateBasedOnLOB(this.lob);
  //         console.log("This is lob here" , this.lob);
  //         this.loaderService.hideSpinner();
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.loaderService.hideSpinner();
  //         this.dialog.open(DialogAnimationsExampleDialog, {
  //           width: "300px",
  //           data: {
  //             heading: "Error",
  //             claimNumber: "",
  //             remarks: error.error,
  //           },
  //         });
  //       }
  //     );
  // }

  onSubmit: any = async () => {
    const formData = this.form.value;
    console.log(formData);
    this.redirectionService.setNavigationService(formData.claimType);

    const policyNo1 =this.form.value.policyNo;
    const requestBody: requestBody = {
      clientId: formData.clientId,
      agentId: formData.userId, // Assuming userId is the agentId
      source: formData.source,
      policyNo: formData.policyNo
    };
  
    console.log(requestBody);
    this.loaderService.showSpinner();
  
    try {
      // Fetch token
      const tokenResponse: any = await this.http.post('https://ansappsuat.sbigen.in/Intimation/getToken', requestBody).toPromise();
      console.log('Token Response:', tokenResponse);
      const token = tokenResponse.token;
      this.handleResponse(tokenResponse,formData)
      
      const policyResponse: PolicyResponse[] = await this.http.post<PolicyResponse[]>(
        "https://ansappsuat.sbigen.in/Intimation/getIntimationPolicyDetails",
        policyNo1 ,
        {
          headers: {
            "Content-Type": "text/plain",
            "Authorization": `Bearer ${token}`
          },
        }
      ).toPromise();
  
      this.stateService.response = policyResponse;
      console.log("Policy Response:", policyResponse);
      this.lob = policyResponse[0].lob;
      console.log("This is lob here:", this.lob);

      this.navigateBasedOnLOB(this.lob , formData.claimType);
      if(formData.claimType == "Claim Intimation"){
        console.log("Redirect to claim Intimation age")
      }
      // Additional processing
      // this.responseSelected.emit(policyResponse);
      // this.lobSelected.emit(this.lob);
  
    } catch (error) {
      console.error('Error:', error);
      this.dialog.open(DialogAnimationsExampleDialog, {
        width: "300px",
        data: {
          heading: "Error",
          claimNumber: "",
          remarks: error.error,
        },
      });
    } finally {
      this.loaderService.hideSpinner();
    }
  };
  

  navigateBasedOnLOB(lob: string , formData : string) {
    if (lob.startsWith("Motor")) {
      this.router.navigate(["/intimation/motor-claim"]);
    } else if (lob.startsWith("Health")) {
      this.router.navigate(["/intimation/health-claim-submit"]);
    } else if(formData.includes("claimType")) {
      // console.warn("LOB not recognized:", lob);
      this.router.navigate(["/claim-mis-test"])
    }
  }
  handleResponse(response: any,formData : any) {
    // Process the response data as needed
    const token = response.token;
    const clientId = response.clientId;
    const agentId = response.agentId;
    const source = response.source;
    const policyNo = response.policyNo;
  
    // Example: Store the token in local storage
    // localStorage.setItem('authToken', token);s

    this.redirectionService.setToken(token);
    this.redirectionService.setAgentId(agentId);
    this.redirectionService.setclientId(clientId);
    this.redirectionService.setSource(source);
    this.redirectionService.setPolicyNo(policyNo);
  
    // Example: Display the response data in the console
   this.redirectionService.getToken().subscribe((value)=>{
      console.log('Token : ' , value);
  
    });
    console.log('Client ID:', clientId);
    console.log('Agent ID:', agentId);
    console.log('Source:', source);
    console.log('Policy No:', policyNo);

    
    if(formData.claimType == "Claim MIS"){
      // console.log("Redirect to claim mis")
      this.router.navigate(["/claim-mis-test"])
    }
    if(formData.claimType == "View Claim Status"){  
      console.log("Redirect to claim status")
 
    }
  
    // You can also update the UI or perform other actions based on the response
  }
}


export interface requestBody {
  clientId:string;
  agentId:string;
  source:string;
  policyNo:string;
}