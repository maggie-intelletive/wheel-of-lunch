import { Component, OnInit } from '@angular/core';
import { Restaurant } from "../../Restaurant";
import { RestaurantService } from "../../Service/restaurant.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {from, Observable, of, Subject} from "rxjs";
import {ViewChild} from "@angular/core";
import {NgxWheelComponent} from "ngx-wheel";
import {Item} from "ngx-wheel";
import {OrderService} from "../../Service/order.service";
import {Order} from "../../Order";


// put wheel here later
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  restaurants: Restaurant[] = [];
  private unsubscribe$ = new Subject<void>();
  @ViewChild(NgxWheelComponent, {static: false}) wheel: any;
  items: Item[] = [];
  idToLandOn = 0;
  orders: Order[] = [];

  constructor(private resService: RestaurantService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.getItems();
    this.getOrdersWithNames();
  }

  getItems(): void {
    this.resService.getRestaurants().pipe(takeUntil(this.unsubscribe$), switchMap((restaurant) => {
      return of(this.buildItems(restaurant));
    })).subscribe((items) => {
      this.items = items;
      this.idToLandOn = Math.floor(Math.random() * this.items.length);
    });
  }

  buildItems(resArray: Restaurant[]): Item[] {
    let items: Item[] = [];
    for (let i = 0; i < resArray.length; i++) {
      if (i % 2 === 0) {
        items.push(
          {id: i, text: resArray[i].name, fillStyle: 'bisque'}
        )
      } else {
        items.push(
          {id: i, text: resArray[i].name, fillStyle: 'aqua'}
        )
      }
    }
    return items;
  }

  getOrdersWithNames(): void {
    this.orderService.getOrdersWithName().pipe(takeUntil(this.unsubscribe$)).subscribe((order) => {
      this.orders = order;
    });
  }

  spin() {
    this.reset();
    this.wheel.spin();
  }

  reset() {
    this.wheel.reset();
  }

  before() {
    console.log('before');
  }

  after() {
    let resName: string | undefined;
    let ordersWithSameName = [];
    let currDate = new Date();

    //finds resName with corresponding id
    resName = this.items.find(item => item.id === this.idToLandOn)?.text;

    //find all orders with the same res name
    ordersWithSameName = this.orders.filter(order => order.resDto.name === resName);

    // compare all order dates with the current date and if they're within a week, alert
    //case when there are no orders from a certain restaurant
    if(ordersWithSameName.length == 0) {
      window.alert('Go get some food!');
    } else {
      for(let d = 0; d < ordersWithSameName.length; d++) {
        let orderDate = new Date(ordersWithSameName[d].dateOrdered)
        currDate.setHours(0,0,0,0);
          if((currDate.valueOf() - +orderDate) <= (1000*60*60*24*7)) {
            window.alert('Just to tell you, you already ordered from this restaurant this week');
            break;
          } else {
          window.alert('Go get some food!');
          break;
        }
      }
    }
    this.idToLandOn = Math.floor(Math.random() * this.items.length);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
