import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelService } from '../hotel.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-hotel-map',
  templateUrl: './hotel-map.component.html',
  styleUrls: ['./hotel-map.component.css']
})
export class HotelMapComponent {
  map: any;
  hotels: any[] = [];
  //type: string = '';
  categories: string[] = ['1', '2', '3', '4', '5'];
  selectedCategories: string[] = [];

  constructor(private http: HttpClient, private hotelService:HotelService) {}

   ngOnInit() {

      // Configura las opciones iconUrl y shadowUrl del objeto L.Icon.Default
    L.Icon.Default.prototype.options.iconUrl = 'assets/leaflet/marker-icon.png';
    L.Icon.Default.prototype.options.shadowUrl = 'assets/leaflet/marker-shadow.png';


    // Inicializa el mapa
    this.map = L.map('map').setView([42.88, -2.58], 8);

    // Agrega capa base al mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '...'
    }).addTo(this.map);

     // Inicializa el arreglo de categorías seleccionadas con todas las categorías disponibles
     this.selectedCategories = [...this.categories];

    // Obtiene información de los hoteles desde la API REST
    this.hotelService.getHotels().subscribe(data => {
       // Almacena la información recibida desde la API REST en la propiedad hotels
    this.hotels = data;
    // Llama al método updateMap para agregar marcadores al mapa
    this.updateMap();
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
  onCategoryChange(category: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    this.updateMap();
  }

  updateMap() {
    // Elimina todos los marcadores del mapa
    this.map.eachLayer((layer: L.Layer)=> {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Agrega marcadores al mapa solo para los hoteles que cumplan con el filtro de categoría
    for (let item of this.hotels) {
      if (this.selectedCategories.includes(item.properties.category)) {
        let lat = item.geometry.coordinates[1];
        let lng = item.geometry.coordinates[0];
        let name = item.properties.documentname;
        let address = item.properties.friendlyurl;
        L.marker([lat, lng]).addTo(this.map)
          .bindPopup(`<b>${name}</b><br>${address}`);
      }
    }
  }
}
