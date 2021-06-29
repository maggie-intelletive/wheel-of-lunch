import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {RestaurantService} from "../../Service/restaurant.service";
import {Observable, Subject} from "rxjs";
import {Restaurant} from "../../Restaurant";
import {Location} from "@angular/common";

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  id: number = 0;
  unsubscribe$ = new Subject<void>();
  restaurant: Restaurant;
  forms?: FormGroup;


  constructor(
    private aroute: ActivatedRoute,
    private resService: RestaurantService,
    private build: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.aroute.snapshot.params.id;
    this.getRestaurant(this.id);
  }

  getRestaurant(id: number) {
    this.resService.getRestaurantById(id).pipe(takeUntil(this.unsubscribe$)).subscribe((restaurant) => {
      this.restaurant = restaurant;
      this.initForm();
    });
  }

  initForm() {
    this.forms = this.build.group({
      name: [this.restaurant.name, [Validators.required]],
      rating: [this.restaurant.rating, [Validators.required]],
      type: [this.restaurant.type, [Validators.required]]
    })
  }

  submit(id: number) {
    if(this.forms?.valid){
      console.log(this.forms?.getRawValue());
      console.log(this.restaurant);
      this.updateTable(this.restaurant.id, this.forms.getRawValue());
    }
    else {
      alert('Must have input');
    }
  }

  updateTable(id: number, restaurant: Object) {
    this.resService.updateTable(id, restaurant).pipe(takeUntil(this.unsubscribe$)).subscribe((restaurant) => {
      this.restaurant = restaurant;
    });
  }

  insertIntoTable(restaurant: Restaurant) {
    this.resService.insertIntoTable(restaurant).pipe(takeUntil(this.unsubscribe$)).subscribe((restaurant) => {
      this.restaurant = restaurant;
    });
  }

  delete(id: number): void {
    if (confirm ('Are you sure you want to delete '+ this.restaurant.name + '?')) {
      //observable does nothing until something subscribes
      this.resService.deleteFromTable(id).pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
