import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TableBooking } from '../models/table_booking';
import { TableBookingDTO } from '../models/dto/table_bookingDTO';

var httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  }).set('Authorization', localStorage.getItem("token"))
};

@Injectable()
export class TableBookingService {

  GET_ALL_TABLE_BOOOKING = 'http://localhost:8090/table_booking';
  GET_TABLE_BOOKING = 'http://localhost:8090/table_booking?id=';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de toutes les reservations de tables du resto de l'hotel **/
  getAllTablesBooking(): Observable<TableBooking[]> {
    return this.http.get<TableBooking[]>(this.GET_ALL_TABLE_BOOOKING).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type TableBooking **/
  getTableBooking(table_booking_id : number): Observable<TableBooking> {
    return this.http.get<TableBooking[]>(this.GET_TABLE_BOOKING + table_booking_id)
      .pipe(map(res => res.find(table_booking => table_booking.id == table_booking_id)), 
        catchError(this.handleError));
  }

  /** Créer une TableBooking **/
  createTableBooking(tableBookingDTO : TableBookingDTO): Observable<any> {
    console.log("creating ...");
    console.log(tableBookingDTO.id+' '+tableBookingDTO.arrival+' '+tableBookingDTO.total_price+' '+tableBookingDTO.done+' '+tableBookingDTO.id_hotel_booking);
    return this.http.post(this.GET_ALL_TABLE_BOOOKING + '/add', JSON.stringify(tableBookingDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** Met à jour objet de type TableBooking **/
  updateTableBooking(tableBookingDTO : TableBookingDTO): Observable<any> {
    return this.http.post(this.GET_ALL_TABLE_BOOOKING + '/update', JSON.stringify(tableBookingDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** Gestion  d'erreur **/
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      /** A client-side or network error occurred. Handle it accordingly. **/
      console.error('Une erreur s\'est produite : ', error.error.message);
    } else {
      /** The backend returned an unsuccessful response code. **/
      /** The response body may contain clues as to what went wrong, **/
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    /** return an observable with a user-facing error message **/
    return throwError(
      'Une erreur s\'est produite, veuillez réessayez plus tard.');
  }
}
