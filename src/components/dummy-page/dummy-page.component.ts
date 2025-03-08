import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { LoaderService } from "../../services/loader.service";
import { RedirectionService } from "../../services/Redirection.service";
import { Router,RouterOutlet } from "@angular/router";
// import { PolicyResponse } from "../main-content/main-content.component";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { StateService } from "../../services/SharedService.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { PolicyResponse } from "../../model/policyResponse";
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
    });
  }

  onSourceChange(source: string) {
    if (source === "Simba") {
      this.showClaimIntimation = true;
      this.showClaimMis = true;
      this.showViewClaimStatus = true;
      this.showClientId = true;
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
      if(formData.source != "Customer Portal"){
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
        policyNo: tokenResponse.policyNo
      };
      this.dbService.add('tokenApiData', dataToStore).subscribe(
        () => {
          console.log('Data stored successfully');
        },
        error => {
          console.error('Error storing data', error);
        }
      );
      if(formData.claimType != ("Claim MIS")){
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
  }
  else{
    const policyResponse: PolicyResponse[] = await this.http
        .post<PolicyResponse[]>(
          "https://ansappsuat.sbigen.in/Intimation/getPolicyDetailCustomerPortal",
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

  navigateBasedOnLOB(lob: string, formData : any) {
    if (lob.startsWith("Motor")) {
      this.router.navigate(["/intimation/motor-claim"]);
    } else if (lob.startsWith("Health")) {
      this.router.navigate(["/intimation/health-claim-submit"]);
    } else if (formData.claimType == "Claim MIS") {
      // console.warn("LOB not recognized:", lob);
      console.log("Claim Mis clicked")
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
