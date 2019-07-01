import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from '../models/event';

@Injectable()
export class EventService {

  GET_ALL_EVENTS = 'assets/api/events.json';
  GET_EVENT = 'assets/api/event.json';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de tous les évenements de l'hotel **/
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.GET_ALL_EVENTS).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type Event **/
  getEvent(): Observable<Event> {
    return this.http.get<Event>(this.GET_EVENT).pipe(catchError(this.handleError));
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
