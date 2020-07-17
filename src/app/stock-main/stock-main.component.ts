import { Component, OnInit } from '@angular/core';
import { StockServiceService } from '../stock-service.service';
import { newsList } from '../models/news';

@Component({
  selector: 'app-stock-main',
  templateUrl: './stock-main.component.html',
  styleUrls: ['./stock-main.component.css']
})
export class StockMainComponent implements OnInit {
  result:object;
  newsResult: newsList[]=[];
  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
    this.stockService.liveNews()
        .subscribe((res:any)=>{
          this.result = res;
          for(let i =0; i<res.length; i++){
              const news = new newsList(
                this.result[i].headline,
                this.result[i].image,
                this.result[i].source,
                this.result[i].url
              )
              this.newsResult.push(news)
          }
          return this.newsResult;
        });
  }

}
