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
  dish: string;
  /***/
  error: string;
  /***/
  loading: boolean = false;
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
              this.dishes = data;
              this.menu_detail = this.dishes.filter(
                d => d.id_menu == params["id"]
              );
              /** on clean pour laisser visible uniquement les plats dispos*/
              this.dishes = this.dishes.filter(d => d.id_menu == null);
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

  revert() {
    this.dish = undefined;
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
      this.updateDish();
      setTimeout(() => {
        //requete http update ...
        this.router.navigate(["/adminMenu"]);
      }, 2500);
    }
  }

  updateDish() {
    if (this.dish != undefined) {
      var dish_to_add: Dishes;
      var all_dishes: Dishes[];

      this.menuDishBookingService.getAllDishes().subscribe(
        data => {
          dish_to_add = data.find(d => d.name == this.dish);
          let dishDTO: DishesDTO = new DishesDTO(
            dish_to_add.id,
            dish_to_add.name,
            dish_to_add.price,
            dish_to_add.available,
            dish_to_add.id_dish_type,
            this.menu.id
          );
          this.menuDishBookingService
            .updateDish(dishDTO)
            .subscribe(data => (dishDTO = data), error => (this.error = error));
        },
        error => (this.error = error)
      );
    }
  }
}
