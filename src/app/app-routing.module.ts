import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockMainComponent } from './stock-main/stock-main.component';
import { CovidMainComponent } from './covid-main/covid-main.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockDetailChildComponent } from './stock-detail-child/stock-detail-child.component';
import { StockOutletComponent } from './stock-outlet/stock-outlet.component';
import { CompResolverService } from './comp-resolver.service';
import { CompProfService } from './comp-prof.service';
import { BasicsResolverService } from './basics-resolver.service';


const routes: Routes = [
  {
    path: '' , redirectTo: "/stock/main", pathMatch: "full"
  },
  {
    path: 'covid', component: CovidMainComponent
  },
  {
    path: 'stock', component: StockOutletComponent,
    children:[
      {
        path: 'main',
        component: StockMainComponent,
      },
      {
        path: 'search',
        component: StockDetailsComponent
      }
    ]
  },
  {
    path: 'stock/:symbol',
    component: StockDetailChildComponent,
    resolve: { hnData: CompResolverService,
               hnProf: CompProfService,
               hnBasics: BasicsResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
