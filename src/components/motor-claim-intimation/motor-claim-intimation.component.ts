import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PolicyResponse } from '../main-content/main-content.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-motor-claim-intimation',
  templateUrl: './motor-claim-intimation.component.html',
  styleUrls: ['./motor-claim-intimation.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule  
  ],
})
export class MotorClaimIntimationComponent implements OnInit {

  @Input() getResponse: PolicyResponse[] | null = [];
  claimForm: FormGroup; 
  

  constructor(private fb: FormBuilder, private http: HttpClient, private loadingService: LoaderService) {
    this.claimForm = this.fb.group({
      customerName: ['', Validators.required],
      policyNumber: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      customerEmailId: ['', [Validators.required, Validators.email]],
      customerMobileNumber: ['', Validators.required],
      AccidentDateTime: ['', Validators.required],
      ModeOfIntimation: ['', Validators.required],
      // selfSurvey: ['', Validators.required],
      // fileUpload: [null],
      LossCity:['',Validators.required],
      LossState:['',Validators.required],
      DriverName:['',Validators.required],
      DrivingLicenseNumber:['',Validators.required],
      workshopName: ['', Validators.required],
      locationOfAccident: ['', Validators.required],
      NatureOfLoss:['',Validators.required],
      LossDescription:['',Validators.required],
      SurveyPlaceOrGarageNameAddress:['',Validators.required],
      WorkshopId:['',Validators.required],
      EstimatedClaimAmount:['',Validators.required],
      // remarks: ['', Validators.required],
      declaration: [false, Validators.requiredTrue]
    });
  }
  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime); // dateTime in "YYYY-MM-DDTHH:mm" format
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;
  }

  ngOnInit(): void {
    if (this.getResponse && this.getResponse.length > 0) {
      const policy = this.getResponse[0];
      console.log(" The policy info is :" + JSON.stringify(policy));
      this.claimForm.patchValue({
        customerName: policy.CUSTOMER_NAME,
        policyNumber: policy.POLICY_NO,
        customerEmailId: policy.Customer_EmailId,
        customerMobileNumber: policy.Customer_MobileNumber
      });
    }
  }

  onSubmit() {
    console.log("hhheheh");
    console.log(this.claimForm.controls);
    console.log("Form Values:", this.claimForm.value);
    const formattedDate = this.formatDateTime(this.claimForm.value.AccidentDateTime);

    const formData = { ...this.claimForm.value, AccidentDateTime: formattedDate };

    console.log('Formatted Form Data:', formData);



// for (const controlName in this.claimForm.controls) {
//   console.log(controlName, this.claimForm.controls[controlName].valid);
// }
    if (this.claimForm.valid) {
      console.log('Form Submitted:', formData);
      // this.loadingService.showSpinner();
      // this.http.post()
      
      // Handle the form submission (e.g., send data to an API)
    } else {
      console.log('Form is invalid');
    }
  }
}


export interface MotorClaimIntimationAncillary {
  customerName : String;
  policyNumber : String; 
  registrationNumber : String;
  InsuredEmailId:String; // it is customerEmailId
  MobileNumber:String; // it is 
  AccidentDateTime:String;
  ModeOfIntimation:String;
  // claimType:String;
  // selfSurvey:String;
  LossCity:String;
  LossState:String;
  DriverName:String;
  DrivingLicenseNumber:String;
  // workshopName:String;
  locationOfAccident:String;
  NatureOfLoss:String;
  LossDescription:String;
  SurveyPlaceOrGarageNameAddress:String;
  workshopId:String;
  EstimatedClaimAmount:String;
  // remarks:String;
  WorkshopId:String;
  ServiceType:"Intimation";
}