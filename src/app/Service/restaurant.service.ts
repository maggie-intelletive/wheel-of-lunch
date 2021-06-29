import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { Restaurant } from "../Restaurant";
import {environment} from "../../environments/environment";

@Injectable()
export class RestaurantService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  readonly baseUrl = environment.apiUrl + '/resselections';

  constructor(
    private http: HttpClient,
    /*private messageService: MessageService*/) {
  }

  /** GET restaurants from the server */
  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.baseUrl);
  }

  /** Get restaurants according to id */
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.baseUrl + `/${id}`)
  }

  //update entries and send them to database
  updateTable(id: number, restaurant: Object): Observable<Restaurant> {
    return this.http.put<Restaurant>(this.baseUrl + `/${id}`, restaurant, this.httpOptions);
  }

  //delete a entry
  //confirmation modal
  deleteFromTable(id: number): Observable<Restaurant> {
    console.log(this.baseUrl + `/delete/${id}`)
    return this.http.delete<Restaurant>(this.baseUrl + `/delete/${id}`, this.httpOptions);
  }

  //create an entry
  insertIntoTable(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.baseUrl, restaurant, this.httpOptions);
  }
  //make pretty
}

