import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

var options = { responseType: 'text' as 'json'};

@Injectable()
export class DashboardService {

  PATH_PRESENTATION_DESCRIPTION = './assets/doc_admin/description_presentation.txt';
  PATH_ROOMS_DESCRIPTION = './assets/doc_admin/description_rooms.txt';
  PATH_EVENTS_DESCRIPTION = './assets/doc_admin/description_events.txt';
  PATH_RESTAURANT_DESCRIPTION = './assets/doc_admin/description_restaurant.txt';

  constructor(private http: HttpClient) { }

  /** Retourne la présentation d'intro de l'hotel **/
  getPresentationDescription(): Observable<any> {
    return this.http.get(this.PATH_PRESENTATION_DESCRIPTION, options);
  }

  /** Retourne la présentation des chambres de l'hotel **/
  getRoomsDescription(): Observable<any> {
    return this.http.get(this.PATH_ROOMS_DESCRIPTION, options);
  }

  /** Retourne la présentation des evenements l'hotel **/
  getEventsDescription(): Observable<any> {
    return this.http.get(this.PATH_EVENTS_DESCRIPTION, options);
  }

  /** Retourne la présentation du restaurant de l'hotel **/
  getRestaurantDescription(): Observable<any> {
    return this.http.get(this.PATH_RESTAURANT_DESCRIPTION, options);
  }

  /** Update la présentation de l'hotel **/
//   updateBooking(bookingDTO : BookingDTO): Observable<any> {
//     console.log("updatating ...");
//     return this.http.post(this.GET_ALL_BOOKING + '/update', JSON.stringify(bookingDTO), httpOptions2).pipe(catchError(this.handleError));
//   }

}
