import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EventBooking } from '../models/event_booking';
import { EventBookingDTO } from '../models/dto/event_bookingDTO';

var httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  }).set('Authorization', localStorage.getItem("token"))
};

@Injectable()
export class EventBookingService {

  GET_ALL_EVENT_BOOKING = 'http://localhost:8090/event_booking';
  GET_EVENT_BOOKING = 'http://localhost:8090/event_booking?id=';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de toutes les reservations de d'évenements **/
  getAllEventsBookings(): Observable<EventBooking[]> {
    return this.http.get<EventBooking[]>(this.GET_ALL_EVENT_BOOKING).pipe(catchError(this.handleError));
  }

  /** Retourne la liste de toutes les reservations d'évenement d'une reservation **/
  getAllEventsBookingsByIdBooking(id_booking: number): Observable<EventBooking[]> {
    return this.http.get<EventBooking[]>(this.GET_ALL_EVENT_BOOKING + '?id_booking=' + id_booking).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type EventBooking **/
  getBooking(id_event_booking : number): Observable<EventBooking> {
    return this.http.get<EventBooking[]>(this.GET_EVENT_BOOKING + id_event_booking)
      .pipe(map(res => res.find(room_booking => room_booking.id == id_event_booking)), 
        catchError(this.handleError));
  }

  /** Créer un EventBooking **/
  createEventBooking(event_bookingDTO : EventBookingDTO): Observable<any> {
    console.log("creating ...");
    return this.http.post(this.GET_ALL_EVENT_BOOKING + '/add', JSON.stringify(event_bookingDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** Gestion  d'erreur **/
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      /** A client-side or network error occurred. Handle it accordingly. **/
      console.error('An error occurred:', error.error.message);
    } else {
      /** The backend returned an unsuccessful response code. **/
      /** The response body may contain clues as to what went wrong, **/
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    /** return an observable with a user-facing error message **/
    return throwError(
      'Something bad happened, please try again later.');
  }

}
