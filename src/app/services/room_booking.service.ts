import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RoomBooking } from '../models/room_booking';
import { RoomBookingDTO } from '../models/dto/room_bookingDTO';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  })
};

@Injectable()
export class RoomBookingService {

  GET_ALL_ROOM_BOOKING = 'http://localhost:8090/room_booking';
  GET_ROOM_BOOKING = 'http://localhost:8090/room_booking?id=';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de toutes les reservations de chambres **/
  getAllBookings(): Observable<RoomBooking[]> {
    return this.http.get<RoomBooking[]>(this.GET_ALL_ROOM_BOOKING).pipe(catchError(this.handleError));
  }

  /** Retourne la liste de toutes les reservations de chambres d'une reservation **/
  getAllBookingsByIdBooking(id_booking: number): Observable<RoomBooking[]> {
    return this.http.get<RoomBooking[]>(this.GET_ALL_ROOM_BOOKING + '?id_booking=' + id_booking).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type RoomBooking **/
  getBooking(id_room_booking : number): Observable<RoomBooking> {
    return this.http.get<RoomBooking[]>(this.GET_ROOM_BOOKING + id_room_booking)
      .pipe(map(res => res.find(room_booking => room_booking.id == id_room_booking)), 
        catchError(this.handleError));
  }

  /** Créer un RoomBooking **/
  createRoomBooking(room_bookingDTO : RoomBookingDTO): Observable<any> {
    console.log("creating ...");
    return this.http.post(this.GET_ALL_ROOM_BOOKING + '/add', JSON.stringify(room_bookingDTO), httpOptions).pipe(catchError(this.handleError));
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
