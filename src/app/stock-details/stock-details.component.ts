import { Component, OnInit } from '@angular/core';
import { StockServiceService } from '../stock-service.service';
import { companyData } from '../models/company';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  company: companyData[] = [];
  startIndex = 0;
  endIndex = 100;

  _compFilter: string;
  get compFilter(): string{
    return this._compFilter;
  }
  set compFilter(value: string){
    this._compFilter = value;
    this.companyInfo = this.compFilter ? this.performFilter(this.compFilter) : this.company;
  }

  companyInfo: companyData[];
  constructor(private stocService: StockServiceService, private router: Router) { 
    this.companyInfo = this.company;
    this.compFilter = 'Search Stocks';
  }

  ngOnInit(): void {
    console.log("Hola");
    this.stocService.getCompanies().subscribe(
      (data) => {
        this.company = data;
        console.log(data);
      }
    )
    /*this.stocService.getExchanges().subscribe(
      (data) => {
        console.log(data);
      })*/
   
  }

  performFilter(filterBy: string){
    filterBy = filterBy.toLocaleLowerCase();
    return this.company.filter((company : companyData) => 
          company.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  getArrayFromNumber(length){
    return new Array(Math.ceil(length/100));
  }  

  updateIndex(pageIndex){
    this.startIndex = pageIndex*100;
    this.endIndex = this.startIndex+100;
  }

  /*companyLook(comp: any){
    this.stocService.sendCompanyName(comp.symbol);
    this.router.navigate(['/stock/profile']);
  }*/

}
