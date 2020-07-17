import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { sample } from './models/sample';
import { companyData } from './models/company';
import { stockPrice } from './models/stock-price';
import { companyProfile } from './models/company-prof';
import { compStats } from './models/comp-stats';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  searchUrl: string;
  private companyName = new Subject<string>();
  compName$ = this.companyName.asObservable();

  constructor(private http: HttpClient) { }

  sendCompanyName(name: string){
    this.companyName.next(name);
  }


  liveNews(){
    this.searchUrl = "https://finnhub.io/api/v1/news?category=general&token=brrm26vrh5ranontaov0"
    return this.http.get(this.searchUrl);
  }

  covidLive():Observable<sample>{
    this.searchUrl = "https://api.covid19api.com/summary"
    return this.http.get<sample>(this.searchUrl, httpOptions);
  }

  covidCountry(country:string){
    this.searchUrl = "https://api.covid19api.com/total/country/"+country+
    "/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-07-04T00:00:00Z";
    return this.http.get(this.searchUrl, httpOptions);
  }

  getCompanies(): Observable<companyData[]>{
    this.searchUrl = "https://cloud.iexapis.com/stable/ref-data/region/IN/symbols?token=pk_be94950584de42839d9550c273df5c5f"
    return this.http.get<companyData[]>(this.searchUrl);
  }

  compStockPrice(name: string): Observable<stockPrice>{
    this.searchUrl = "https://cloud.iexapis.com/stable/stock/"+name+"/quote?token=pk_be94950584de42839d9550c273df5c5f"
    return this.http.get<stockPrice>(this.searchUrl);
  }

  compProfile(symbol: string): Observable<companyProfile>{
    this.searchUrl = "https://cloud.iexapis.com/stable/stock/"+symbol+"/company?token=pk_be94950584de42839d9550c273df5c5f"
    return this.http.get<companyProfile>(this.searchUrl);
  }

  compHistory(symbol: string, period: string){
    this.searchUrl = "https://cloud.iexapis.com/stable/stock/"+symbol+"/chart/"+period+"?token=pk_be94950584de42839d9550c273df5c5f"
    return this.http.get(this.searchUrl);
  }

  compStats(symbol: string) : Observable<compStats>{
    this.searchUrl = "https://cloud.iexapis.com/stable/stock/"+symbol+"/stats?token=pk_be94950584de42839d9550c273df5c5f"
    return this.http.get<compStats>(this.searchUrl);
  }

  
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
