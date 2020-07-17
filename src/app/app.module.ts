import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockMainComponent } from './stock-main/stock-main.component';
import { CovidMainComponent } from './covid-main/covid-main.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockDetailChildComponent } from './stock-detail-child/stock-detail-child.component';
import { StockOutletComponent } from './stock-outlet/stock-outlet.component';

@NgModule({
  declarations: [
    AppComponent,
    StockMainComponent,
    CovidMainComponent,
    StockDetailsComponent,
    StockDetailChildComponent,
    StockOutletComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
