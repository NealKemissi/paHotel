import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Service } from '../models/service';
import { ServiceDTO } from '../models/dto/serviceDTO';

var httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  }).set('Authorization', localStorage.getItem("token"))
};

@Injectable()
export class ServiceService {

  GET_ALL_SERVICES = 'http://localhost:8090/service';
  GET_SERVICE = 'http://localhost:8090/service?id=';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de tous les services de l'hotel **/
  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.GET_ALL_SERVICES).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type Service **/
  getService(service_id :number): Observable<Service> {
    return this.http.get<Service[]>(this.GET_SERVICE + service_id)
      .pipe(map(res => res.find(service => service.id == service_id)), 
        catchError(this.handleError));
  }

  /** Créer une Service **/
  createService(serviceDTO : ServiceDTO): Observable<any> {
    console.log("creating ...");
    return this.http.post(this.GET_ALL_SERVICES + '/add', JSON.stringify(serviceDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** Met à jour objet de type Service **/
  updateService(serviceDTO : ServiceDTO): Observable<any> {
    return this.http.post(this.GET_ALL_SERVICES + '/update', JSON.stringify(serviceDTO), httpOptions).pipe(catchError(this.handleError));
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
