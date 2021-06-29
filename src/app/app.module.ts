import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantsComponent } from './Page/restaurants/restaurants.component';
import { RestaurantService } from "./Service/restaurant.service";
import { RestaurantDetailsComponent } from './Page/restaurant-details/restaurant-details.component';
import { DashboardComponent } from './Page/dashboard/dashboard.component';
import { OrdersComponent } from './Page/orders/orders.component';
import {OrderService} from "./Service/order.service";
import { OrderDetailsComponent } from './Page/order-details/order-details.component';
import {NgxWheelModule} from "ngx-wheel";


@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    RestaurantDetailsComponent,
    DashboardComponent,
    OrdersComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    NgxWheelModule
  ],
  providers: [RestaurantService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
