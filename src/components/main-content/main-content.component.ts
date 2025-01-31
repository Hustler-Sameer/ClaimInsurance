import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { LoaderService } from "../../services/loader.service";
import { DevAPITokenService } from "../../services/DevAPIToken.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
  // Corrected the property name
  imports: [TableComponent]
})
export class MainContentComponent implements OnDestroy {
  // Component logic here
  policyNumber: string = '';
  lob:string="";
  private devAPIToken:any;
  constructor(private http: HttpClient, private loadingService: LoaderService , private DevAPITokenService:DevAPITokenService,private router: Router,    private dialog: MatDialog) {}
  @Output() responseSelected = new EventEmitter<PolicyResponse[]>(); 
  @Output() lobSelected = new EventEmitter<string>(); // passing component to parent element



  ngOnDestroy(): void {
    if (this.devAPIToken) {
      clearInterval(this.devAPIToken);
    }
  }

  searchPolicy() {
    this.loadingService.showSpinner();
    // this.fetchToken();

    this.devAPIToken = setInterval(() => {
      // this.fetchToken();
    }, 150000);
    
    
    this.http
      .post<PolicyResponse[]>(
        "https://ansappsuat.sbigen.in/Intimation/getIntimationPolicyDetails",
        this.policyNumber,
        {
          headers: { "Content-Type": "text/plain" },
        }
      )

      .subscribe(
        (response:PolicyResponse[]) => {
          console.log('Response ' + response);
          this.lob = response[0].lob;
          console.log("Product Name: ", this.lob);
          this.responseSelected.emit(response); 
          this.lobSelected.emit(this.lob); //
          // sending it to parent element
          this.navigateBasedOnLOB(this.lob);

          this.loadingService.hideSpinner();
        },  
        (error) => {
          console.log(error);
          this.loadingService.hideSpinner();
          this.dialog.open(DialogAnimationsExampleDialog, {
            width: "300px",
            data: {
              heading:"Error",
              claimNumber: "",
              remarks: error.error,
            },
          });
        }
      );
  }

  setPolicyNumber(e: any) {
    this.policyNumber = e.target.value;
  }

  navigateBasedOnLOB(lob: string) {
    if (lob.startsWith("Motor")) {
      this.router.navigate(["/motor-claim"]);
    } else if (lob.startsWith("Health")) {
      this.router.navigate(["/health-claim"]);
    } else {
      console.warn("LOB not recognized:", lob);
    }
  }
}


export interface PolicyResponse{
  policyNo:string,
  customerName:string,
  emailID:string,
  mobileNo:string,
  alternateMobileNo:string,
  alternateEmailId:string,
  policyStartDate:string,
  policyEndDate:string,
  productName:string,
  registrationNo:string,
  drivingLicenseNo:string,
  engineNo:string,
  chasisNo:string,
  lob:string,
  id:number
}
export interface policyMembers {
  memberId: number;
  name: string;
  policyNo: string;
}