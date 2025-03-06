import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule, Location } from "@angular/common";
import { HttpClient, HttpClientModule,HttpErrorResponse } from "@angular/common/http";
import { LoaderService } from "../../services/loader.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";
import { Router } from "@angular/router";
import { StateService } from "../../services/SharedService.service";
import { PolicyResponse } from "../../model/policyResponse";
import { createMotorClaimFormValidations } from "../../validations/motorClaimFormValidations";
import { formatDateTime } from "../../commonFunctions/formatDateTime";
import { buildChatBotPayload } from "../../commonFunctions/chatBotPayload";
import {RequesterIdService } from "../../services/RequesterId.service";
import { SourceService } from "../../services/Source.service";

@Component({
  selector: "app-motor-claim-intimation",
  templateUrl: "./motor-claim-intimation.component.html",
  styleUrls: ["./motor-claim-intimation.component.css"],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class MotorClaimIntimationComponent implements OnInit {
  @Input() getResponse: PolicyResponse[] | null = [];
  claimForm: FormGroup;
  policy!: any;
  requestId: string;
  maxDateTime: string;
  isSubmitted:boolean = false;
  source:string="";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loadingService: LoaderService,
    private dialog: MatDialog,
    private stateService: StateService,
    private router: Router,
    private requesterIdService : RequesterIdService,
    private sourceService:SourceService
  ) {
    const response1 = this.stateService.response;
    console.log("Received response in Motor Claim:", response1);
    this.claimForm = createMotorClaimFormValidations(this.fb);
  }
  
 
  ngOnInit(): void {
    const now = new Date();
    this.maxDateTime = now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:MM'
    this.requesterIdService.getRequesterId().subscribe((id: string) => {
      this.requestId = id;
      console.log("Requester ID in other component: ", this.requestId);
    });

    this.sourceService.getSource().subscribe((id: string) => {
      this.source = id;
    });
  
    const response1 = this.stateService.response;
    console.log("Received response in Motor Claim:", response1);
    if (response1) {
      this.claimForm.patchValue({
        policyNumber: response1[0].policyNo,
        customerName: response1[0].customerName,
        customerEmailId: response1[0].emailID,
        customerMobileNumber: response1[0].mobileNo,
        registrationNumber: response1[0].registrationNo,
      });
    }
  }

  async onSubmit() {
    this.isSubmitted = true;
    console.log("hhheheh");
    console.log(this.claimForm.controls);
    console.log("Form Values:", this.claimForm.value);
    console.log("The date selected is " ,this.claimForm.value.AccidentDateTime );
    const formattedDate = formatDateTime(
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
      const chatBotPayload = buildChatBotPayload(formData,this.requestId);
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
            heading: "Claim Intimation Details",
            claimNumber: "The intimation no.is : " + response?.claimNo,
            remarks: "Remarks : " + response?.statusMessage,
          },
        });
        this.router.navigate([""], {
          queryParams: { requestId: this.requestId, source: this.source },
        });
      } catch (error: unknown) {
        this.loadingService.hideSpinner();
        this.dialog.open(DialogAnimationsExampleDialog, {
          width: "300px",
          data: {
            heading: "Error",
            claimNumber: "",
            remarks: "Remarks : " + (error as HttpErrorResponse).error,
          },
        });
        console.log((error as HttpErrorResponse).error);
      }
    } else {
      console.log("Form is invalid");
    }
  }
}
