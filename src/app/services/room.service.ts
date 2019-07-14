import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Room } from '../models/room';
import { RoomDTO } from '../models/dto/roomDTO';

var httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  }).set('Authorization', localStorage.getItem("token"))
};

@Injectable()
export class RoomService {

  GET_ALL_ROOMS = 'http://localhost:8090/room';
  GET_ROOM = 'http://localhost:8090/room?id=';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de toutes les chambres de l'hotel **/
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.GET_ALL_ROOMS).pipe(catchError(this.handleError));
  }

  /** Retourne la liste de toutes les chambres de l'hotel en fonction des places **/
  getRoomsInTermsOfSeats(seats : number): Observable<Room[]> {
    return this.http.get<Room[]>(this.GET_ALL_ROOMS + '?seats=' + seats).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type Room **/
  getRoom(room_id :number): Observable<Room> {
    return this.http.get<Room[]>(this.GET_ROOM + room_id)
      .pipe(map(res => res.find(room => room.id == room_id)), 
        catchError(this.handleError));
  }

  /** Créer une Room **/
  createRoom(roomDTO : RoomDTO): Observable<any> {
    console.log("creating ...");
    return this.http.post(this.GET_ALL_ROOMS + '/add', JSON.stringify(roomDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** Met à jour objet de type Room **/
  updateRoom(roomDTO : RoomDTO): Observable<any> {
    console.log("cleared from "+!roomDTO.cleared+" to "+roomDTO.cleared);
    return this.http.post(this.GET_ALL_ROOMS + '/update', JSON.stringify(roomDTO), httpOptions).pipe(catchError(this.handleError));
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
