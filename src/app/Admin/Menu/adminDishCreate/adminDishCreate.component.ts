import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuDishBookingService } from "src/app/services/menu_dish_booking.service";
import { Menu } from "src/app/models/menu";
import { DishesDTO } from "src/app/models/dto/dishesDTO";

@Component({
  selector: "adminDishCreate",
  templateUrl: "./adminDishCreate.component.html",
  styleUrls: ["./adminDishCreate.component.css"]
})
export class AdminDishCreate {
  name: string;
  /***/
  price: number;
  /***/
  dish_type: string;
  /***/
  id_dish_type: number;
  /***/
  menu_name: string;
  /***/
  all_menus_of_restaurant: Menu[] = [];
  /***/
  error: string;
  /***/
  loading: boolean = false;
  /***/
  msgCreating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuDishBookingService: MenuDishBookingService
  ) {}

  ngOnInit() {
    /** tout les menus disponnibles, si le client veut ajouter des plats à sa commande */
    this.menuDishBookingService.getAllMenus().subscribe(
      data => {
        this.all_menus_of_restaurant = data;
      },
      error => {
        this.error = error;
      }
    );
  }

  preventInputPrice() {
    let value = this.price;
    if (value >= 100) {
      event.preventDefault();
      this.price = parseInt(value.toString().substring(0, 2));
    } else if (value <= -1) {
      event.preventDefault();
      this.price = 0;
    }
  }

  onCreate() {
    this.error = undefined;
    this.msgCreating = true;
    if (this.dish_type == "Entrée") {
      this.id_dish_type = 1;
    } else if (this.dish_type == "Plat") {
      this.id_dish_type = 2;
    } else this.id_dish_type = 3;

    if (
      this.name == undefined ||
      this.price == undefined ||
      this.id_dish_type == undefined
    ) {
      this.error = "Tous les champs doivent etre remplis !";
    } else {
      if (this.menu_name != undefined) {
        let id_menu : number = this.all_menus_of_restaurant.find(m => m.name == this.menu_name).id;
        let menu: Menu;
        this.menuDishBookingService.getMenu(id_menu).subscribe(
          data => {
            menu = data;
            this.createDish(id_menu);
          },
          error => {
            this.error = error;
            this.msgCreating = false;
          }
        );
      } else {
        this.createDish(null);
      }
    }
  }

  createDish(id_menu: number) {
    this.error = undefined;
    let dishDTO: DishesDTO = new DishesDTO(
      null,
      this.name,
      this.price,
      true,
      this.id_dish_type,
      id_menu
    );
    this.menuDishBookingService
      .createDish(dishDTO)
      .subscribe(data => (dishDTO = data), error => (this.error = error));
    setTimeout(() => {
      //requete http create ...
      this.router.navigate(["/adminMenu"]);
    }, 2500);
  }
}
