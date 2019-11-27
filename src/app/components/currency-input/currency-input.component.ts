import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ForexService } from '../../services/forex.service';
import { ForexItem } from '../../models/forex-item';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.css']
})
export class CurrencyInputComponent implements OnInit {
  forexItem: ForexItem = new ForexItem();
  currencyInputForm;
  timerId: number;
  refreshTime: number = 5;
  showCurrencyOutput: boolean = false;
  error: string = '';
  notFoundError: string = '* Not found';

  constructor(
    private forexService:ForexService, 
    private formBuilder: FormBuilder) { 
      this.currencyInputForm = this.formBuilder.group({
        ticker: ''
    });
  }

  ngOnInit() {
      this.error = '';
      this.timerId = setInterval(() => {
      this.reloadItem();
    }, this.refreshTime * 1000);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  onCurrencyInput(currencyData) { 
    this.error = ''; 
    console.log(currencyData);
    this.forexItem.ticker = currencyData.ticker;
    this.forexService.getItem(this.forexItem).subscribe(data => {
        this.forexItem = data;             
        console.log(this.forexItem); 
        console.log(this.forexItem.bid); 
        this.checkForError();
        if (!this.forexItem.bid) {
          this.error = this.notFoundError;
        }
      })   
    
    this.currencyInputForm.reset();
  }

  reloadItem() {
    if (this.forexItem) {
      this.forexService.getItem(this.forexItem).subscribe(data => {
        this.forexItem = data;             
        console.log(this.forexItem); 
        console.log(this.forexItem.bid);
        this.checkForError();
       })     
    }
  }

  checkForError() {
    if (this.forexItem.bid)  {
      this.showCurrencyOutput = true;
      this.error = '';
    }
    else {
      this.showCurrencyOutput = false;
    }      
  }
}