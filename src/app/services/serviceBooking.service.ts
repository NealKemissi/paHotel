import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceBooking } from '../models/serviceBooking';

@Injectable()
export class ServiceBookingService {

  GET_ALL_SERVICES_BOOKING = 'assets/api/servicesBooking.json';
  GET_SERVICE_BOOKING = 'assets/api/servicesBooking.json';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de tous les services de l'hotel **/
  getAllServicesBooking(): Observable<ServiceBooking[]> {
    return this.http.get<ServiceBooking[]>(this.GET_ALL_SERVICES_BOOKING).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type ServiceBooking **/
  getServiceBooking(): Observable<ServiceBooking> {
    return this.http.get<ServiceBooking>(this.GET_SERVICE_BOOKING).pipe(catchError(this.handleError));
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
