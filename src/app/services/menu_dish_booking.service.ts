import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Menu } from '../models/menu';
import { Dishes } from '../models/dishes';
import { DishesDTO } from '../models/dto/dishesDTO';
import { MenuDTO } from '../models/dto/menuDTO';
import { DishBooking } from '../models/dish_booking';
import { DishBookingDTO } from '../models/dto/dish_bookingDTO';

var httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-type':'application/json'
  }).set('Authorization', localStorage.getItem("token"))
};

@Injectable()
export class MenuDishBookingService {

  GET_ALL_MENU = 'http://localhost:8090/menu';
  GET_MENU = 'http://localhost:8090/menu?id=';
  /***/
  GET_ALL_DISHES = 'http://localhost:8090/dish';
  GET_DISH = 'http://localhost:8090/dish?id=';
  GET_DISHES_OF_MENU = 'http://localhost:8090/dish?id_menu=';
  /***/
  GET_ALL_DISHES_BOOKING = 'http://localhost:8090/dish_booking';
  GET_DISH_BOOKING = 'http://localhost:8090/dish_booking?id=';

  constructor(private http: HttpClient) { }

  /********************************************** MENU *****************************************************************/

  /** Retourne la liste de tous les menus de l'hotel **/
  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.GET_ALL_MENU).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type Menu **/
  getMenu(menu_id : number): Observable<Menu> {
    return this.http.get<Menu[]>(this.GET_MENU + menu_id)
      .pipe(map(res => res.find(menu => menu.id == menu_id)), 
        catchError(this.handleError));
  }

  /** creer un menu */
  createMenu(menuDTO : MenuDTO): Observable<any> {
    console.log("creating ...");
    return this.http.post(this.GET_ALL_MENU + '/add', JSON.stringify(menuDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** modifie un menu */
  updateMenu(menuDTO : MenuDTO): Observable<any> {
    console.log("updatating ...");
    return this.http.post(this.GET_ALL_MENU + '/update', JSON.stringify(menuDTO), httpOptions).pipe(catchError(this.handleError));
  }


  /********************************************** DISH *****************************************************************/

  /** Retourne la liste de tous les plats de l'hotel **/
  getAllDishes(): Observable<Dishes[]> {
    return this.http.get<Dishes[]>(this.GET_ALL_DISHES).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type Dishes **/
  getDish(dish_id : number): Observable<Dishes> {
    return this.http.get<Dishes[]>(this.GET_DISH + dish_id)
      .pipe(map(res => res.find(dish => dish.id == dish_id)), 
        catchError(this.handleError));
  }

  /** Retourne la liste de tous les plats d'un menu **/
  getDishesOfMenu(menu_id : number): Observable<Dishes[]> {
    return this.http.get<Dishes[]>(this.GET_DISHES_OF_MENU + menu_id).pipe(catchError(this.handleError));
  }

  /** creer un plat */
  createDish(dishDTO : DishesDTO): Observable<any> {
    console.log("creating ...");
    return this.http.post(this.GET_ALL_DISHES + '/add', JSON.stringify(dishDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /** met à jour un plat */
  updateDish(dishDTO : DishesDTO): Observable<any> {
    console.log("udpating ...");
    return this.http.post(this.GET_ALL_DISHES + '/update', JSON.stringify(dishDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /********************************************** DISH_BOOKINGS *****************************************************************/

  /** Retourne la liste de toutes les commandes de l'hotel **/
  getAllDishesBooking(): Observable<DishBooking[]> {
    return this.http.get<DishBooking[]>(this.GET_ALL_DISHES_BOOKING).pipe(catchError(this.handleError));
  }

  /** Retourne un objet de type DishBOOKING **/
  getDishBooking(dish_booking_id : number): Observable<DishBooking> {
    return this.http.get<DishBooking[]>(this.GET_DISH_BOOKING + dish_booking_id)
      .pipe(map(res => res.find(dish_booking => dish_booking.id == dish_booking_id)), 
        catchError(this.handleError));
  }

  /** recupère toutes les commandes d'une table */
  getAllDishesBookingOfATableBooking(id_table_booking : number): Observable<DishBooking[]> {
    return this.http.get<DishBooking[]>(this.GET_ALL_DISHES_BOOKING)
    .pipe(map(res => res.filter(dish_booking => dish_booking.id_table_booking == id_table_booking)), 
        catchError(this.handleError));
  }

  /** créer une commande de plat */
  createDishBooking(dish_bookingDTO : DishBookingDTO): Observable<any> {
    console.log("udpating ...");
    console.log(JSON.stringify(dish_bookingDTO));
    return this.http.post(this.GET_ALL_DISHES_BOOKING + '/add', JSON.stringify(dish_bookingDTO), httpOptions).pipe(catchError(this.handleError));
  }

  /***************************************************************************************************************/

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
