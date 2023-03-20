import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelMapService {
  constructor(private http: HttpClient) {}

  getGeolocatedHotels(lon: number, lat: number, dist: number) {
    return this.http.get<any[]>(`http://localhost:8099/api/hotels/geo?lon=${lon}&lat=${lat}&dist=${dist}`);
  }

  getNearHotels(type: string, lon: number, lat: number, dist: number) {
    return this.http.get<any[]>(`http://localhost:8099/api/hotels/near?type=${type}&lon=${lon}&lat=${lat}&dist=${dist}`);
  }
}
