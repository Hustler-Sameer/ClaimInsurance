import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PolicyResponse } from '../main-content/main-content.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-motor-claim-intimation',
  templateUrl: './motor-claim-intimation.component.html',
  styleUrls: ['./motor-claim-intimation.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule  // <-- Add this here
  ],
})
export class MotorClaimIntimationComponent implements OnInit {

  @Input() getResponse: PolicyResponse[] | null = [];
  claimForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.claimForm = this.fb.group({
      customerName: ['', Validators.required],
      policyNumber: ['', Validators.required],
      // registrationNumber: ['', Validators.required],
      // make: ['', Validators.required],
      // model: ['', Validators.required],
      // customerEmailId: ['', [Validators.required, Validators.email]],
      // customerMobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      // dateOfAccident: ['', Validators.required],
      // claimType: ['', Validators.required],
      // selfSurvey: ['', Validators.required],
      // fileUpload: [null],
      // locationOfAccident: ['', Validators.required],
      // workshopName: ['', Validators.required],
      // workshopMobile: ['', Validators.required],
      // lossDetails: ['', Validators.required],
      // remarks: ['', Validators.required],
      // declaration: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    if (this.getResponse && this.getResponse.length > 0) {
      const policy = this.getResponse[0];
      console.log(" The policy info is :" + JSON.stringify(policy));
      this.claimForm.patchValue({
        customerName: policy.CUSTOMER_NAME,
        policyNumber: policy.POLICY_NO,
        // registrationNumber: policy.registrationNumber,
        // make: policy.make,
        // model: policy.model,
        customerEmailId: policy.customer_EmailId,
        customerMobileNumber: policy.Customer_MobileNumber
      });
    }
  }

  onSubmit(): void {
    if (this.claimForm.valid) {
      console.log('Form Submitted:', this.claimForm.value);
      // Handle the form submission (e.g., send data to an API)
    } else {
      console.log('Form is invalid');
    }
  }
}
