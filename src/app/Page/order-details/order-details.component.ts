import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {OrderService} from "../../Service/order.service";
import {Observable, Subject} from "rxjs";
import {Order} from "../../Order";
import {Location} from "@angular/common";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id: number = 0;
  unsubscribe$ = new Subject<void>();
  order: Order;
  forms?: FormGroup;

  constructor(
    private aroute: ActivatedRoute,
    private ordService: OrderService,
    private build: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.aroute.snapshot.params.id;
    this.getOrdersById(this.id);
  }

  getOrdersById(id: number) {
    this.ordService.getOrdersById(id).pipe(takeUntil(this.unsubscribe$)).subscribe((order) => {
      this.order = order;
      this.initForm();
    });
  }

  initForm() {
    console.log(this.order);
    this.forms = this.build.group({
      personWhoOrdered: [this.order.personWhoOrdered, [Validators.required]],
      dateOrdered: [this.order.dateOrdered, [Validators.required]],
      dishes: [this.order.dishes, [Validators.required]],
      cost: [this.order.cost, [Validators.required]],
      name: [this.order.resDto.name, [Validators.required]]
    })
  }

  submit(id: number) {
    if(this.forms?.valid){
      console.log(this.forms?.getRawValue());
      console.log(this.order);
      this.updateTable(this.order.id, this.forms.getRawValue());
    }
    else {
      alert('Must have input');
    }
  }

  updateTable(id: number, order: Object) {
    this.ordService.updateOrder(id, order).pipe(takeUntil(this.unsubscribe$)).subscribe((order) => {
      this.order = order;
    });
  }

  delete(id: number): void {
    if (confirm ('Are you sure you want to delete this order?')) {
      this.ordService.deleteFromTable(id).pipe(takeUntil(this.unsubscribe$)).subscribe();
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
