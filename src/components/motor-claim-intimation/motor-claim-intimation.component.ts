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
    });
  }

  ngOnInit(): void {
    if (this.getResponse && this.getResponse.length > 0) {
      const policy = this.getResponse[0];
      console.log(" The policy info is :" + JSON.stringify(policy));
      this.claimForm.patchValue({
        customerName: policy.CUSTOMER_NAME,
        policyNumber: policy.POLICY_NO,
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
