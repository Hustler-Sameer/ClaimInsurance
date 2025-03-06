import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { LoaderService } from "../../services/loader.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";
import { StateService } from "../../services/SharedService.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { PolicyResponse } from "../../model/policyResponse";
import { policyMembers } from "../../model/policyMembers";
import { createHealthClaimFormValidations } from "../../validations/healthValidations";
import { RequesterIdService } from "../../services/RequesterId.service";
import { SourceService } from "../../services/Source.service";

@Component({
  selector: "app-health-claim-submit",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./health-claim-submit.component.html",
  styleUrl: "./health-claim-submit.component.css",
})
export class HealthClaimSubmitComponent implements OnInit , OnDestroy {
  @Input() getResponse: PolicyResponse[] | null = [];
  policyMembersList: policyMembers[] | null = [];
  claimForm: FormGroup;
  showFirNo: boolean = false;
  isSubmitted: boolean = false;
  requesterId: string = "";
  source: string = "";
  private base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loadingService: LoaderService,
    private dialog: MatDialog,
    private stateService: StateService,
    private router: Router,
    private requesterIdService: RequesterIdService,
    private sourceService: SourceService
  ) {
    this.claimForm = createHealthClaimFormValidations(this.fb);
  }

  ngOnInit() {
    const policyDetails = this.stateService.response;
    this.policyMembersList = this.stateService.response[1];
    this.requesterIdService.getRequesterId().subscribe((id: string) => {
      this.requesterId = id;
      console.log("Requester ID in other component: ", this.requesterId);
    });

    this.sourceService.getSource().subscribe((id: string) => {
      this.source = id;
    });

    console.log("Received Health Claim Response: ", policyDetails);
    console.log("Received Policy member list: ", this.policyMembersList);
    if (policyDetails && policyDetails.length > 0) {
      const patientNames =
        this.policyMembersList && this.policyMembersList.length > 0
          ? this.policyMembersList.map((member) => member.name).join(", ")
          : "";
      this.claimForm.patchValue({
        customerName: policyDetails[0].customerName,
        policyNumber: policyDetails[0].policyNo,
        customerEmailId: policyDetails[0].emailID,
        customerMobileNo: policyDetails[0].mobileNo,
        customerAlternateEmailId: policyDetails[0].alternateEmailId,
        customerAlternateMobileNo: policyDetails[0].alternateMobileNo,
        requestId: this.requesterId,
        // patientName: patientNames,
      });
    }
  }

  onPatientNameChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedName = selectElement.value;

    if (this.policyMembersList) {
      const selectedMember = this.policyMembersList.find(
        (member) => member.name === selectedName
      );
      if (selectedMember) {
        const formattedMemberId = selectedMember.memberId
          .toString()
          .padStart(16, "0");
        this.claimForm.patchValue({
          patientName: selectedName,
          memeberId: formattedMemberId,
        });
      }
    }
  }

  onAccidentCaseChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.showFirNo = selectedValue === "Yes";

    const firNoControl = this.claimForm.get("FIRNo");
    if (firNoControl) {
      if (this.showFirNo) {
        firNoControl.setValidators([Validators.required]);
      } else {
        firNoControl.clearValidators();
      }
      firNoControl.updateValueAndValidity();
    }
  }

  async onSubmit() {
    const formValue = this.claimForm.value;
    console.log("Form values : " + JSON.stringify(formValue));
    this.isSubmitted = true;
    console.log(
      "Patient name selected : " + this.claimForm.controls["patientName"].valid
    );
    try {
      if (this.claimForm.valid) {
        this.loadingService.showSpinner();
        const response = await this.http
          .post<{
            ClaimReferenceNo: string;
            ErrorMessage: string;
          }>(
            // "https://ansappsuat.sbigen.in/Intimation/healthClaimIntimation",
            "https://ansappsuat.sbigen.in/Intimation/healthClaimSubmit",
            formValue,
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
            claimNumber: "The intimation no.is : " + response?.ClaimReferenceNo,
            remarks: "Remarks : " + response?.ErrorMessage,
          },
        });
        this.router.navigate([""], {
          queryParams: { requestId: this.requesterId, source: this.source },
        });
      } else {
        console.log("All Required fields are not selected");
      }
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
  }

  ngOnDestroy(): void {
      console.log("Health component is destroyed");
  }

}
