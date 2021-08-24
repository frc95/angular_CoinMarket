import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  coins : Coin [] = [];
  filteredCoin : Coin [] = [];
  titles: string [] = [
    '#',
    'Coin',
    'Price',
    'Price change',
    '24h volume',
  ];
  searchText = '';

  constructor(private http : HttpClient){}

  ngOnInit(){
    this.http.
      get<Coin[]>(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.coins = res;
          this.filteredCoin = res;
        }, 
        (err) => console.log(err)     
      );
  }

  searchCoin(){
    this.filteredCoin = this.coins.filter(coin => 
      coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
