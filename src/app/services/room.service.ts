import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Room } from '../models/room';

@Injectable()
export class RoomService {

  GET_ALL_ROOMS = 'assets/api/rooms.json';
  GET_ROOM = 'assets/api/room.json';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de toutes les chambres de l'hotel **/
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.GET_ALL_ROOMS).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type Room **/
  getRoom(): Observable<Room> {
    return this.http.get<Room>(this.GET_ROOM).pipe(catchError(this.handleError));
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
