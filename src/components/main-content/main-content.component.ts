import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "../../services/loader.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";
import { Table2Component } from "../table2/table2.component";
import { CommonModule } from "@angular/common";
import { PolicyResponse } from "../../model/policyResponse";
import { policyMembers } from "../../model/policyMembers";
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],

  imports: [Table2Component, CommonModule]
})
export class MainContentComponent implements OnInit {
  policyNumber: string = '';
  lob:string="";
  showTable:boolean = true;
  ngOnInit(): void {
      this.showTable = true;
  }
  constructor(private http: HttpClient, private loadingService: LoaderService ,private router: Router, private dialog: MatDialog , private route:ActivatedRoute) {
    this.route.params.subscribe(()=>{
      this.showTable = true;
    })
  }
  @Output() responseSelected = new EventEmitter<PolicyResponse[]>(); 
  @Output() lobSelected = new EventEmitter<string>(); // passing component to parent element
  searchPolicy() {
    this.loadingService.showSpinner();
      this.showTable = false;
      this.http
      .post<PolicyResponse[]>(
        "https://ansappsuat.sbigen.in/Intimation/getIntimationPolicyDetails",
        this.policyNumber,
        {
          headers: { "Content-Type": "text/plain" },
        }
      ).subscribe(
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



