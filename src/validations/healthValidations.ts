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
    claimType: ["",Validators.required],
    patientName: ["",Validators.required],
    claimAmount: ["", Validators.required],
    dateOfAdmission: ["", Validators.required],
    dateOfDischarge: ["",Validators.required],
    remark: [""],
    admissionReason: ["", Validators.required],
    disease:["",Validators.required],
    isAccidentCase: [""],
    FIRNo: [""],
    hospitalState: ["", Validators.required],
    hospitalCity: ["", Validators.required],
    hospitalPinCode: [""],
    hospitalAddress:["",Validators.required],
    hospitalId:[""],
    hospitalName: ["", Validators.required],
    doctorName: ["",Validators.required],
    roomType: [""],
    requestId:["",Validators.required]
  });
}
