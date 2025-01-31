import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { PolicyResponse } from "../main-content/main-content.component";
import { FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "../../services/loader.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";
import { StateService } from "../../services/SharedService.service";
import { policyMembers } from "../main-content/main-content.component";
import { CommonModule } from "@angular/common";


@Component({
  selector: "app-health-claim-intimation",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./health-claim-intimation.component.html",
  styleUrl: "./health-claim-intimation.component.css",
})
export class HealthClaimIntimationComponent implements OnInit {
  @Input() getResponse: PolicyResponse[] | null = [];
  policyMembersList: policyMembers[] | null = [];
  claimForm: FormGroup;
  showFirNo: boolean = false;
  isSubmitted:boolean = false;
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
    private stateService: StateService
  ) {
    this.claimForm = this.fb.group({
      customerName: ["", Validators.required],
      policyNumber: ["", Validators.required],
      customerEmailId: ["", Validators.required],
      customerMobileNo: ["", Validators.required],
      customerAlternateEmailId: [""],
      customerAlternateMobileNo: [""],
      memeberId: ["", Validators.required],
      claimType: [""],
      patientName: ["", Validators.required],
      claimAmount: ["", Validators.required],
      dateOfAdmission: ["", Validators.required],
      dateOfDischarge: [""],
      remark: [""],
      admissionReason: ["", Validators.required],
      isAccidentCase: ["", Validators.required],
      FIRNo: [""],
      hospitalState: ["",Validators.required],
      hospitalCity: ["",Validators.required],
      hospitalPinCode: ["",Validators.required],
      hospitalName: ["", Validators.required],
      doctorName: ["", Validators.required],
      roomType: ["", Validators.required],
    });
  }

  ngOnInit() {
    const policyDetails = this.stateService.response;
    this.policyMembersList = this.stateService.response[1];
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
        patientName: patientNames,
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
        this.claimForm.patchValue({
          patientName: selectedName,
          memeberId: selectedMember.memberId,
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
    try {
      if (this.claimForm.valid) {
        this.loadingService.showSpinner();
        const response = await this.http
          .post<{
            IntimationNo: string;
            ErrorMessage: string;
          }>(
            "https://ansappsuat.sbigen.in/Intimation/healthClaimIntimation",
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
            heading:"Claim Intimation Details",
            claimNumber:"The intimation no.is : "+ response?.IntimationNo,
            remarks:"Remarks : "+ response?.ErrorMessage,
          },
        });
      } else {
        console.log("All Required fields are not selected");
      }
    } catch (error) {
      this.loadingService.hideSpinner();
      console.log(error);
    }
  }
}
