import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PolicyResponse } from '../main-content/main-content.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';
import { EncryptDecryptService } from '../../services/EncryptDecrypt.service';
import { MotorClaimIntimation } from '../../services/MotorClaimIntimation.service';

@Component({
  selector: 'app-motor-claim-intimation',
  templateUrl: './motor-claim-intimation.component.html',
  styleUrls: ['./motor-claim-intimation.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class MotorClaimIntimationComponent implements OnInit {

  @Input() getResponse: PolicyResponse[] | null = [];
  claimForm: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient, private loadingService: LoaderService, private motorClaimIntimation: MotorClaimIntimation) {
    this.claimForm = this.fb.group({
      customerName: ['', Validators.required],
      policyNumber: ['', Validators.required],
      // registrationNumber: ['', Validators.required],
      // make: ['', Validators.required],
      // model: ['', Validators.required],
      customerEmailId: ['', [Validators.required, Validators.email]],
      customerMobileNumber: ['', Validators.required],
      AccidentDateTime: ['', Validators.required],
      ModeOfIntimation: ['', Validators.required],
      claimServicingBranch:['',Validators.required],
      isInsured:['',Validators.required],
      // selfSurvey: ['', Validators.required],
      // fileUpload: [null],
      LossCity: ['', Validators.required],
      LossState: ['', Validators.required],
      DriverName: ['', Validators.required],
      DrivingLicenseNumber: ['', Validators.required],
      workshopName: ['', Validators.required],
      // locationOfAccident: ['', Validators.required],
      NatureOfLoss: ['', Validators.required],
      LossDescription: ['', Validators.required],
      SurveyPlaceOrGarageNameAddress: ['', Validators.required],
      // WorkshopId: ['', Validators.required],
      EstimatedClaimAmount: ['', Validators.required],
      remarks: ['', Validators.required],

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
    return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
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

  async onSubmit() {
    console.log("hhheheh");
    console.log(this.claimForm.controls);
    console.log("Form Values:", this.claimForm.value);
    const formattedDate = this.formatDateTime(this.claimForm.value.AccidentDateTime);

    const formData = { ...this.claimForm.value, AccidentDateTime: formattedDate };

    console.log('Formatted Form Data:', formData);



    for (const controlName in this.claimForm.controls) {
      console.log(controlName, this.claimForm.controls[controlName].valid);
    }
    if (this.claimForm.valid) {
      console.log('Form Submitted:', formData);
      const motoveysPayload = {
        Claims: {
          Claim: {
            PolicyNumber: this.claimForm.value.policy_NO,
            RegistrationNumber: this.claimForm.value.registrationNumber,
            InsuredName: this.claimForm.value.customerName,
            ClaimServicingBranch: this.claimForm.value.WorkshopId,
            MobileNumber: this.claimForm.value.customerMobileNumber,
            InsuredEmailId: this.claimForm.value.customerEmailId,
            AccidentDateTime: this.claimForm.value.AccidentDateTime,
            LossState: this.claimForm.value.LossState,
            LossCity: this.claimForm.value.LossCity,
            DriverName: this.claimForm.value.DriverName,
            LossDescription: this.claimForm.value.LossDescription,
            NatureOfLoss: this.claimForm.value.NatureOfLoss,
            SurveyPlaceOrGarageNameAddress: this.claimForm.value.SurveyPlaceOrGarageNameAddress,
            WorkshopId: this.claimForm.value.WorkshopId,
            DrivingLicenseNumber: this.claimForm.value.DrivingLicenseNumber,
            EstimatedClaimAmount: this.claimForm.value.EstimatedClaimAmount,
            ModeOfIntimation: this.claimForm.value.ModeOfIntimation
          },
          InsuranceCompany: "SBIGCL",
          ServiceType: "Intimation",
          TieUpClaimId: "",
          UserId: ""

        }
      }
      const chatBotPayload = {
        RequestHeader:{
          requestId:"123456",
          action:"claimIntimation",
          channel:"SBIG",
          transactionTimestamp:"20-Jan-2025-16:41:23"
        },
        RequestBody:{
          Claims:{
            ServiceType:"Intimation",
            TieUpClaimId:null,
            InsuranceCompany:"UATAICI",
            Claim:{
              PolicyNumber:this.claimForm.value.policy_NO,
              RegistrationNumber:this.claimForm.value.registrationNumber,
              ContactName:this.claimForm.value.customerName,
              ClaimServicingbranch:this.claimForm.value.claimServicingBranch,
              ContactNumber:this.claimForm.value.customerMobileNumber,
              emailID:this.claimForm.value.customerEmailId,
              AccidentDateandtime:this.claimForm.value.AccidentDateTime,
              AccidentCity:this.claimForm.value.LossCity,
              VehicleInspectionAddress:this.claimForm.value.workshopName,
              CityName:this.claimForm.value.LossCity,
              StateName:this.claimForm.value.LossState,
              InspectionSpotLocation:this.claimForm.value.SurveyPlaceOrGarageNameAddress,
              Garage:this.claimForm.value.workshopName,
              DriverName:this.claimForm.value.DriverName,
              isInsured:this.claimForm.value.isInsured,
              ClaimIntimatedBy:"Insured",
              CauseOfLoss:this.claimForm.value.LossDescription,
              Others:this.claimForm.value.remarks,
              EstimatedClaimAmount:this.claimForm.value.EstimatedClaimAmount

            }
          }
        }
      }
      console.log("The chatbot request body is :" + JSON.stringify(chatBotPayload));
      try {
        // const response = await this.motorClaimIntimation.intimateClaim(motoveysPayload);
        // console.log(response);
      } catch (error) {
        console.log(error);

      }
    } else {
      console.log('Form is invalid');
    }
  }
}
