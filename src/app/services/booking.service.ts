import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Booking } from '../models/booking';
import { BookingDTO } from '../models/dto/bookingDTO';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  })
};
/** magouille pour update avec token */
const httpOptions2 = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  }).set('Authorization', localStorage.getItem("token"))
};

@Injectable()
export class BookingService {

  GET_ALL_BOOKING = 'http://localhost:8090/booking';
  GET_BOOKING = 'http://localhost:8090/booking?id=';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de toutes les reservations de l'hotel **/
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.GET_ALL_BOOKING).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type Booking **/
  getBooking(id_booking : number): Observable<Booking> {
    return this.http.get<Booking[]>(this.GET_BOOKING + id_booking)
      .pipe(map(res => res.find(booking => booking.id == id_booking)), 
        catchError(this.handleError));
  }

  /** Créer un Booking **/
  createBooking(bookingDTO : BookingDTO): Observable<any> {
    console.log("creating ...");
    return this.http.post(this.GET_ALL_BOOKING + '/add', JSON.stringify(bookingDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** Update un Booking **/
  updateBooking(bookingDTO : BookingDTO): Observable<any> {
    console.log("updatating ...");
    return this.http.post(this.GET_ALL_BOOKING + '/update', JSON.stringify(bookingDTO), httpOptions2).pipe(catchError(this.handleError));
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
