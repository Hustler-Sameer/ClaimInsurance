import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderService } from '../../services/loader.service';
import { RedirectionService } from '../../services/Redirection.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dummy-page',
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './dummy-page.component.html',
  styleUrl: './dummy-page.component.css'
})
export class DummyPageComponent implements OnInit {
  form: FormGroup;
  showClaimIntimation = false;
  showClaimMis = false;
  showViewClaimStatus = false;
  showClientId = false;
  

  constructor(private fb: FormBuilder, private http: HttpClient,private loaderService: LoaderService, private redirectionService : RedirectionService, private router: Router) {}

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



  onSubmit() {
    const formData = this.form.value;
    if (!formData.claimType) {
      console.error('Claim Type is not set');
      return;
    }
    console.log(formData)
    const requestBody: requestBody = {
      clientId: formData.clientId,
      agentId: formData.userId, // Assuming userId is the agentId
      source: formData.source,
      policyNo: formData.policyNo
    }; 
    // this.http.post('your-api-endpoint', formData).subscribe(response => {
    //   console.log('API response:', response);
    // });
    console.log(requestBody);
    this.loaderService.showSpinner();
    this.http.post('https://ansappsuat.sbigen.in/Intimation/getToken', requestBody).subscribe(
      (response: any) => {
        console.log('API response:', response);
        // Handle the response here
        this.handleResponse(response,formData);
        this.loaderService.hideSpinner();
      
      },
      (error) => {
        console.error('API error:', error);
        this.loaderService.hideSpinner();
        // Handle the error here
      }
    );
    console.log("After the api")
  }


  handleResponse(response: any , formData:any) {
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

    if(formData.claimType == "Claim Intimation"){
      console.log("Redirect to claim Intimation age")
    }
    if(formData.claimType == "Claim MIS"){

    }
    if(formData.claimType == "View Claim Status"){

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