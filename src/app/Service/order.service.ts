import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';

import {Order} from "../Order";
import {environment} from "../../environments/environment";

@Injectable()
export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  readonly baseUrl = environment.apiUrl + '/pastorders';

  constructor(private http: HttpClient) {
  }

  /** GET orders from the server */
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getOrdersWithName(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl+'/?withname=true');
  }
  /** Get orders according to id */
  getOrdersById(id: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl + `/${id}`)
  }

  //update entries and send them to database
  updateOrder(id: number, order: Object): Observable<Order> {
    return this.http.put<Order>(this.baseUrl + `/${id}`, order, this.httpOptions);
  }

  //delete a entry
  //confirmation modal
  deleteFromTable(id: number): Observable<Order> {
    return this.http.delete<Order>(this.baseUrl + `/${id}`, this.httpOptions);
  }

  //create an entry
  insertIntoTable(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order, this.httpOptions);
  }
}
