import { Component, ViewChild } from '@angular/core';
import { CreditCard } from '../models/cc';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CcService } from '../services/cc.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.css']
})
export class CcComponent {

  creditcards:CreditCard[]=[]; 

  creditCardMaximumAmount: number=0;
  creditCardMaximumInterest:number=0;

  constructor(private ccService:CcService){
    this.ccService.getcc().subscribe((data:CreditCard[])=>{
        this.creditcards=data;

        this.dataSource = new MatTableDataSource(this.creditcards);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;

        this.calculateMetrics();
    })
  }

  dataSource = new MatTableDataSource(this.creditcards);

  displayColumns:string[]= [
    'select',
    'id',
    'cardName',
    'bankName',
    'description',
    'maxCredit',
    'active',
    'annualFee',
    'interestRate',
    'introOffer',
    'recommendedCreditScore',
    'numberOfApplications',
    'createdDate',
    'termsAndConditions',
    'actions' 
  ];

  selection = new SelectionModel(true,[]);


@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  

  
selectHandler(row:CreditCard){
  this.selection.toggle(row as never);
  }
  
calculateMetrics(){

  this.creditCardMaximumAmount =this.creditcards.filter(card => card.maxCredit >3000).length;
  this.creditCardMaximumInterest =this.creditcards.filter(card => card.interestRate >6).length;


}

}
