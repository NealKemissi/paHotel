import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Event } from '../models/event';
import { EventDTO } from '../models/dto/eventDTO';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  })
};

@Injectable()
export class EventService {

  GET_ALL_EVENTS = 'http://localhost:8090/event';
  GET_EVENT = 'http://localhost:8090/event?id=';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de tous les évenements de l'hotel **/
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.GET_ALL_EVENTS).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type Event **/
  getEvent(event_id : number): Observable<Event> {
    return this.http.get<Event[]>(this.GET_EVENT + event_id)
      .pipe(map(res => res.find(event => event.id == event_id)), 
        catchError(this.handleError));
  }

  /** Créer un Event **/
  createEvent(eventDTO : EventDTO): Observable<any> {
    console.log("creating ...");
    return this.http.post(this.GET_ALL_EVENTS + '/add', JSON.stringify(eventDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** Créer un Event **/
  updateEvent(eventDTO : EventDTO): Observable<any> {
    console.log("updating ...");
    return this.http.post(this.GET_ALL_EVENTS + '/update', JSON.stringify(eventDTO), httpOptions).pipe(catchError(this.handleError));
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
