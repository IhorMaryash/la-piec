import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISales } from '../interfaces/sales.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private arrData: Array<string> = ['Ivan', 'Petro', 'Pavlo'];
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/sales';
  }

  getSales(): Observable<Array<ISales>> {
    return this.http.get<Array<ISales>>(this.url);
  }

  addSales(sale: ISales): Observable<Array<ISales>> {
    return this.http.post<Array<ISales>>(this.url, sale);
  }

  deleteSales(sale: ISales): Observable<Array<ISales>> {
    return this.http.delete<Array<ISales>>(`${this.url}/${sale.id}`);
  }

  updateSales(sale: ISales): Observable<Array<ISales>> {
    return this.http.put<Array<ISales>>(`${this.url}/${sale.id}`, sale);
  }


  getCurrentSale(id: number): Observable<ISales> {
    return this.http.get<ISales>(`${this.url}/${id}`);
  }



  getData(): Array<string> {
    return this.arrData;
  }
}
