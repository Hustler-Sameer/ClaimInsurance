import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MotorClaimIntimationComponent } from '../components/motor-claim-intimation/motor-claim-intimation.component';
import { HeaderComponent } from "../components/header/header.component";
import { MainContentComponent, PolicyResponse } from "../components/main-content/main-content.component";
import { HttpClientModule } from '@angular/common/http'; //
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HealthClaimIntimationComponent } from '../components/health-claim-intimation/health-claim-intimation.component'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MotorClaimIntimationComponent, HeaderComponent, MainContentComponent,HttpClientModule,FormsModule , HealthClaimIntimationComponent,CommonModule,ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  // template:`
  // <main>
  // <header class="brand-name">
  // <img class="brand-logo" src="/logo.jpeg" alt="logo" aria-hidden="true"> 
  // </header>
  // </main>`,

  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'claimIntimation';
  productName: string = ''; // Store the received product name (LOB)
  response: PolicyResponse[] | null = null; // Store the motor claim response
  isLoading = false;

  constructor(private loaderService: LoaderService){
    this.loaderService.spinner$.subscribe((data: boolean) => {
      
      this.isLoading = data;
     
    });
  }

  // Method to receive the product name (LOB) from the child component
  onLobSelected(lob: string) {
    
    // this.productName = lob;
    if (lob.startsWith('Motor')) {
      this.productName = 'Motor'; // Set to "Motor" if the LOB starts with "Motor"
    } else if (lob.startsWith('Health')) {
      this.productName = 'Health'; // Set to "Health" if the LOB starts with "Health"
    } else {
      this.productName = ''; // Optionally, clear the product name if it doesn't start with "Motor" or "Health"
    }
  }
  onResponseSelected(response: PolicyResponse[]) {
      this.response = response;
    
    
  }



}
