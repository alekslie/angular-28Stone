import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ForexService } from './forex.service';
import { ForexItem } from '../../models/forex-item';
import { defer } from 'rxjs';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}


describe('ForexService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let forexService: ForexService;

  beforeEach(() => { 
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    forexService = new ForexService(<any> httpClientSpy);
  });

  afterEach(() => {});
  beforeAll(() => {});
  afterAll(() => {});

  
  it('getItem for single forex currency', () => {
    const inputItem: ForexItem = {
      ticker: 'USD/JPY'
    }
    const expectedItem: ForexItem = {
      ticker: 'USD/JPY',
      bid: '109.417',
      ask: '109.419',
      open: '109.527',
      low: '109.331',
      high: '109.586',
      changes: -0.09951884010334863,
      date: '2019-11-28 04:49:06'
    }

    httpClientSpy.get.and.returnValue(asyncData(expectedItem));

    forexService.getItem(inputItem).subscribe(
      data => expect(data).toEqual(expectedItem, 'expected item'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('getAllItems for all forex currencies', () => {
    const expectedItems: ForexItem[] = [ 
      {
      ticker: 'USD/JPY',
      bid: '109.417',
      ask: '109.419',
      open: '109.527',
      low: '109.331',
      high: '109.586',
      changes: -0.09951884010334863,
      date: '2019-11-28 04:49:06'
      }, 
      {
       ticker: 'GBP/USD',
      bid: '1.29306',
      ask: '1.29313',
      open: '1.29238',
      low: '1.29157',
      high: '1.29157',
      changes: 0.055324285426888456,
      date: '2019-11-28 04:49:06'
      }
    ];   

    httpClientSpy.get.and.returnValue(asyncData(expectedItems));

    forexService.getAllItems().subscribe(
      data => expect(data).toEqual(expectedItems, 'expected all items'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});