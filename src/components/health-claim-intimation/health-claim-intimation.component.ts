import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { PolicyResponse } from "../main-content/main-content.component";
import { FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "../../services/loader.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";

@Component({
  selector: "app-health-claim-intimation",
  imports: [ReactiveFormsModule],
  templateUrl: "./health-claim-intimation.component.html",
  styleUrl: "./health-claim-intimation.component.css",
})
export class HealthClaimIntimationComponent implements OnInit {
  @Input() getResponse: PolicyResponse[] | null = [];
  claimForm: FormGroup;
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
    private dialog: MatDialog
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
      isAccidentCase: [""],
      FIRNo: [""],
      hospitalState: [""],
      hospitalCity: [""],
      hospitalPinCode: [""],
      hospitalName: ["", Validators.required],
      doctorName: ["", Validators.required],
      roomType: ["", Validators.required],
    });
  }

  ngOnInit() {
    console.log("Received Health Claim Response: ", this.getResponse);
    if (this.getResponse && this.getResponse.length > 0) {
      const policy = this.getResponse[0];
      this.claimForm.patchValue({
        customerName: policy.customerName,
        policyNumber: policy.policyNo,
        customerEmailId: policy.emailID,
        customerMobileNo: policy.mobileNo,
        customerAlternateEmailId: policy.alternateEmailId,
        customerAlternateMobileNo: policy.alternateMobileNo,
        memeberId: "4016520383",
      });
    }
  }

  async onSubmit() {
    const formValue = this.claimForm.value;
    console.log("Form values : " + JSON.stringify(formValue));

    try {
      if (this.claimForm.valid) {
        this.loadingService.showSpinner();
        const response = await this.http
          .post<{
            IntimationNo: string;
            ErrorMessage: string;
          }>(
            "http://localhost:7002/Intimation/healthClaimIntimation",
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
            claimNumber: response?.IntimationNo,
            remarks: response?.ErrorMessage,
          },
        });
      } else {
        console.log("All Required fields are not selected")
      }
    } catch (error) {
      this.loadingService.hideSpinner();
      console.log(error);
    }
  }
}
