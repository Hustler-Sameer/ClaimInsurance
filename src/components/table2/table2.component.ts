// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-table2',
//   imports: [],
//   templateUrl: './table2.component.html',
//   styleUrl: './table2.component.css'
// })
// export class Table2Component {

// }

import { Component, OnDestroy, OnInit } from "@angular/core";
// import { Http, Response } from '@angular/http';
import { Subject } from "rxjs";


import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
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
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
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
        // Calling the DT trigger to manually render the table
        this.tableDataList = response;
        this.dtTrigger.next(null);
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // private extractData(res: Response) {
  //   const body = res.json();
  //   return body.data || {};
  // }
}

export interface tableData {
  customerName: string;
  customerMobileNo: string;
  customerEmailId: string;
  policyNo: string;
  intimationNo: string;
  lob: string;
}
