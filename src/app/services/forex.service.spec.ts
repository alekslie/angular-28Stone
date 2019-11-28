import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ForexService } from '../../services/forex.service';
import { ForexItem } from '../../models/forex-item';


describe('ForexService', () => {
  let service: ForexService;
  beforeEach(() => { service = new ForexService(); });

  let forexItem: ForexItem = {
    ticker: 'USD/JPY'
  }

  it ('test name'), () => {

  });

  // it('#getItem should return value from observable', (done: DoneFn) => {
  //   service.getItem(forexItem).subscribe(value => {
  //     expect(value).toBe('');
  //     done();
  //   });
  // });
});