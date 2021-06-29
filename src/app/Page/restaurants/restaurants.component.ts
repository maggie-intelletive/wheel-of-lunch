import {Component, OnDestroy, OnInit} from '@angular/core';
import {Restaurant} from "../../Restaurant";
import { RestaurantService } from "../../Service/restaurant.service";
import {from, Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  restaurants$: Observable<Restaurant[]> = from([]);
  restuarants: Restaurant[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private resService: RestaurantService) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurants$ = this.resService.getRestaurants();
    this.resService.getRestaurants().pipe(takeUntil(this.unsubscribe$)).subscribe((restaurant) => {
      this.restuarants = restaurant;
    });
  }

  add(name: string, rating?: number, type?: string): void {
    name = name.trim();
    type = type?.trim();
    if(!name) {return;}
    this.resService.insertIntoTable({name, type, rating} as Restaurant).subscribe(
      res =>
      {
        this.getRestaurants();
      });
  }



  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
