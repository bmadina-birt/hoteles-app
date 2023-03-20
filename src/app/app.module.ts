import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelMapComponent } from './hotel-map/hotel-map.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes =[
  {path: '',redirectTo: '/map', pathMatch: 'full'},
  {path: 'list', component: HotelListComponent},
  {path: 'map', component: HotelMapComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    HotelMapComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // <-- Importa el módulo FormsModule  (para poder usar ngModel)
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
