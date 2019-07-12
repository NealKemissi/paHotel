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
  price:number;
  /***/
  dish_type:string;
  /***/
  id_dish_type:number;
  /***/
  id_menu: number;
  /***/
  error: string;
  /***/
  loading: boolean = false;
  /***/
  msgCreating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuDishService: MenuDishBookingService
  ) {}

  ngOnInit() {}

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

  preventInputMenu() {
    let value = this.id_menu;
    if (value >= 100) {
      event.preventDefault();
      this.id_menu = parseInt(value.toString().substring(0, 2));
    } else if (value <= -1) {
      event.preventDefault();
      this.id_menu = 0;
    }
  }

  onCreate(){
    this.msgCreating = true;
      if(this.dish_type == 'Entrée'){
        this.id_dish_type = 1;
      } else if(this.dish_type == 'Plat'){
        this.id_dish_type = 2;
      } else this.id_dish_type = 3;

      


      if(this.name == undefined || this.price == undefined || this.id_dish_type == undefined){
          this.error = 'Tous les champs doivent etre remplis !'
      } else {
        if(this.id_menu != undefined){
            let menu: Menu;
            this.menuDishService.getMenu(this.id_menu).subscribe(
              data => {
                menu = data;
                this.createDish(this.id_menu);
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

  createDish(id_menu: number){    
    this.error = undefined;
      let dishDTO: DishesDTO = new DishesDTO(
        null,
        this.name,
        this.price,
        true,
        this.id_dish_type,
        id_menu
      );
      this.menuDishService
        .createDish(dishDTO)
        .subscribe(
          data => (dishDTO = data),
          error => (this.error = error)
        );
      setTimeout(() => {
        //requete http create ...
        this.router.navigate(["/adminMenu"]);
      }, 2500);
      
  }
}
