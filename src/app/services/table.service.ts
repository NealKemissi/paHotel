import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Table } from '../models/table';
import { TableDTO } from '../models/dto/tableDTO';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  }).set('Authorization', localStorage.getItem("token"))
};

@Injectable()
export class TableService {

  GET_ALL_TABLE = 'http://localhost:8090/table';
  GET_TABLE = 'http://localhost:8090/table?id=';

  constructor(private http: HttpClient) { }

  /** Retourne la liste de toutes les tables du resto de l'hotel **/
  getAllTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.GET_ALL_TABLE + "?available=1").pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type Table **/
  getTable(table_id : number): Observable<Table> {
    return this.http.get<Table[]>(this.GET_TABLE + table_id)
      .pipe(map(res => res.find(table => table.id == table_id)), 
        catchError(this.handleError));
  }

  /** Créer une Table **/
  createTable(tableDTO : TableDTO): Observable<any> {
    console.log("creating ...");
    return this.http.post(this.GET_ALL_TABLE + '/add', JSON.stringify(tableDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** Met à jour objet de type Table **/
  updateTable(tableDTO : TableDTO): Observable<any> {
    console.log("updating ...");
    return this.http.post(this.GET_ALL_TABLE + '/update', JSON.stringify(tableDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** Gestion  d'erreur **/
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      /** A client-side or network error occurred. Handle it accordingly. **/
      console.error('Une erreur s\'est produite : ', error.error.message);
    } else {
      /** The backend returned an unsuccessful response code. **/
      /** The response body may contain clues as to what went wrong, **/
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    /** return an observable with a user-facing error message **/
    return throwError(
      'Une erreur s\'est produite, veuillez réessayez plus tard.');
  }
}
