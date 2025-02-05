import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Config } from "datatables.net";
import { DataTablesModule } from "angular-datatables";
import { LoaderService } from "../../services/loader.service";

@Component({
  selector: "app-table2",
  imports: [FormsModule, DataTablesModule],
  templateUrl: "./table2.component.html",
  styleUrl: "./table2.component.css",
})
export class Table2Component implements OnInit {
  @Input() requesterId: string;
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  tableDataList!: tableData[];
  constructor(private http: HttpClient,private loadingService: LoaderService) {}
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
      
    } catch (error:unknown) {
      console.log("Hey from error");
      this.loadingService.hideSpinner();
    }
    
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  logRowDetails(data: tableData): void {
    console.log("Row details:", data);
  }
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
