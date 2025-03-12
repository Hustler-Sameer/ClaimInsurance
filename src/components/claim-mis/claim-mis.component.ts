import { Component, OnInit, Renderer2 } from "@angular/core";
import { LoaderService } from "../../services/loader.service";
import {  Router, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import {  ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "../custom-modal/custom-modal.component";
import { RedirectionService } from "../../services/Redirection.service";
import { Table2Component } from "../table2/table2.component";

@Component({
  selector: "app-claim-mis",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    DialogAnimationsExampleDialog,
    HeaderComponent,
    RouterOutlet,
    Table2Component
  ],
  templateUrl: "./claim-mis.component.html",
  styleUrl: "./claim-mis.component.css",
})
export class ClaimMisComponent implements OnInit{
  isLoading = false;
  theme : string ="";
  agentId: string = "";
  policyNo:string = "";
  title:string = "";
  constructor(
    private redirectionService : RedirectionService,
    private renderer: Renderer2,
    private loaderService:LoaderService
  ) {
    this.loaderService.spinner$.subscribe((data: boolean) => {
      this.isLoading = data;
    });
 
  }
    ngOnInit(): void {
      this.redirectionService.getSource().subscribe((source:string) => {
        this.theme = source;
      });
       this.redirectionService.getAgentId().subscribe((source:string)=>{
        this.agentId= source;
      })

      if(this.agentId!=null || this.agentId!="") {
        this.title = "Claim MIS";
      } else {
        this.title = "Claims Details";
      }

      this.redirectionService.getPolicyNo().subscribe((policyNo:string) => {
        this.policyNo = policyNo;
      });
      if(this.theme.toLocaleLowerCase() == "simba") {
        this.renderer.addClass(document.body, 'simba-portal');
        this.renderer.removeClass(document.body, 'customer-portal');
      } else if(this.theme == "customerportal"){
        this.renderer.addClass(document.body, 'customer-portal');
        this.renderer.removeClass(document.body, 'simba-portal');
      }
     
    }
}
