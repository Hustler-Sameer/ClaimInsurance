import { CommonModule } from "@angular/common";
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { LoaderService } from "../../services/loader.service";
import { RedirectionService } from "../../services/Redirection.service";
import { Router, RouterOutlet } from "@angular/router";
// import { PolicyResponse } from "../main-content/main-content.component";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { StateService } from "../../services/SharedService.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { PolicyResponse } from "../../model/policyResponse";
import {
  checkHealthClaimStatus,
  checkMotorClaimStatus,
} from "../table2/table2.component";
@Component({
  selector: "app-dummy-page",
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  templateUrl: "./dummy-page.component.html",
  styleUrl: "./dummy-page.component.css",
})
export class DummyPageComponent implements OnInit {
  form: FormGroup;
  showClaimIntimation = false;
  showClaimMis = false;
  showViewClaimStatus = false;
  showClientId = false;
  lob: string = "";
  isLoading = false;
  showPolicyNumber = true;
  showPolicyType = false;
  agentId = "";
  claimStatus = "";
  claimStatusDescription:"";
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loaderService: LoaderService,
    private redirectionService: RedirectionService,
    private router: Router,
    private dialog: MatDialog,
    private stateService: StateService,
    private dbService: NgxIndexedDBService
  ) {
    this.loaderService.spinner$.subscribe((data: boolean) => {
      this.isLoading = data;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      source: [""],
      claimType: [""],
      clientId: [""],
      userId: [""],
      policyNo: [""],
      policyType: [""],
    });
  }

  onSourceChange(source: string) {
    if (source === "Simba") {
      this.showClaimIntimation = true;
      this.showClaimMis = true;
      this.showViewClaimStatus = false;
      this.showClientId = true;
      this.showPolicyType = false;
    } else if (source === "Customer Portal") {
      this.showClaimIntimation = true;
      this.showClaimMis = false;
      this.showViewClaimStatus = true;
      this.showClientId = false;
    }
  }
  onClaimTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const claimType = selectElement.value;

    if (claimType === "Claim MIS") {
      console.log("Disable policy wala option");
      this.showPolicyNumber = false;
    }
    if (this.form.value.claimType === "Claim Intimation") {
      this.showPolicyType = false;
    }
    if (
      this.form.value.source === "Customer Portal" &&
      claimType === "View Claim Status"
    ) {
      console.log("Hehe implemented logic");
      this.showPolicyType = true;
    }
  }
  onPolicyTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const policyType = selectElement.value;
    console.log(policyType);
  }

  onSubmit: any = async () => {
    const formData = this.form.value;
    console.log(formData);
    this.redirectionService.setNavigationService(formData.claimType);

    const policyNo1 = this.form.value.policyNo;
    const requestBody: requestBody = {
      clientId: formData.clientId,
      agentId: formData.userId, // Assuming userId is the agentId
      source: formData.source,
      policyNo: formData.policyNo,
    };

    console.log(requestBody);
    this.loaderService.showSpinner();

    try {
      // Fetch token
      if (formData.source != "Customer Portal") {
        const tokenResponse: any = await this.http
          .post("https://ansappsuat.sbigen.in/Intimation/getToken", requestBody)
          .toPromise();
        console.log("Token Response:", tokenResponse);
        const token = tokenResponse.token;
        this.handleResponse(tokenResponse, formData);

        const dataToStore = {
          token: tokenResponse.token,
          clientId: tokenResponse.clientId,
          agentId: tokenResponse.agentId,
          source: tokenResponse.source,
          policyNo: tokenResponse.policyNo,
        };
        this.dbService.add("tokenApiData", dataToStore).subscribe(
          () => {
            console.log("Data stored successfully");
          },
          (error) => {
            console.error("Error storing data", error);
          }
        );
        if (formData.claimType != "Claim MIS") {
          const policyResponse: PolicyResponse[] = await this.http
            .post<PolicyResponse[]>(
              "https://ansappsuat.sbigen.in/Intimation/getIntimationPolicyDetails",
              policyNo1,
              {
                headers: {
                  "Content-Type": "text/plain",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .toPromise();

          this.stateService.response = policyResponse;
          console.log("Policy Response:", policyResponse);
          this.lob = policyResponse[0].lob;
          console.log("This is lob here:", this.lob);

          this.navigateBasedOnLOB(this.lob, formData.claimType);
        }
        // if (formData.claimType == "Claim Intimation") {
        //   console.log("Redirect to claim Intimation age");
        //   this.router.navigate(["/claim-mis-test"]);
        // }
      } else {
        if (formData.claimType === "Claim Intimation") {
          const policyResponse: PolicyResponse[] = await this.http
            .post<PolicyResponse[]>(
              "https://ansappsuat.sbigen.in/Intimation/CustomerPortal/getPolicyDetails",
              policyNo1,
              {
                headers: {
                  "Content-Type": "text/plain",
                },
              }
            )
            .toPromise();

          this.stateService.response = policyResponse;
          console.log("Policy Response:", policyResponse);
          this.lob = policyResponse[0].lob;
          console.log("This is lob here:", this.lob);

          this.navigateBasedOnLOB(this.lob, formData.claimType);
        } else if (formData.claimType === "View Claim Status") {
          console.log("Hiting api of check claim Status");
          console.log(formData);
          if (formData.policyType === "Motor Policy") {
            console.log("hh");
            this.loaderService.showSpinner();
            try {
              const response = await this.http
                .post<any>(
                  "https://ansappsuat.sbigen.in/Intimation/CustomerPortal/getMotorIntimationDetails",
                  formData.policyNo,
                  {
                    headers: {
                      "Content-Type": "text/plain",
                    },
                  }
                )
                .toPromise();
              console.log(response);
                 this.redirectionService.getAgentId().subscribe((id: string) => {
                this.agentId = id;
              });
              // now hit the api for motor status
              const checkMotorClaimStatusObj: checkMotorClaimStatus = {
                Policy_no: response.policyNo,
                Alternate_Policy_no: "",
                Claim_no: response.intimationNo,
                Vehicle_Registration_Number: "",
                requestID: "123456",
              };

              this.loaderService.showSpinner();

              try {
                const response = await this.http
                  .post<any>(
                    "https://ansappsuat.sbigen.in/Intimation/CustomerPortal/checkMotorStatus",
                    checkMotorClaimStatusObj,
                    {
                      headers: {
                        "Content-Type": "application/json",
                       
                      },
                    }
                  )
                  .toPromise();

                const claim = response[0][0];
                console.log("Response : " + response);
                console.log("The claim obj is", claim);

                // Directly assign the properties to avoid unnecessary JSON.stringify
                this.claimStatus = claim.ClaimStatus;
                this.claimStatusDescription = claim.Claim_Status_Description;

                console.log(this.claimStatus, "This is claimStatuss");
                console.log("Claim Description", this.claimStatusDescription);

                this.dialog.open(DialogAnimationsExampleDialog, {
                  width: "300px",
                  data: {
                    heading: "Claim Status Details",
                    claimNumber: "Status : " + this.claimStatus,
                    remarks: "Remarks : " + this.claimStatusDescription,
                  },
                });
              } catch (error: unknown) {
                console.error(
                  "API error:",
                  (error as HttpErrorResponse).status
                );
                const statusCode = (error as HttpErrorResponse).status;

                if (statusCode == 401) {
                  this.router.navigate(["/"]);
                } else {
                  this.dialog.open(DialogAnimationsExampleDialog, {
                    width: "300px",
                    data: {
                      heading: "Claim Status Details",
                      claimNumber: "Error Occured",
                      remarks: "",
                    },
                  });
                }
              } finally {
                this.loaderService.hideSpinner();
              }
            } catch (error: unknown) {
              console.log(error);
            }
          } else if (formData.policyType === "Health Policy") {
            this.redirectionService.getAgentId().subscribe((id: string) => {
              this.agentId = id;
            });
            const checkHealthClaimStatusObj: checkHealthClaimStatus = {
              requestId: this.agentId,
              claimRefNo: formData.policyNo,
            };

            this.loaderService.showSpinner();

            try {
              const response = await this.http
                .post<any>(
                  "https://ansappsuat.sbigen.in/Intimation/CustomerPortal/checkHealthStatus",
                  checkHealthClaimStatusObj,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .toPromise();

              console.log("Response : " + response[0]);
              const claim = response;
              this.claimStatus = claim.statusMessage;
              console.log(
                "Status from health claim status :" + this.claimStatus
              );
              this.loaderService.hideSpinner();

              this.dialog.open(DialogAnimationsExampleDialog, {
                width: "300px",
                data: {
                  heading: "Claim Status Details",
                  claimNumber: "Status : " + this.claimStatus,
                  remarks: "Remarks : ",
                },
              });
            } catch (error: unknown) {
              console.error("API error:", (error as HttpErrorResponse).status);
              const statusCode = (error as HttpErrorResponse).status;
              this.loaderService.hideSpinner();

              if (statusCode == 401) {
                this.router.navigate(["/"]);
              } else {
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
          }

          // this.dialog.open(DialogAnimationsExampleDialog, {
          //   width: "300px",
          //   data: {
          //     heading: "",
          //     claimNumber: "",
          //     remarks: "",
          //   },
          // });
        }

        //else ends here
      }
    } catch (error) {
      console.error("Error:", error);

      this.dialog.open(DialogAnimationsExampleDialog, {
        width: "300px",
        data: {
          heading: "Error",
          claimNumber: "",
          remarks: error.error,
        },
      });
    } finally {
      this.loaderService.hideSpinner();
    }
  };

  navigateBasedOnLOB(lob: string, formData: any) {
    if (lob.startsWith("Motor")) {
      this.router.navigate(["/intimation/motor-claim"]);
    } else if (lob.startsWith("Health")) {
      this.router.navigate(["/intimation/health-claim-submit"]);
    } else if (formData.claimType == "Claim MIS") {
      // console.warn("LOB not recognized:", lob);
      console.log("Claim Mis clicked");
      // this.router.navigate(["/claim-mis-test"]);
    }
  }

  handleResponse(response: any, formData: any) {
    // Process the response data as needed
    const token = response.token;
    const clientId = response.clientId;
    const agentId = response.agentId;
    const source = response.source;
    const policyNo = response.policyNo;
    this.redirectionService.setToken(token);
    this.redirectionService.setAgentId(agentId);
    this.redirectionService.setclientId(clientId);
    this.redirectionService.setSource(source);
    this.redirectionService.setPolicyNo(policyNo);
    this.redirectionService.getToken().subscribe((value) => {
      console.log("Token : ", value);
    });
    console.log("Client ID:", clientId);
    console.log("Agent ID:", agentId);
    console.log("Source:", source);
    console.log("Policy No:", policyNo);

    if (formData.claimType == "Claim MIS") {
      this.router.navigate(["/claim-mis-test"]);
    }
    if (formData.claimType == "View Claim Status") {
      console.log("Redirect to claim status");
    }
  }
}

export interface requestBody {
  clientId: string;
  agentId: string;
  source: string;
  policyNo: string;
}
