import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ForexItem } from '../../models/forex-item';

@Injectable()
export class ForexService {
  forexUrl: string = 'https://financialmodelingprep.com/api/v3/forex';

  constructor(private http:HttpClient) { }

  getAllItems():Observable<any> {
       
    return this.http.get<any>(this.forexUrl);
  }

  getItem(item: ForexItem):Observable<ForexItem> {

    let path: string = item.ticker;
    if (path) {
      path = path.replace(/\//g, "").toUpperCase();
    }
    const url = `${this.forexUrl}/${path}`; 
    console.log(url);       
    return this.http.get<ForexItem>(url);
  }

}