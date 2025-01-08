import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { PolicyResponse } from "../main-content/main-content.component";
import { FormGroup } from "@angular/forms";
import { EncryptDecryptService } from "src/services/EncryptDecrypt.service";

@Component({
  selector: "app-health-claim-intimation",
  imports: [ReactiveFormsModule],
  templateUrl: "./health-claim-intimation.component.html",
  styleUrl: "./health-claim-intimation.component.css",
})
export class HealthClaimIntimationComponent implements OnInit {
  @Input() getResponse: PolicyResponse[] | null = [];
  claimForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private encService: EncryptDecryptService
  ) {
    this.claimForm = this.fb.group({
      customerName: ["", Validators.required],
      policyNumber: ["", Validators.required],
      customerEmailId: ["", Validators.required],
      customerMobileNo: ["", Validators.required],
      customerAlternateEmailId: ["", Validators.required],
      customerAlternateMobileNo: ["", Validators.required],
      memeberId:[""],
      claimType: [""],
      patientName: [""],
      claimAmount: [""],
      dateOfAdmission: [""],
      dateOfDischarge: [""],
      remark: [""],
      admissionReason: [""],
      isAccidentCase: [""],
      FIRNo:[""],
      hospitalState: [""],
      hospitalCity: [""],
      hospitalPinCode: [""],
      hospitalName: [""],
      doctorName: [""],
      roomType: [""],
    });
  }

  ngOnInit() {
    console.log("Received Health Claim Response: ", this.getResponse);
    if (this.getResponse && this.getResponse.length > 0) {
      const policy = this.getResponse[0];
      this.claimForm.patchValue({
        customerName: policy.customer_NAME,
        policyNumber: policy.policy_NO,
        customerEmailId: policy.Customer_EmailId,
        customerMobileNo: policy.Customer_MobileNumber,
        customerAlternateEmailId: policy.customer_EmailId,
        customerAlternateMobileNo: policy.customer_MobileNumber,
      });
    }
  }

  async onSubmit() {
    try {
      const formValue = this.claimForm.value;
      console.log("Submitted Form : " + JSON.stringify(formValue));
      const encryptedData = await this.encService.encryptText(
        formValue,
        "05y/Zh9tsXeFAkRCz93poem27hMLV2iX",
        "VTXb7e2p1iQ="
      );
      console.log("Encrypted data : " + encryptedData.encryptedText);
    } catch (error) {
      console.log("Error during encyption : " + error);
    }
  }
}
