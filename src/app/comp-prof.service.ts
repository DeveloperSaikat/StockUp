import { Injectable } from '@angular/core';
import { companyProfile } from './models/company-prof';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { StockServiceService } from './stock-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompProfService implements Resolve<companyProfile>{

  constructor(private hnService: StockServiceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<companyProfile> {
    return this.hnService.compProfile(route.paramMap.get('symbol'));
  }
  
}
