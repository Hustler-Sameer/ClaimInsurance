// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { MotorClaimIntimationComponent } from '../components/motor-claim-intimation/motor-claim-intimation.component';
// import { HeaderComponent } from "../components/header/header.component";
// import { MainContentComponent, PolicyResponse } from "../components/main-content/main-content.component";
// import { HttpClientModule } from '@angular/common/http'; //
// import { FormsModule } from '@angular/forms'; 
// import { CommonModule } from '@angular/common';  
// import { ReactiveFormsModule } from '@angular/forms';
// import { LoaderService } from '../services/loader.service';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import { HealthClaimIntimationComponent } from '../components/health-claim-intimation/health-claim-intimation.component'; 
// import { DevAPITokenService } from '../services/DevAPIToken.service';
// import { MatDialogModule } from '@angular/material/dialog';
// import { DialogAnimationsExampleDialog } from '../components/custom-modal/custom-modal.component';


// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, MotorClaimIntimationComponent, HeaderComponent, MainContentComponent,HttpClientModule,FormsModule , HealthClaimIntimationComponent,CommonModule,ReactiveFormsModule, MatProgressSpinnerModule,MatDialogModule,DialogAnimationsExampleDialog],
//   providers: [DevAPITokenService],
//   templateUrl: './app.component.html',
//   // template:`
//   // <main>
//   // <header class="brand-name">
//   // <img class="brand-logo" src="/logo.jpeg" alt="logo" aria-hidden="true"> 
//   // </header>
//   // </main>`,

//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'claimIntimation';
//   productName: string = ''; // Store the received product name (LOB)
//   response: PolicyResponse[] | null = null; // Store the motor claim response
//   isLoading = false;

//   constructor(private loaderService: LoaderService , private devAPITokenService:DevAPITokenService){
//     this.loaderService.spinner$.subscribe((data: boolean) => {
      
//       this.isLoading = data;
     
//     });
//   }

//   // Method to receive the product name (LOB) from the child component
//   onLobSelected(lob: string) {
    
//     // this.productName = lob;
//     if (lob.startsWith('Motor')) {
//       this.productName = 'Motor'; // Set to "Motor" if the LOB starts with "Motor"
//     } else if (lob.startsWith('Health')) {
//       this.productName = 'Health'; // Set to "Health" if the LOB starts with "Health"
//     } else {
//       this.productName = ''; // Optionally, clear the product name if it doesn't start with "Motor" or "Health"
//     }
//   }
//   onResponseSelected(response: PolicyResponse[]) {
//       this.response = response;
    
    
//   }



// }
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MotorClaimIntimationComponent } from '../components/motor-claim-intimation/motor-claim-intimation.component';
import { HeaderComponent } from '../components/header/header.component';
import { MainContentComponent, PolicyResponse } from '../components/main-content/main-content.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../services/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HealthClaimIntimationComponent } from '../components/health-claim-intimation/health-claim-intimation.component';
import { DevAPITokenService } from '../services/DevAPIToken.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../components/custom-modal/custom-modal.component';
import { DummyPageComponent } from '../components/dummy-page/dummy-page.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MotorClaimIntimationComponent,
    HeaderComponent,
    MainContentComponent,
    DummyPageComponent,
    HttpClientModule,
    FormsModule,
    HealthClaimIntimationComponent,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    DialogAnimationsExampleDialog,
  ],
  providers: [DevAPITokenService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true
})
export class AppComponent {
  title = 'claimIntimation';
  productName: string = ''; // Store the received product name (LOB)
  response: PolicyResponse[] | null = null; // Store the claim response
  isLoading = false;

  constructor(
    private loaderService: LoaderService,
    private router: Router
  ) {
    this.loaderService.spinner$.subscribe((data: boolean) => {
      this.isLoading = data;
    });
  }
  
  // // Handle LOB (Line of Business) selection and route navigation
  // onLobSelected(lob: string) {
  //   console.log("I am from app component ts " +lob);
  //   if (lob.startsWith('Motor')) {
  //     this.productName = 'Motor';
    
  //     this.router.navigate(['/motor-claim'], { state: { response: this.response } });
  //   } else if (lob.startsWith('Health')) {
  //     this.productName = 'Health';
  //     this.router.navigate(['/health-claim'], { state: { response: this.response } });
  //   } else {
  //     this.productName = '';
  //     this.router.navigate(['/']); // Default route
  //   }
  // }

  // // Store the response data emitted from the child component
  // onResponseSelected(response: PolicyResponse[]) {
  //   this.response = response;
  // }
}
