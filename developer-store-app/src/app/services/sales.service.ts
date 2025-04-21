import { Observable } from "rxjs";
import { Sale } from "../models/sale";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class SalesService {
  
    private apiUrl = 'https://localhost:7181/api/sales';
  
    constructor(
      private http: HttpClient) {}
  
    getAll(): Observable<Sale[]> {
      return this.http.get<Sale[]>(this.apiUrl);
    }
  
    getById(id: number): Observable<Sale> {
      return this.http.get<Sale>(`${this.apiUrl}/${id}`);
    }
  
    create(sale: Sale): Observable<Sale> {
      return this.http.post<Sale>(this.apiUrl, sale);
    }
  
    update(sale: Sale): Observable<Sale> {
      return this.http.put<Sale>(`${this.apiUrl}/${sale.id}`, sale);
    }
  
    cancel(id: string): Observable<void> {        
      return this.http.post<void>(`${this.apiUrl}/${id}/cancel`, {});
    }
  }