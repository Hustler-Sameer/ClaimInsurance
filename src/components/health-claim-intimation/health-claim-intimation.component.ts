import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { PolicyResponse } from '../main-content/main-content.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-health-claim-intimation',
  imports: [ReactiveFormsModule],
  templateUrl: './health-claim-intimation.component.html',
  styleUrl: './health-claim-intimation.component.css'
})
export class HealthClaimIntimationComponent implements OnInit {
 
  @Input() getResponse : PolicyResponse[] | null = [];
  claimForm:FormGroup;

  constructor(private fb: FormBuilder) {
      this.claimForm = this.fb.group({
        customerName: ['', Validators.required],
        policyNumber: ['', Validators.required],
        customerEmailId: ['',Validators.required],
        customerMobileNo: ['', Validators.required],
        customerAlternateEmailId: ['',Validators.required],
        customerAlternateMobileNo: ['', Validators.required],
      });
    }
  
  ngOnInit() {
    console.log('Received Health Claim Response: ', this.getResponse);
    if(this.getResponse && this.getResponse.length>0) {
      const policy = this.getResponse[0];
      this.claimForm.patchValue({
        customerName:policy.customer_NAME,
        policyNumber:policy.policy_NO,
        customerEmailId:policy.Customer_EmailId,
        customerMobileNo:policy.Customer_MobileNumber,
        customerAlternateEmailId:policy.customer_EmailId,
        customerAlternateMobileNo:policy.customer_MobileNumber
      });
    }
  }

}
