import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Router, RouterOutlet } from '@angular/router';
import { MainContentComponent, PolicyResponse } from '../main-content/main-content.component';
import { MotorClaimIntimationComponent } from '../motor-claim-intimation/motor-claim-intimation.component';
import { HeaderComponent } from '../header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HealthClaimIntimationComponent } from '../health-claim-intimation/health-claim-intimation.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../custom-modal/custom-modal.component';
import { StateService } from '../../services/SharedService.service';

@Component({
  selector: 'app-main-outer-component',
  imports: [  RouterOutlet,
      MotorClaimIntimationComponent,
      HeaderComponent,
      MainContentComponent,
      HttpClientModule,
      FormsModule,
      HealthClaimIntimationComponent,
      CommonModule,
      ReactiveFormsModule,
      MatProgressSpinnerModule,
      MatDialogModule,
      DialogAnimationsExampleDialog,],
  templateUrl: './main-outer-component.component.html',
  styleUrl: './main-outer-component.component.css'
})
export class MainOuterComponentComponent {
title = 'claimIntimation2';
  productName: string = ''; // Store the received product name (LOB)
  response: PolicyResponse[] | null = null; // Store the claim response
  isLoading = false;
  

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private stateService: StateService
  ) {
    this.loaderService.spinner$.subscribe((data: boolean) => {
      this.isLoading = data;
    });
  }
  onLobSelected(lob: string) {
    console.log("I am from app component ts " +lob);
    
    if (lob.startsWith('Motor')) {
      this.productName = 'Motor';
      console.log("Inside main outer component s:" + JSON.stringify(this.response));
      this.stateService.response = this.response; 
      console.log("Storing it in service" ,JSON.stringify(this.stateService.response = this.response) );
    
      this.router.navigate(['/motor-claim']);
    } else if (lob.startsWith('Health')) {
      this.productName = 'Health';
      this.stateService.response = this.response;
      this.router.navigate(['/health-claim'], { state: { response: this.response } });
    } else {
      this.productName = '';
      this.router.navigate(['/']); // Default route
    }
  }

  // Store the response data emitted from the child component
  onResponseSelected(response: PolicyResponse[]) {
    console.log("onResponseSelected called with:", response);
    if (response) {
      this.response = response;
      console.log("Updated response successfully:", this.response);
    } else {
      console.error("Received null or undefined response!");
    }
  }
  
}
