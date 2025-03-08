import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Config } from "datatables.net";
import { DataTablesModule } from "angular-datatables";
import { LoaderService } from "../../services/loader.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";
import { RedirectionService } from "../../services/Redirection.service";
import { Router } from "@angular/router";

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
  token: string = "";
  constructor(
    private http: HttpClient,
    private loadingService: LoaderService,
    private dialog: MatDialog,
    private redirectionServvice: RedirectionService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
    };
    try {
      this.redirectionServvice.getToken().subscribe((token: string) => {
        this.token = token;
      });
      this.loadingService.showSpinner();
      this.http
        .post<tableData[]>(
          "https://ansappsuat.sbigen.in/Intimation/getPolicyIntimationsByRequestId",
          this.requesterId,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
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
            checkMotorClaimStatusObj,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .subscribe(
            (response) => {
              const claim = response[0][0];
              console.log("Response : " + response);
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
            (error: unknown) => {
              console.error("API error:", (error as HttpErrorResponse).status);
              const statusCode = (error as HttpErrorResponse).status;
              if (statusCode == 401) {
                this.route.navigate(["/"]);
                this.loadingService.hideSpinner();
              } else {
                this.loadingService.hideSpinner();
                this.dialog.open(DialogAnimationsExampleDialog, {
                  width: "300px",
                  data: {
                    heading: "Claim Status Details",
                    claimNumber: "Error Occured",
                    remarks: "",
                  },
                });
              }
            }
          );
      } catch (error) {
        console.error("Error occurred:", error);
        this.loadingService.hideSpinner();
      }
    } else if (data.lob == "Health") {
      try {
        const checkHealthClaimStatusObj: checkHealthClaimStatus = {
          requestId: this.requesterId,
          claimRefNo: data.intimationNo,
        };
        this.loadingService.showSpinner();
        this.http
          .post<any>(
            "https://ansappsuat.sbigen.in/Intimation/checkHealthStatus",
            checkHealthClaimStatusObj,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .subscribe(
            (response) => {
              console.log("Response : " + response[0]);
              const claim = response;
              this.claimStatus = claim.statusMessage;
              console.log(
                "Status from health claim status :" + this.claimStatus
              );
              this.loadingService.hideSpinner();

              this.dialog.open(DialogAnimationsExampleDialog, {
                width: "300px",
                data: {
                  heading: "Claim Status Details",
                  claimNumber: "Status : " + this.claimStatus,
                  remarks: "Remarks : ",
                },
              });
            },
            (error: unknown) => {
              console.error("API error:", (error as HttpErrorResponse).status);
              const statusCode = (error as HttpErrorResponse).status;
              if (statusCode == 401) {
                this.route.navigate(["/"]);
                this.loadingService.hideSpinner();
              } else {
                this.loadingService.hideSpinner();
                this.dialog.open(DialogAnimationsExampleDialog, {
                  width: "300px",
                  data: {
                    heading: "Claim Status Details",
                    claimNumber: "Error Occured",
                    remarks: "",
                  },
                });
              }
            }
          );
      } catch (error: unknown) {
        this.loadingService.hideSpinner();
        this.dialog.open(DialogAnimationsExampleDialog, {
          width: "300px",
          data: {
            heading: "Claim Status Details",
            claimNumber: "",
            remarks: "Remarks : " + (error as HttpErrorResponse).error,
          },
        });
      }
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

export interface checkHealthClaimStatus {
  requestId: string;
  claimRefNo: string;
}

export interface tableData {
  policyNo: string;
  intimationNo: string;
  intimationAmount: number;
  intimationDate: string;
  customerName: string;
}
