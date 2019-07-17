import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Dashboard } from "../models/dashboard";
import { DashboardDTO } from "../models/dto/dashboardDTO";

var httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json"
  }).set("Authorization", localStorage.getItem("token"))
};

@Injectable()
export class DashboardService {
  GET_HOTEL_DESCRIPTION = "http://localhost:8090/dashboard";

  constructor(private http: HttpClient) {}

  /** Retourne la présentation d'intro de l'hotel **/
  getHotelDescription(id: number): Observable<Dashboard> {
    return this.http.get<Dashboard[]>(this.GET_HOTEL_DESCRIPTION)
      .pipe(map(res => res.find(dashboard => dashboard.id == id)), 
        catchError(this.handleError));
  }

  /** update la présentation d'intro de l'hotel **/
  updateHotelDescription(dashboardDTO : DashboardDTO): Observable<any> {
    console.log("updating ...");
    return this.http.post(this.GET_HOTEL_DESCRIPTION + '/update', JSON.stringify(dashboardDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** Gestion  d'erreur **/
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      /** A client-side or network error occurred. Handle it accordingly. **/
      console.error("Une erreur s'est produite : ", error.error.message);
    } else {
      /** The backend returned an unsuccessful response code. **/
      /** The response body may contain clues as to what went wrong, **/
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.message}`
      );
    }
    /** return an observable with a user-facing error message **/
    return throwError(
      "Une erreur s'est produite, veuillez réessayez plus tard."
    );
  }
}
