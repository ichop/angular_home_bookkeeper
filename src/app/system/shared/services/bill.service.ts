import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../models/bill.model';

@Injectable()
export class BillService {
  constructor(private http: HttpClient) {
  }

  getBill(): Observable<Bill> {
    return this.http.get<Bill>('http://localhost:3000/bill');
  }

  getCurrency(base: string = 'RUB') {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
  }
}
