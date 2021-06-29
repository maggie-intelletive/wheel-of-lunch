import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestaurantsComponent} from "./Page/restaurants/restaurants.component";
import {RestaurantDetailsComponent} from "./Page/restaurant-details/restaurant-details.component";
import {DashboardComponent} from "./Page/dashboard/dashboard.component";
import {OrdersComponent} from "./Page/orders/orders.component";
import {OrderDetailsComponent} from "./Page/order-details/order-details.component";

const routes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'order/:id', component: OrderDetailsComponent },
  { path: 'restaurant/:id', component: RestaurantDetailsComponent },
  {path: 'restaurants', component: RestaurantsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
