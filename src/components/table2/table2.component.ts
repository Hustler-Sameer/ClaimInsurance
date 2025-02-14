import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Config } from "datatables.net";
import { DataTablesModule } from "angular-datatables";
import { LoaderService } from "../../services/loader.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";

@Component({
  selector: "app-table2",
  imports: [FormsModule, DataTablesModule],
  templateUrl: "./table2.component.html",
  styleUrl: "./table2.component.css",
})
export class Table2Component implements OnInit {
  @Input() requesterId: string;
  claimStatus: string;
  claimStatusDescription: string;
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  tableDataList!: tableData[];
  constructor(
    private http: HttpClient,
    private loadingService: LoaderService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
    };
    try {
      this.loadingService.showSpinner();
      this.http
        .post<tableData[]>(
          "https://ansappsuat.sbigen.in/Intimation/getPolicyIntimationsByRequestId",
          this.requesterId,
          { headers: { "Content-Type": "application/json" } }
        )
        .subscribe((response: tableData[]) => {
          this.loadingService.hideSpinner();
          this.tableDataList = response;
          this.dtTrigger.next(null);
        });
    } catch (error: unknown) {
      console.log("Hey from error");
      this.loadingService.hideSpinner();
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  logRowDetails(data: any): void {
    console.log("Row details:", data);
    console.log("The lob is : ", data.lob);
    if (data.lob == "Motor") {
      console.log("Hit the motor claim api ");

      const checkMotorClaimStatusObj: checkMotorClaimStatus = {
        Policy_no: data.policyNo,
        Alternate_Policy_no: "",
        Claim_no: data.intimationNo,
        Vehicle_Registration_Number: "",
        requestID: this.requesterId,
      };
      try {
        this.loadingService.showSpinner();
        this.http
          .post<any>(
            "https://ansappsuat.sbigen.in/Intimation/checkMotorStatus",
            checkMotorClaimStatusObj
          )
          .subscribe(
            (response) => {
              const claim = response[0][0];
              console.log("The claim obj is", claim);

              // Directly assign the properties to avoid unnecessary JSON.stringify
              this.claimStatus = claim.ClaimStatus;
              this.claimStatusDescription = claim.Claim_Status_Description;

              console.log(this.claimStatus, "This is claimStatuss");
              console.log("Claim Description", this.claimStatusDescription);

              this.loadingService.hideSpinner();

              this.dialog.open(DialogAnimationsExampleDialog, {
                width: "300px",
                data: {
                  heading: "Claim Status Details",
                  claimNumber: "Status : " + this.claimStatus,
                  remarks: "Remarks : " + this.claimStatusDescription,
                },
              });
            },
            (error) => {
              console.error("API error:", error);
              this.loadingService.hideSpinner();
            }
          );
      } catch (error) {
        console.error("Error occurred:", error);
        this.loadingService.hideSpinner();
      }
    }
    else if (data.lob == "Health" ){
      
      this.dialog.open(DialogAnimationsExampleDialog, {
        width: "300px",
        data: {
          heading: "Sorry the service is down",
          claimNumber: "",
          remarks: "",
        },
      });

    }
  }
}

export interface checkMotorClaimStatus {
  Policy_no: string;
  Alternate_Policy_no: string;
  Claim_no: string;
  Vehicle_Registration_Number: string;
  requestID: string;
}
export interface tableData {
  policyNo: string;
  intimationNo: string;

  intimationAmount: number;
  intimationDate: string;
  customerName: string;
  // customerMobileNo: string;
  // customerEmailId: string;

  // intimationNo: string;
  // lob: string;
}
