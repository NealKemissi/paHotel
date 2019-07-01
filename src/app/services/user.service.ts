import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable()
export class UserService {

  GET_ALL_USERS = 'assets/api/users.json';
  GET_USER = 'assets/api/user.json';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de tous les clients de l'hotel **/
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.GET_ALL_USERS).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type User **/
  getUser(): Observable<User> {
    return this.http.get<User>(this.GET_USER).pipe(catchError(this.handleError));
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
