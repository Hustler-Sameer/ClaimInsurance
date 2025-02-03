import { Validators, FormBuilder, FormGroup } from '@angular/forms';

export function createHealthClaimFormValidations(fb: FormBuilder): FormGroup {
  return fb.group({
    customerName: [""],
    policyNumber: [""],
    customerEmailId: [""],
    customerMobileNo: [""],
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
    hospitalState: ["", Validators.required],
    hospitalCity: ["", Validators.required],
    hospitalPinCode: ["", Validators.required],
    hospitalName: ["", Validators.required],
    doctorName: ["", Validators.required],
    roomType: ["", Validators.required],
  });
}
