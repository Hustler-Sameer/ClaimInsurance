import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-dummy-page',
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './dummy-page.component.html',
  styleUrl: './dummy-page.component.css'
})
export class DummyPageComponent implements OnInit {
  form: FormGroup;
  showClaimIntimation = false;
  showClaimMis = false;
  showViewClaimStatus = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      source: [''],
      claimType: [''],
      clientId: [''],
      userId: [''],
      policyNo: ['']
    });
  }

  onSourceChange(source: string) {
    if (source === 'Simba') {
      this.showClaimIntimation = true;
      this.showClaimMis = true;
      this.showViewClaimStatus = true;
    } else if (source === 'Customer Portal') {
      this.showClaimIntimation = true;
      this.showClaimMis = false;
      this.showViewClaimStatus = true;
    }
  }

  onSubmit() {
    const formData = this.form.value;
    console.log(formData)
    // this.http.post('your-api-endpoint', formData).subscribe(response => {
    //   console.log('API response:', response);
    // });
  }
}
