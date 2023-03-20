import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelListService {
  constructor(private http: HttpClient) {}

  getProvinces(): Observable<string[]> {
    // Realiza una petición HTTP a la API para obtener las opciones para el elemento select de provincia
    return this.http.get<string[]>('http://localhost:8099/api/provinces');
  }
}
