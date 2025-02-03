

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Config } from "datatables.net";
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: "app-table2",
  imports: [FormsModule,DataTablesModule],
  templateUrl: "./table2.component.html",
  styleUrl: "./table2.component.css",
})
export class Table2Component implements OnInit {
  dtOptions: Config={};
  dtTrigger: Subject<any> = new Subject<any>();
  tableDataList!:tableData[];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
    };
    this.http
      .get<tableData[]>(
        "https://ansappsuat.sbigen.in/Intimation/getPolicyIntimations"
      ).subscribe((response:tableData[]) => {
        this.tableDataList = response;
        this.dtTrigger.next(null);
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

export interface tableData {
  customerName: string;
  customerMobileNo: string;
  customerEmailId: string;
  policyNo: string;
  intimationNo: string;
  lob: string;
}
