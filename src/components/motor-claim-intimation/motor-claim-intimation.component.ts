import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { PolicyResponse } from "../main-content/main-content.component";
import { CommonModule, Location } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { LoaderService } from "../../services/loader.service";
import { MotorClaimIntimation } from "../../services/MotorClaimIntimation.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";
import { Router } from "@angular/router";
import { PolicyService } from "../../services/PolicyInformation.service";
import { StateService } from "../../services/SharedService.service";

@Component({
  selector: "app-motor-claim-intimation",
  templateUrl: "./motor-claim-intimation.component.html",
  styleUrls: ["./motor-claim-intimation.component.css"],
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
})
export class MotorClaimIntimationComponent implements OnInit {
  @Input() getResponse: PolicyResponse[] | null = [];
  claimForm: FormGroup;
  policy!: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loadingService: LoaderService,
    private motorClaimIntimation: MotorClaimIntimation,
    private dialog: MatDialog,
    private stateService: StateService,
    private router: Router,
  ) {
    const response1 = this.stateService.response;
  console.log("Received response in Motor Claim:", response1);
    this.claimForm = this.fb.group({
      customerName: ["", Validators.required],
      policyNumber: ["", Validators.required],
      registrationNumber: ["", Validators.required],
      customerEmailId: ["", [Validators.required, Validators.email]],
      customerMobileNumber: ["", Validators.required],
      AccidentDateTime: ["", Validators.required],
      claimServicingBranch: ["", Validators.required],
      isInsured: ["", Validators.required],
      LossCity: ["", Validators.required],
      LossState: ["", Validators.required],
      DriverName: ["", Validators.required],
      DrivingLicenseNumber: ["", Validators.required],
      workshopName: ["", Validators.required],
      LossDescription: ["", Validators.required],
      SurveyPlaceOrGarageNameAddress: ["", Validators.required],
      EstimatedClaimAmount: ["", Validators.required],
      remarks: ["", Validators.required],
      declaration: [false, Validators.requiredTrue],
    });
  }
  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
  }

  ngOnInit(): void {
    const response1 = this.stateService.response;
    console.log("Received response in Motor Claim:", response1);
    if(response1){
      this.claimForm.patchValue({
        policyNumber:response1[0].policyNo,
        customerName:response1[0].customerName,
        customerEmailId:response1[0].emailID,
        customerMobileNumber:response1[0].mobileNo,
        registrationNumber:response1[0].registrationNo
      })
    }
  }

  async onSubmit() {
    console.log("hhheheh");
    console.log(this.claimForm.controls);
    console.log("Form Values:", this.claimForm.value);
    const formattedDate = this.formatDateTime(
      this.claimForm.value.AccidentDateTime
    );

    const formData = {
      ...this.claimForm.value,
      AccidentDateTime: formattedDate,
    };

    console.log("Formatted Form Data:", formData);

    for (const controlName in this.claimForm.controls) {
      console.log(controlName, this.claimForm.controls[controlName].valid);
    }
    if (this.claimForm.valid) {
      console.log("Form Submitted:", formData);
      console.log("The policy no is + " + this.claimForm.value.policyNumber);
      const chatBotPayload = {
        RequestHeader: {
          requestID: "123456",
          action: "claimIntimation",
          channel: "SBIG",
          transactionTimestamp: "20-Jan-2025-16:41:23",
        },
        RequestBody: {
          Claims: {
            ServiceType: "Intimation",
            TieUpClaimId: null,
            InsuranceCompany: "UATAICI",
            Claim: {
              PolicyNumber: this.claimForm.value.policyNumber,
              RegistrationNumber: this.claimForm.value.registrationNumber,
              ContactName: this.claimForm.value.customerName,
              ClaimServicingbranch: this.claimForm.value.claimServicingBranch,
              ContactNumber: this.claimForm.value.customerMobileNumber,
              emailID: this.claimForm.value.customerEmailId,
              AccidentDateandtime: formattedDate,
              AccidentCity: this.claimForm.value.LossCity,
              VehicleInspectionAddress: this.claimForm.value.workshopName,
              CityName: this.claimForm.value.LossCity,
              StateName: this.claimForm.value.LossState,
              InspectionSpotLocation:
                this.claimForm.value.SurveyPlaceOrGarageNameAddress,
              Garage: this.claimForm.value.workshopName,
              DriverName: this.claimForm.value.DriverName,
              isInsured: this.claimForm.value.isInsured,
              ClaimIntimatedBy: "Insured",
              CauseOfLoss: this.claimForm.value.LossDescription,
              Others: this.claimForm.value.remarks,
              EstimatedClaimAmount: this.claimForm.value.EstimatedClaimAmount,
            },
          },
        },
      };
      console.log(
        "The chatbot request body is :" + JSON.stringify(chatBotPayload)
      );

      try {
        this.loadingService.showSpinner();
        const response = await this.http
          .post<{
            claimNo: string;
            statusMessage: string;
          }>(
            "https://ansappsuat.sbigen.in/Intimation/intimateMotorClaim",
            chatBotPayload,

            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .toPromise();
        this.loadingService.hideSpinner();
        console.log(response);
        this.dialog.open(DialogAnimationsExampleDialog, {
          width: "300px",
          data: {
            heading:"Claim Intimation Details",
            claimNumber:"The intimation no.is : "+response?.claimNo,
            remarks:"Remarks : "+ response?.statusMessage,
          },
        });
        this.router.navigate(['']);
      } catch (error) {
        this.loadingService.hideSpinner();

        console.log(error);
      }
    } else {
      console.log("Form is invalid");
    }
  }
}
