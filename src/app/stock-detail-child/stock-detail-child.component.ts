import { Component, OnInit} from '@angular/core';
import { StockServiceService } from '../stock-service.service';
import { stockPrice } from '../models/stock-price';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { companyProfile } from '../models/company-prof';
import { compStats } from '../models/comp-stats';

@Component({
  selector: 'app-stock-detail-child',
  templateUrl: './stock-detail-child.component.html',
  styleUrls: ['./stock-detail-child.component.css']
})
export class StockDetailChildComponent implements OnInit {
  compName: string = "";
  price: stockPrice;
  filtersLoaded: Promise<boolean>;
  data: stockPrice;
  profile: companyProfile;
  dates = [];
  prices = [];
  stats : compStats;
  changePer: number = 0.00;
  oneMonth : number = 0.00;
  threeMonth: number = 0.00;
  sixMonth: number = 0.00;
  oneYear: number = 0.00;
  fiveYear: number = 0.00;
  changeColor: boolean = true;
  period: string = "";
  makeChange: boolean = false;
  negative: boolean = false;
  color : string = "";
  currentPrice: number;
  previousPrice: number;
  returns: number;
  
  constructor(private stockService: StockServiceService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.data = this._route.snapshot.data['hnData'];
    this.changePer = this.data.changePercent * 100;
    this.currentPrice = this.data.latestPrice;
    this.previousPrice = this.data.previousClose;
    this.returns = ((this.currentPrice - this.previousPrice) / this.previousPrice)*100;
    
    if(this.data.latestPrice - this.data.previousClose < 0){
      this.negative = true;
    }
    this.profile = this._route.snapshot.data['hnProf'];
    this.stats = this._route.snapshot.data['hnBasics'];
    this.stockService.compHistory(this._route.snapshot.params['symbol'], "5D").subscribe(
      (data:any[]) =>{
        for(let i = 0; i< data.length; i++){
          this.dates[i] = data[i].label;
          this.prices[i] = data[i].close;
        }
        if(this.prices[data.length -1] - this.prices[0] > 0){
          this.color = 'rgba(0, 255, 0, 0.356)';
        }
        else{
          this.color = 'rgb(255, 0, 0, 0.356)';
        }
        this.createChart();
      }
    )
    
    console.log(this.stats);
    this.oneMonth = this.stats.month1ChangePercent * 100;
    this.threeMonth = this.stats.month3ChangePercent * 100;
    this.sixMonth = this.stats.month6ChangePercent * 100;
    this.oneYear = this.stats.year1ChangePercent * 100;
    this.fiveYear = this.stats.year5ChangePercent * 100;
     
  }

  fetchChart(){
    this.stockService.compHistory(this._route.snapshot.params['symbol'], this.period).subscribe(
      (data:any[]) =>{
        for(let i = 0; i< data.length; i++){
          this.dates[i] = data[i].label;
          this.prices[i] = data[i].close;
        }
        this.createChart();
      }
    )
  }

  createChart(){
    const canvas = <HTMLCanvasElement> document.getElementById('canvasStock');
        const ctx = canvas.getContext('2d');
        var chartOfCompStocks = new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.dates,
              datasets: [{
                  label: 'Close Price',
                  data: this.prices,
                  backgroundColor: [
                      this.color
                  ],
                  borderColor: [
                      this.color
                  ],
                  borderWidth: 4,
                  pointBackgroundColor: 'rgba(0, 128, 0, 0.356)',
                  pointBorderColor: 'rgba(0, 128, 0, 0.356)',
                  pointBorderWidth: 5,
              }]
            },
            options: {
              maintainAspectRatio: false,
            }
            
          });
      }





}
