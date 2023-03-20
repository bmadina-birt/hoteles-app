import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelMapService } from './hotel-map.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-hotel-map',
  templateUrl: './hotel-map.component.html',
  styleUrls: ['./hotel-map.component.css']
})
export class HotelMapComponent {
  map: any;
  hotels: any[] = [];
  type: string = '';
  lon: number | null = null;
  lat: number | null = null;
  dist: number | null = null;

  constructor(private hotelMapService: HotelMapService,private http: HttpClient) {}

  searchHotels() {
    if (this.lon !== null && this.lat !== null && this.dist !== null) {
    this.hotelMapService.getGeolocatedHotels(this.lon, this.lat, this.dist).subscribe(data => {
      // Procesa la información recibida desde la API REST
      this.hotels = data.map(item => ({
        name: item.properties.documentname,
        address: item.properties.friendlyurl,
        category: item.properties.category
      }));
    });
  }
  }

  ngOnInit() {

      // Configura las opciones iconUrl y shadowUrl del objeto L.Icon.Default
    L.Icon.Default.prototype.options.iconUrl = 'assets/leaflet/marker-icon.png';
    L.Icon.Default.prototype.options.shadowUrl = 'assets/leaflet/marker-shadow.png';


    // Inicializa el mapa
    this.map = L.map('map').setView([42.88, -2.08], 9);

    // Agrega capa base al mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '...'
    }).addTo(this.map);

    // Obtiene información de los hoteles desde la API REST
    this.http.get<any[]>('http://localhost:8099/api/hotels').subscribe(data => {
      // Procesa la información recibida desde la API REST y agrega marcadores al mapa para cada hotel
      for (let item of data) {
        let lat = item.geometry.coordinates[1];
        let lng = item.geometry.coordinates[0];
        let name = item.properties.documentname;
        let address = item.properties.friendlyurl;
        L.marker([lat, lng]).addTo(this.map)
          .bindPopup(`<b>${name}</b><br>${address}`);
      }
    });
  }
}
