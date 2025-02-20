// import { ChangeDetectorRef, Component } from '@angular/core';
// import { AfterViewInit, ViewChild } from '@angular/core';
// import { PageEvent } from '@angular/material/paginator';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';

// @Component({
//   selector: 'app-table',
//   imports: [MatTableModule, MatPaginatorModule],
//   templateUrl: './table.component.html',
//   styleUrl: './table.component.css'
// })
// export class TableComponent implements AfterViewInit {

//   pageSize: number = 5;

//   displayedColumns: string[] = [
//     'position',
//     'claimNumber',
//   'policyNumber',
//   'customerName',
//   'customerMobileNumber',
//   'customerEmailId',
//   ];
//   dataSource = new MatTableDataSource<TableElement>(ELEMENT_DATA);
//   constructor( private cdr: ChangeDetectorRef);
//   @ViewChild(MatPaginator) paginator: MatPaginator;

//   ngAfterViewInit() {
//     if(this.paginator){
//     this.dataSource.paginator = this.paginator;  }
//     this.cdr.detectChanges();
//   }

//   pageEvent(pageEvent: PageEvent){
//     this.pageSize = +pageEvent.pageSize;
//   }
 
// }
// export interface TableElement { 
//   position: number;
//   claimNumber: String;
//   policyNumber: string;
//   customerName: string;
//   customerMobileNumber: string;
//   customerEmailId:string
// }

// const ELEMENT_DATA: TableElement[] = [
//   {
//     position: 1,
//     claimNumber: 'Hydrogen',
//     policyNumber: 'sdad',
//     customerName: 'Sameer',
//     customerMobileNumber: '932879432',
//     customerEmailId:"Sameerkurkure@test.com"
//   },
//   {
//     position: 2,
//     claimNumber: 'Hydrogen',
//     policyNumber: 'sdad',
//     customerName: 'Sameer',
//     customerMobileNumber: '932879432',
//     customerEmailId:"Sameerkurkure@test.com"
//   },
  // {
  //   position: 3,
  //   claimNumber: 'Hydrogen',
  //   policyNumber: 'sdad',
  //   customerName: 'Sameer',
  //   customerMobileNumber: '932879432',
  //   customerEmailId:"Sameerkurkure@test.com"
  // },
  // {
  //   position: 4,
  //   claimNumber: 'Hydrogen',
  //   policyNumber: 'sdad',
  //   customerName: 'Sameer',
  //   customerMobileNumber: '932879432',
  //   customerEmailId:"Sameerkurkure@test.com"
  // },
  // {
  //   position: 5,
  //   claimNumber: 'Hydrogen',
  //   policyNumber: 'sdad',
  //   customerName: 'Sameer',
  //   customerMobileNumber: '932879432',
  //   customerEmailId:"Sameerkurkure@test.com"
  // },
  // {
  //   position: 6,
  //   claimNumber: 'Hydrogen',
  //   policyNumber: 'sdad',
  //   customerName: 'Sameer',
  //   customerMobileNumber: '932879432',
  //   customerEmailId:"Sameerkurkure@test.com"
  // },
  // {
  //   position: 7,
  //   claimNumber: 'Hydrogen',
  //   policyNumber: 'sdad',
  //   customerName: 'Sameer',
  //   customerMobileNumber: '932879432',
  //   customerEmailId:"Sameerkurkure@test.com"
  // },
  // {
  //   position: 8,
  //   claimNumber: 'Hydrogen',
  //   policyNumber: 'sdad',
  //   customerName: 'Sameer',
  //   customerMobileNumber: '932879432',
  //   customerEmailId:"Sameerkurkure@test.com"
  // },
  // {
  //   position: 9,
  //   claimNumber: 'Hydrogen',
  //   policyNumber: 'sdad',
  //   customerName: 'Sameer',
  //   customerMobileNumber: '932879432',
  //   customerEmailId:"Sameerkurkure@test.com"
  // },


// ];



import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements AfterViewInit {
  pageSize: number = 5;
 
  displayedColumns: string[] = [
    'position',
    'claimNumber',
    'policyNumber',
    'customerName',
    'customerMobileNumber',
    'customerEmailId',
  ];
  dataSource = new MatTableDataSource<TableElement>(ELEMENT_DATA);
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
  pageEvent(event: any) {
    this.pageSize = +event.pageSize;
  }
}
 
export interface TableElement {
  position: number;
  claimNumber: string;
  policyNumber: string;
  customerName: string;
  customerMobileNumber: string;
  customerEmailId: string;
}
 
const ELEMENT_DATA: TableElement[] = [
  {
    position: 1,
    claimNumber: '12345',
    policyNumber: 'ABC123',
    customerName: 'John Doe',
    customerMobileNumber: '9876543210',
    customerEmailId: 'john.doe@example.com',
  },
  {
    position: 2,
    claimNumber: '54321',
    policyNumber: 'XYZ789',
    customerName: 'Jane Smith',
    customerMobileNumber: '8765432109',
    customerEmailId: 'jane.smith@example.com',
  },
  {
    position: 3,
    claimNumber: 'Hydrogen',
    policyNumber: 'sdad',
    customerName: 'Sameer',
    customerMobileNumber: '932879432',
    customerEmailId:"Sameerkurkure@test.com"
  },
  {
    position: 4,
    claimNumber: 'Hydrogen',
    policyNumber: 'sdad',
    customerName: 'Sameer',
    customerMobileNumber: '932879432',
    customerEmailId:"Sameerkurkure@test.com"
  },
  {
    position: 5,
    claimNumber: 'Hydrogen',
    policyNumber: 'sdad',
    customerName: 'Sameer',
    customerMobileNumber: '932879432',
    customerEmailId:"Sameerkurkure@test.com"
  },
  {
    position: 6,
    claimNumber: 'Hydrogen',
    policyNumber: 'sdad',
    customerName: 'Sameer',
    customerMobileNumber: '932879432',
    customerEmailId:"Sameerkurkure@test.com"
  },
  {
    position: 7,
    claimNumber: 'Hydrogen',
    policyNumber: 'sdad',
    customerName: 'Sameer',
    customerMobileNumber: '932879432',
    customerEmailId:"Sameerkurkure@test.com"
  },
  {
    position: 8,
    claimNumber: 'Hydrogen',
    policyNumber: 'sdad',
    customerName: 'Sameer',
    customerMobileNumber: '932879432',
    customerEmailId:"Sameerkurkure@test.com"
  },
  {
    position: 9,
    claimNumber: 'Hydrogen',
    policyNumber: 'sdad',
    customerName: 'Sameer',
    customerMobileNumber: '932879432',
    customerEmailId:"Sameerkurkure@test.com"
  },
];

 