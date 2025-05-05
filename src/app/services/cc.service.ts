import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/cc';

@Injectable({
  providedIn: 'root'
})
export class CcService {
  private apiUrl = 'http://localhost:3000/creditcards';

  constructor(private http: HttpClient) { }

  getcc(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(this.apiUrl);
  }

  getccById(id: number): Observable<CreditCard> {
    return this.http.get<CreditCard>(`${this.apiUrl}/${id}`);
  }

  addcc(creditCard: CreditCard): Observable<CreditCard> {
    return this.http.post<CreditCard>(this.apiUrl, creditCard);
  }

  updatecc(id: number, creditCard: CreditCard): Observable<CreditCard> {
    return this.http.put<CreditCard>(`${this.apiUrl}/${id}`, creditCard);
  }

  deletecc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
  