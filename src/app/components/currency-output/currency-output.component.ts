import { Component, OnInit, Input } from '@angular/core';
import { ForexItem } from '../../models/forex-item';

@Component({
  selector: 'app-currency-output',
  templateUrl: './currency-output.component.html',
  styleUrls: ['./currency-output.component.css']
})
export class CurrencyOutputComponent implements OnInit {
  @Input() forexItem: ForexItem;
  

  constructor() { }

  ngOnInit() {
    console.log(this.forexItem);


  }

}