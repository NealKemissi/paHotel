import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuDishBookingService } from "src/app/services/menu_dish_booking.service";
import { Menu } from "src/app/models/menu";
import { Dishes } from "src/app/models/dishes";
import { DishesDTO } from "src/app/models/dto/dishesDTO";
import { MenuDTO } from "src/app/models/dto/menuDTO";

@Component({
  selector: "adminMenu",
  templateUrl: "./adminMenu.component.html",
  styleUrls: ["./adminMenu.component.css"]
})
export class AdminMenuComponent {
  /** pagination */
  page1: number = 1;
  page2: number = 1;
  page3: number = 1;
  /***/
  menus: Menu[];
  /***/
  filter_menu_name: string;
  /***/
  menu_detail: Dishes[];
  /***/
  menu_detail_id: number = 0;
  /***/
  dishes: Dishes[];
  /***/
  dish_to_delete_id: number;
  /***/
  filter_dish_name: string;
  /***/
  error: string;
  /***/
  msgConfirm: boolean = false;
  /***/
  msgUpdate: boolean = false;
  /***/
  msgCreating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuDishBookingService: MenuDishBookingService
  ) {}

  ngOnInit() {
    this.menuDishBookingService.getAllMenus().subscribe(
      data => {
        (this.menus = data),
          this.menuDishBookingService.getAllDishes().subscribe(
            data => {
              this.dishes = data;
            },
            error => {
              this.error = error;
            }
          );
      },
      error => {
        this.error = error;
      }
    );
  }

  onMenuDetail(menu_id: number) {
    this.msgConfirm = false;
    this.menu_detail = this.dishes.filter(d => d.id_menu == menu_id);
    this.menu_detail_id = menu_id;
  }

  onDishCreate() {
    this.router.navigate(["/adminDishCreate"]);
  }

  onMenuCreate() {
    this.router.navigate(["/adminMenuCreate"]);
  }

  onMenuUpdate() {
    this.router.navigate(["/adminMenuUpdate"], {
      queryParams: { id: this.menu_detail_id }
    });
  }

  onDishDelete(dish_id: number) {
    this.error = undefined;
    this.menu_detail_id = undefined;
    this.menu_detail = undefined;
    this.msgConfirm = true;
    this.dish_to_delete_id = dish_id;
  }

  onMenuDelete() {
    this.error = undefined;
    this.dish_to_delete_id = undefined;
    this.msgConfirm = true;
  }

  onConfirm(value: number) {
    if (value == 0) {
      this.msgConfirm = false;
    } else {
      if (
        this.menu_detail == undefined &&
        this.dish_to_delete_id != undefined
      ) {
        console.log("on va supp le dish");
        this.deleteDish();
      } else if (
        this.menu_detail != undefined &&
        this.dish_to_delete_id == undefined
      ) {
        console.log("on va supprimer le menu");
        this.menuDelete();
      }
    }
  }

  deleteDish() {
    this.msgConfirm = false;
    this.msgUpdate = true;
    let dish_to_delete: Dishes = this.dishes.find(
      d => d.id == this.dish_to_delete_id
    );
    let dishDTO: DishesDTO = new DishesDTO(
      dish_to_delete.id,
      dish_to_delete.name,
      dish_to_delete.price,
      false,
      dish_to_delete.id_dish_type,
      dish_to_delete.id_menu
    );
    this.menuDishBookingService
      .updateDish(dishDTO)
      .subscribe(data => (dishDTO = data), error => (this.error = error));
    this.finish();
  }

  menuDelete() {
    this.msgConfirm = false;
    this.msgUpdate = true;
    this.menu_detail.forEach(dish => {
      this.deleteDishOfMenu(dish.id);
    });
    let menu_to_delete: Menu = this.menus.find(
      m => m.id == this.menu_detail_id
    );
    let menuDTO: MenuDTO = new MenuDTO(
      menu_to_delete.id,
      menu_to_delete.name,
      false
    );
    this.menuDishBookingService
      .updateMenu(menuDTO)
      .subscribe(data => (menuDTO = data), error => (this.error = error));
    this.finish();
  }

  deleteDishOfMenu(id_dish: number) {
    this.msgConfirm = false;
    this.msgUpdate = true;
    let dish_to_delete_of_menu: Dishes = this.dishes.find(d => d.id == id_dish);
    let dishDTO: DishesDTO = new DishesDTO(
      dish_to_delete_of_menu.id,
      dish_to_delete_of_menu.name,
      dish_to_delete_of_menu.price,
      dish_to_delete_of_menu.available,
      dish_to_delete_of_menu.id_dish_type,
      null
    );
    this.menuDishBookingService
      .updateDish(dishDTO)
      .subscribe(data => (dishDTO = data), error => (this.error = error));
  }

  finish() {
    setTimeout(() => {
      //requete http suppression ...
      window.location.reload();
    }, 2500);
  }
}
