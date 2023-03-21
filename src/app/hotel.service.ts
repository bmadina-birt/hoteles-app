import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  constructor(private http: HttpClient) {}

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8099/api/hotels');
  }

  getProvinces(): Observable<string[]> {
    // Realiza una petición HTTP a la API para obtener las opciones para el elemento select de provincia
    return this.http.get<string[]>('http://localhost:8099/api/provinces');
  }
}
