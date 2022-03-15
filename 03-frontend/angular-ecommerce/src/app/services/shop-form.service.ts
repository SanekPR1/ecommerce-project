import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }

  getCreditCardMonths(): Observable<number[]> {
    let data: number[] = [];
    for (let month = 1; month <= 12; month++) {
      data.push(month);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const currentYear: number = new Date().getFullYear();
    const endYear: number = currentYear + 10;
    for (let year = currentYear; year <= endYear; year++) {
      data.push(year);
    }
    return of(data);
  }
}
