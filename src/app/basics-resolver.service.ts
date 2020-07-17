import { Injectable } from '@angular/core';
import { compStats } from './models/comp-stats';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StockServiceService } from './stock-service.service';

@Injectable({
  providedIn: 'root'
})
export class BasicsResolverService implements Resolve<compStats>{

  constructor(private hnService: StockServiceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<compStats> {
    return this.hnService.compStats(route.paramMap.get('symbol'));
  }

}
