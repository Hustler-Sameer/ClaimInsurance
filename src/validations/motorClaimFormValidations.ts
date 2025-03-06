import { Validators, FormBuilder, FormGroup } from '@angular/forms';

export function createMotorClaimFormValidations(fb: FormBuilder): FormGroup {
    return fb.group({
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
  