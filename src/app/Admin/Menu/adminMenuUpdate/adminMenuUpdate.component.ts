import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuDishBookingService } from "src/app/services/menu_dish_booking.service";
import { MenuDTO } from "src/app/models/dto/menuDTO";
import { Menu } from "src/app/models/menu";
import { Dishes } from "src/app/models/dishes";
import { DishesDTO } from "src/app/models/dto/dishesDTO";

@Component({
  selector: "adminMenuUpdate",
  templateUrl: "./adminMenuUpdate.component.html",
  styleUrls: ["./adminMenuUpdate.component.css"]
})
export class AdminMenuUpdate {
  menu: Menu = new Menu();
  /***/
  menu_detail: Dishes[];
  /***/
  dishes: Dishes[] = [];
  /***/
  all_dishes_of_restaurant: Dishes[] = [];
  /***/
  dishes_to_add: string[] = [];
  /***/
  dish: string;
  /***/
  id_dish_to_delete: number;
  /***/
  error: string;
  /***/
  loading: boolean = false;
  /***/
  msgConfirm: boolean = false;
  /***/
  msgUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuDishBookingService: MenuDishBookingService
  ) {}

  ngOnInit() {
    this.route.queryParams.forEach(params => {
      this.menuDishBookingService.getMenu(params["id"]).subscribe(
        data => {
          this.menu = data;
          this.menuDishBookingService.getAllDishes().subscribe(
            data => {
              this.all_dishes_of_restaurant = data;
              this.menu_detail = this.all_dishes_of_restaurant.filter(
                d => d.id_menu == params["id"]
              );
              /** on clean pour laisser visible uniquement les plats dispos*/
              this.dishes = this.all_dishes_of_restaurant.filter(
                d => d.id_menu == null
              );
            },
            error => {
              this.error = error;
            }
          );
          this.loading = false;
          console.log("menu :" + this.menu.name);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    });
  }

  deleteDishFromMenu(dish_id : number){
    console.log('didddsh : '+dish_id);
    this.id_dish_to_delete = dish_id;
    this.msgConfirm = true;
  }

  onConfirm(value: number){
    if (value == 0) {
      this.msgConfirm = false;
    } else {
      this.msgConfirm = false;
      let dish_to_delete: Dishes = this.all_dishes_of_restaurant.find(d => d.id == this.id_dish_to_delete);
      this.updateDish(dish_to_delete, null);
      this.msgUpdate = true;
      this.finish();
    }
  }

  addTempDish(dish_name: string) {
    if (dish_name != undefined) {
      this.dishes_to_add.push(dish_name);
    }
  }

  deleteTempDish(dish_name: string) {
    let i = this.dishes_to_add.indexOf(dish_name);
    this.dishes_to_add.splice(i, 1);
  }

  onUpdate() {
    this.msgUpdate = true;
    // envoyer le nouveau menu en bdd MAIS EN PLUS SI un plat a été renseigné, on update l'id menu du plat en question
    if (this.menu.name == undefined) {
      this.msgUpdate = false;
      this.error = "Veuillez indiquer le nouveau nom";
    } else {
      let menuDTO: MenuDTO = new MenuDTO(this.menu.id, this.menu.name, true);
      this.menuDishBookingService
        .updateMenu(menuDTO)
        .subscribe(data => (menuDTO = data));
      this.updateAllDishes();
      this.finish();
    }
  }

  updateAllDishes() {
    this.dishes_to_add.forEach(dish => {
      let dish_to_update: Dishes = this.all_dishes_of_restaurant.find(
        d => d.name == dish
      );
      if (dish_to_update != undefined) {
        this.updateDish(dish_to_update, this.menu.id);
      }
    });
  }

  updateDish(dish_to_update: Dishes, id_of_menu: number) {
    let dishDTO: DishesDTO = new DishesDTO(
      dish_to_update.id,
      dish_to_update.name,
      dish_to_update.price,
      dish_to_update.available,
      dish_to_update.id_dish_type,
      id_of_menu
    );
    this.menuDishBookingService
      .updateDish(dishDTO)
      .subscribe(data => (dishDTO = data), error => (this.error = error));
  }

  finish() {
    setTimeout(() => {
      //requete http update ...
      this.router.navigate(["/adminMenu"]);
    }, 2500);
  }
}
