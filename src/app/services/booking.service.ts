import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Booking } from '../models/booking';

@Injectable()
export class BookingService {

  GET_ALL_BOOKING = 'assets/api/bookings.json';
  GET_BOOKING = 'assets/api/booking.json';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de toutes les reservations de l'hotel **/
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.GET_ALL_BOOKING).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type Booking **/
  getBooking(): Observable<Booking> {
    return this.http.get<Booking>(this.GET_BOOKING).pipe(catchError(this.handleError));
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
        `body was: ${error.error}`);
    }
    /** return an observable with a user-facing error message **/
    return throwError(
      'Something bad happened, please try again later.');
  }

}
