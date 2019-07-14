import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServiceBooking } from '../models/service_booking';
import { ServiceBookingDTO } from '../models/dto/service_bookingDTO';

var httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  }).set('Authorization', localStorage.getItem("token"))
};

@Injectable()
export class ServiceBookingService {

  GET_ALL_SERVICE_BOOKING = 'http://localhost:8090/service_booking';
  GET_SERVICE_BOOKING = 'http://localhost:8090/service_booking?id=';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de toutes les reservations de services **/
  getAllServicesBookings(): Observable<ServiceBooking[]> {
    return this.http.get<ServiceBooking[]>(this.GET_ALL_SERVICE_BOOKING).pipe(catchError(this.handleError));
  }

  /** Retourne la liste de toutes les reservations de service d'une reservation **/
  getAllServicesBookingsByIdBooking(id_booking: number): Observable<ServiceBooking[]> {
    return this.http.get<ServiceBooking[]>(this.GET_ALL_SERVICE_BOOKING + '?id_booking=' + id_booking).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type ServiceBooking **/
  getServiceBooking(id_service_booking : number): Observable<ServiceBooking> {
    return this.http.get<ServiceBooking[]>(this.GET_SERVICE_BOOKING + id_service_booking)
      .pipe(map(res => res.find(room_booking => room_booking.id == id_service_booking)), 
        catchError(this.handleError));
  }

  /** Créer un ServiceBooking **/
  createServiceBooking(service_bookingDTO : ServiceBookingDTO): Observable<any> {
    console.log("creating ...");
    console.log('id : '+service_bookingDTO.id+',booked_at : '+service_bookingDTO.booked_at+',realised_at : '+service_bookingDTO.realised_at+',id_service : '+service_bookingDTO.id_service+',id_booking : '+service_bookingDTO.id_booking+',id_service_booking_status : '+service_bookingDTO.id_service_booking_status)
    return this.http.post(this.GET_ALL_SERVICE_BOOKING + '/add', JSON.stringify(service_bookingDTO), httpOptions).pipe(catchError(this.handleError));
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
