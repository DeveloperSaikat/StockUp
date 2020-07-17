import { Injectable } from '@angular/core';
import { StockServiceService } from './stock-service.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { stockPrice } from './models/stock-price';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompResolverService implements Resolve<stockPrice>{

  constructor(private hnService: StockServiceService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<stockPrice> {
    return this.hnService.compStockPrice(route.paramMap.get('symbol'));
  }

}
