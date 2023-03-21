import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent {
  hotels: any[] = [];
  allHotels: any[] = [];
  provinces: string[] = [];
  selectedProvince: string = '';
  // Número total de elementos (hoteles) a mostrar
  totalItems: number = this.allHotels.length;
  // Número de elementos (hoteles) por página
  itemsPerPage: number = 12;
  // Página actual
  currentPage: number = 1;

  constructor(private http: HttpClient, private hotelService: HotelService) {
    // Obtiene las opciones para el elemento select de provincia
    this.hotelService.getProvinces().subscribe((data: string[]) => {
      this.provinces = data;
    });

    this.hotelService.getHotels().subscribe(data => {
      // Procesa la información recibida desde la API REST
      for (let item of data) {
        let hotel = {
          name: item.properties.documentname,
          web: item.properties.web,
          municipality: item.properties.municipality,
          category: item.properties.category,
          province: item.properties.territory
        };
        this.hotels.push(hotel);
      }
      // Muestra todos los hoteles por defecto ordenados por municipio
      this.hotels.sort((a, b) => a.municipality.localeCompare(b.municipality));
      this.allHotels = this.hotels;
      // Actualiza el número total de elementos (hoteles) a mostrar
      this.totalItems = this.allHotels.length;
    });
  }

  // Filtra los hoteles según los valores seleccionados en los elementos select
  filterHotels() {
    if (this.selectedProvince === '') {
      this.hotels = this.allHotels;
    } else {
      this.hotels = this.allHotels.filter(hotel => hotel.province === this.selectedProvince);
    }
     // Actualiza el número total de elementos (hoteles) a mostrar
  this.totalItems = this.hotels.length;
  }
  resetFilter() {
    this.selectedProvince = '';
    this.hotels = this.allHotels;
    // Actualiza el número total de elementos (hoteles) a mostrar
  this.totalItems = this.hotels.length;
  }

  // Método para obtener los hoteles a mostrar en la página actual
  get currentHotels(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.hotels.slice(start, end);
  }

}
