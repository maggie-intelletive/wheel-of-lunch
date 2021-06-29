import { Component, OnInit } from '@angular/core';
import {from, Observable, Subject} from "rxjs";
import {Order} from "../../Order";
import {OrderService} from "../../Service/order.service";
import {takeUntil} from "rxjs/operators";
import {Restaurant} from "../../Restaurant";
import {RestaurantService} from "../../Service/restaurant.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  restaurants$: Observable<Restaurant[]>;
  orders$: Observable<Order[]> = from([]);
  private unsubscribe$ = new Subject<void>();

  constructor(
    private orderService: OrderService,
    private resService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.getOrdersWithNames();
    this.restaurants$ = this.resService.getRestaurants();
  }

  getOrdersWithNames(): void {
    this.orders$ = this.orderService.getOrdersWithName();
    this.orderService.getOrdersWithName().pipe(takeUntil(this.unsubscribe$)).subscribe((order) => {
      this.orders = order;
    });
  }

  add(resId: number, personWhoOrdered: string, dateOrdered: Date | null, cost?: number, dishes?: string): void {
    personWhoOrdered = personWhoOrdered.trim();
    if(!resId || !dateOrdered) {return;}
    this.orderService.insertIntoTable({resId, dateOrdered, personWhoOrdered, cost, dishes} as Order).subscribe(
      ords => {
        this.getOrdersWithNames();
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
