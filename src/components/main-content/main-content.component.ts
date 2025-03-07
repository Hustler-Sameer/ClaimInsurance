import { Component, EventEmitter, OnInit, Output, Renderer2 } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "../../services/loader.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";
import { Table2Component } from "../table2/table2.component";
import { CommonModule } from "@angular/common";
import { PolicyResponse } from "../../model/policyResponse";
import { RequesterIdService } from "../../services/RequesterId.service";
import { SourceService } from "../../services/Source.service";
import { PolicyNumberService } from "../../services/PolicyNumber.service";
import { RedirectionService } from "../../services/Redirection.service";

export type { PolicyResponse } from "../../model/policyResponse";
@Component({
  selector: "app-main-content",
  templateUrl: "./main-content.component.html",
  styleUrls: ["./main-content.component.css"],

  imports: [Table2Component, CommonModule],
})
export class MainContentComponent implements OnInit {
  policyNumber: string = "";
  lob: string = "";
  requesterId: string = "";
  token:string="";

  showTable: boolean = true;
  ngOnInit(): void {
    this.showTable = true;

    this.route.queryParams.subscribe((params) => {
      this.requesterId = params["requestId"];
      const theme = params["source"].toLowerCase();
      this.sourceService.setSource(theme);
      console.log("Source has been set");
      if(theme == "simba"){
        this.renderer.addClass(document.body, 'simba-portal');
        this.renderer.removeClass(document.body, 'customer-portal');
      }
      else if(theme == "customerportal"){
        this.renderer.addClass(document.body, 'customer-portal');
        this.renderer.removeClass(document.body, 'simba-portal');

      }
      if(this.requesterId){
        console.log("The request id set is ", this.requesterId);
        this.requesterId1.emit(this.requesterId);
        this.requesterIdService.setRequesterId(this.requesterId);
        console.log("Request id has been set");
      }
      

      
    });
  }
  

  constructor(
    private http: HttpClient,
    private loadingService: LoaderService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private requesterIdService : RequesterIdService,
    private renderer: Renderer2,
    private sourceService: SourceService,
    private policyNumberService: PolicyNumberService,
    private redirectionServvice:RedirectionService
  ) {
    this.route.params.subscribe(() => {
      this.showTable = true;
    });
  }
  @Output() requesterId1 = new EventEmitter<string>();
  @Output() responseSelected = new EventEmitter<PolicyResponse[]>();
  @Output() lobSelected = new EventEmitter<string>(); // passing component to parent element
  searchPolicy() {
    this.policyNumberService.getPolicyNumber().subscribe((policyNumber:string) => {
      this.policyNumber = policyNumber;
    })

    this.redirectionServvice.getToken().subscribe((token:string) => {
        this.token = token;
    })

    this.loadingService.showSpinner();
    this.showTable = false;
    this.http
      .post<PolicyResponse[]>(
        "https://ansappsuat.sbigen.in/Intimation/getIntimationPolicyDetails",
        this.policyNumber,
        {
          headers: { 
            "Content-Type": "text/plain" ,
            "Authorization":`Bearer ${this.token}`
          },
        }
      )
      .subscribe(
        (response: PolicyResponse[]) => {
          console.log("Response " + response);
          this.lob = response[0].lob;
          console.log("Product Name: ", this.lob);
          this.responseSelected.emit(response);
          this.lobSelected.emit(this.lob); //
          // sending it to parent element
          // this.navigateBasedOnLOB(this.lob);

          this.loadingService.hideSpinner();
        },
        (error) => {
          console.log(error);
          this.loadingService.hideSpinner();
          this.dialog.open(DialogAnimationsExampleDialog, {
            width: "300px",
            data: {
              heading: "Error",
              claimNumber: "",
              remarks: error.error,
            },
          });
        }
      );
  }

  setPolicyNumber(e: any) {
    // this.policyNumber = e.target.value;
    this.policyNumberService.setPolicyNumber(e.target.value);
  }

  navigateBasedOnLOB(lob: string) {
    if (lob.startsWith("Motor")) {
      this.router.navigate(["/motor-claim"]);
    } else if (lob.startsWith("Health")) {
      this.router.navigate(["/health-claim-submit"]);
    } else {
      console.warn("LOB not recognized:", lob);
    }
  }
}
