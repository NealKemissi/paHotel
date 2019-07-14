import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { UserDTO } from '../models/dto/userDTO';
import { UserLoginDTO } from '../models/dto/user_loginDTO';

var httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  }).set('Authorization', localStorage.getItem("token"))
};

@Injectable()
export class UserService {

  GET_ALL_USERS = 'http://localhost:8090/user';
  GET_USER_EMAIL = 'http://localhost:8090/user?email=';
  GET_USER = 'http://localhost:8090/user?id=';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de tous les clients de l'hotel **/
  getAllUsers(): Observable<User[]> {
    console.log(localStorage.getItem("token"))
    //httpOptions.headers.append('Authorization', 'Bearer '+localStorage.getItem("token"));
    console.log(httpOptions.headers.keys())
    return this.http.get<User[]>(this.GET_ALL_USERS, httpOptions).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type User **/
  getUser(user_email : string): Observable<User> {
    return this.http.get<User[]>(this.GET_USER_EMAIL + user_email, httpOptions)
      .pipe(map(res => res.find(user => user.email == user_email)), 
        catchError(this.handleError));
  }

  /** Retourne un objet de type User **/
  getUserById(user_id : number): Observable<User> {
    return this.http.get<User[]>(this.GET_USER + user_id, httpOptions)
      .pipe(map(res => res.find(user => user.id == user_id)), 
        catchError(this.handleError));
  }

  /** Créer un utilisateur */
  createUser(userDTO: UserDTO) : Observable<any> {
    console.log('creating : '+JSON.stringify(userDTO));
    return this.http.post(this.GET_ALL_USERS + '/register', JSON.stringify(userDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** met à jour un utilisateur */
  updateUser(userDTO: UserDTO) : Observable<any> {
    console.log('updating : '+JSON.stringify(userDTO));
    return this.http.post(this.GET_ALL_USERS + '/update', JSON.stringify(userDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** Login **/
  login(user_loginDTO: UserLoginDTO) : Observable<any> {
    return this.http.post(this.GET_ALL_USERS + '/login', JSON.stringify(user_loginDTO), httpOptions).pipe(catchError(this.handleError));
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
