import { Component, OnInit } from '@angular/core';
import { StockServiceService } from '../stock-service.service';
import { covid } from '../models/covid-data';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-covid-main',
  templateUrl: './covid-main.component.html',
  styleUrls: ['./covid-main.component.css']
})
export class CovidMainComponent implements OnInit {
  covidResult: covid[] =[];
  chartOfMarksInAYear =[];
  cases = [];
  dates = [];
  date = new Date();
  tempDate: string;
  confirmed : number;
  recovered: number;
  deaths: number;
  rate: number;
  globalConfirmed : number;
  globalRecovered: number;
  globalDeaths: number;
  newGlobalConfirmed: number;
  newGlobalRecovered: number;
  newGlobalDeaths: number;
  startIndex = 0;
  endIndex = 20;
  name:string = "";
  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
    this.date.setDate(this.date.getDate() -1);
    this.stockService.covidLive()
    .subscribe((data) =>{
      this.globalConfirmed = data.Global.TotalConfirmed;
      this.globalRecovered = data.Global.TotalRecovered;
      this.globalDeaths = data.Global.TotalDeaths;
      this.newGlobalConfirmed = data.Global.NewConfirmed;
      this.newGlobalRecovered = data.Global.NewRecovered;
      this.newGlobalDeaths = data.Global.NewDeaths;
       for(let i =0; i< data.Countries.length ; i++ ){
          const covidData = new covid(
            data.Countries[i].Country,
            data.Countries[i].TotalConfirmed,
            data.Countries[i].TotalDeaths,
            data.Countries[i].TotalRecovered
          )
          this.covidResult.push(covidData);
        }
    })
  }

  consoleLook(allData: any){
    this.name = allData.Country;
    this.confirmed = allData.TotalConfirmed;
    this.recovered = allData.TotalRecovered;
    this.deaths = allData.TotalDeath;
    this.rate = this.calculateRecoveryRate(this.confirmed, this.recovered);
    this.stockService.covidCountry(allData.Country)
    .subscribe((data: any[])=>{
      console.log(data);
        for(let i =0; i<data.length; i++){
          this.tempDate = data[i].Date;
          this.cases[i] = data[i].Cases;
          this.dates[i] = this.tempDate.substring(0,10);
        }
        const canvas = <HTMLCanvasElement> document.getElementById('canvasMarks');
        const ctx = canvas.getContext('2d');
        this.chartOfMarksInAYear = new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.dates,
              datasets: [{
                  label: '# of Confirmed cases',
                  data: this.cases,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.5)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)'
                  ],
                  borderWidth: 1,
              }]
            },
            options: {
              maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
            
          });
        })
  }

  getArrayFromNumber(length){
    return new Array(Math.ceil(length/20));
  }  

  updateIndex(pageIndex){
    this.startIndex = pageIndex*20;
    this.endIndex = this.startIndex+20;
  }

  calculateRecoveryRate(total: number, revived: number): number{
    return (revived/total)*100;
  }


}
