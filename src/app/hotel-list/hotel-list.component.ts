import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelListService } from './hotel-list.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent {
  hotels: any[] = [];
  allHotels: any[] = [];
  provinces: string[] = [];
  selectedProvince: string ='';

  constructor(private http: HttpClient, private hotelListService: HotelListService) {
     // Obtiene las opciones para el elemento select de provincia
     this.hotelListService.getProvinces().subscribe((data: string[]) => {
      this.provinces = data;
    });

    this.http.get<any[]>('http://localhost:8099/api/hotels').subscribe(data => {
      // Procesa la información recibida desde la API REST
      for (let item of data) {
        let hotel = {
          name: item.properties.documentname,
          address: item.properties.friendlyurl,
          category: item.properties.category,
          province: item.properties.territory
        };
        this.hotels.push(hotel);
      }
       // Muestra todos los hoteles por defecto
       this.allHotels = this.hotels;
    });
  }
    // Filtra los hoteles según los valores seleccionados en los elementos select
    filterHotels() {
      if (this.selectedProvince === '') {
        this.hotels = this.allHotels;
      } else {
        this.hotels = this.allHotels.filter(hotel => hotel.province === this.selectedProvince);
      }
    }
    resetFilter() {
      this.selectedProvince = '';
      this.hotels = this.allHotels;
    }

}
