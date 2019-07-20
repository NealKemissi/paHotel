import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuDishBookingService } from "src/app/services/menu_dish_booking.service";
import { Dishes } from "src/app/models/dishes";
import { TableBooking } from "src/app/models/table_booking";
import { TableBookingService } from "src/app/services/table_booking.service";
import { DishBooking } from "src/app/models/dish_booking";
import { TableBookingDTO } from "src/app/models/dto/table_bookingDTO";
import { DishBookingDTO } from "src/app/models/dto/dish_bookingDTO";
import { Menu } from "src/app/models/menu";

@Component({
  selector: "adminRestaurantOrder",
  templateUrl: "./adminRestaurantOrder.component.html",
  styleUrls: ["./adminRestaurantOrder.component.css"]
})
export class AdminRestaurantOrderComponent {
  table_booking: TableBooking;
  /***/
  dishs_booking_of_the_table: DishBooking[] = [];
  /***/
  dishes_of_the_table: Dishes[] = [];
  /***/
  dishes_to_add: string[] = [];
  /***/
  all_dishes_of_restaurant: Dishes[] = [];
  /***/
  all_menus_of_restaurant: Menu[] = [];
  /***/
  final_price: number = 0;
  /***/
  name: string;
  /***/
  menu_name: string;
  /***/
  loading: boolean = false;
  /***/
  error: string;
  /***/
  msgConfirm: boolean = false;
  /***/
  creating: boolean = false;
  /***/
  creatingMenu: boolean = false;
  /***/
  msgDeleting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuDishBookingService: MenuDishBookingService,
    private tableBookingService: TableBookingService
  ) {}

  ngOnInit() {
    this.route.queryParams.forEach(params => {
      this.tableBookingService.getTableBooking(params["id"]).subscribe(
        data => {
          this.table_booking = data;
          this.loading = false;
          this.menuDishBookingService
            .getAllDishesBookingOfATableBooking(this.table_booking.id)
            .subscribe(
              data => {
                this.dishs_booking_of_the_table = data;
                this.loadDishesOfTableBooking();
              },
              error => {
                this.error = error;
                this.loading = false;
              }
            );
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    });
    /** tout les plats disponnibles, si le client veut ajouter un plat à sa commande */
    this.menuDishBookingService.getAllDishes().subscribe(
      data => {
        this.all_dishes_of_restaurant = data;
      },
      error => {
        this.error = error;
      }
    );
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

  loadDishesOfTableBooking() {
    this.dishs_booking_of_the_table.forEach(b => {
      this.menuDishBookingService.getDish(b.id_dish).subscribe(
        data => {
          let dish = data;
          this.dishes_of_the_table.push(dish);
          this.calculPrice(dish.price);
        },
        error => {
          this.error = error;
        }
      );
    });
  }

  calculPrice(price_dish: number) {
    this.final_price = this.final_price + price_dish;
  }

  onDelete() {
    this.msgConfirm = true;
  }

  onConfirm(value: number) {
    this.msgConfirm = false;
    if (value != 0) {
      this.msgConfirm = false;
      this.msgDeleting = true;

      let table_bookingDTO: TableBookingDTO = new TableBookingDTO(
        this.table_booking.id,
        this.table_booking.arrival,
        this.final_price,
        true,
        this.table_booking.id_table,
        this.table_booking.id_hotel_booking
      );

      this.tableBookingService
        .updateTableBooking(table_bookingDTO)
        .subscribe(
          data => (table_bookingDTO = data),
          error => (this.error = error)
        );
      setTimeout(() => {
        //requete http suppression ...
        this.router.navigate(["/adminRestaurant"]);
      }, 2500);
    } else this.msgConfirm = false;
  }

  onAdd() {
    this.creatingMenu = false;
    this.creating = true;
  }

  onAddMenu() {
    this.creating = false;
    this.creatingMenu = true;
  }

  addTempDish(dish_name: string) {
    if (dish_name != undefined) {
        this.dishes_to_add.push(dish_name);
    }
  }

  addTempMenu(menu_name: string){
    console.log('menu temp :'+menu_name);
    let id_menu : number = this.all_menus_of_restaurant.find(
      m => m.name == menu_name
    ).id;
    this.all_dishes_of_restaurant.forEach(
      d => {
        if(d.id_menu == id_menu){
          this.addTempDish(d.name)
        }
      } 
    )
  }

  deleteTempDish(dish_name: string) {
    let i = this.dishes_to_add.indexOf(dish_name);
    this.dishes_to_add.splice(i, 1);
  }

  createOrder(){
    this.error = undefined;
    this.dishes_to_add.forEach(dish => {
      let dish_to_add : Dishes = this.all_dishes_of_restaurant.find(
        d => d.name == dish
      );
      if(dish_to_add.id == undefined){
        this.error = "une erreur s'est produite lors de l'ajout du plat";
      } else {
        this.final_price += dish_to_add.price;
        this.msgDeleting = true; // --> pour le loading, meme chose que msgCreating
        let dish_bookingDTO: DishBookingDTO = new DishBookingDTO(
          null,
          this.table_booking.id,
          dish_to_add.id
        );
        this.menuDishBookingService
        .createDishBooking(dish_bookingDTO)
        .subscribe(
          data => (dish_bookingDTO = data),
          error => ((this.error = error), (this.msgDeleting = false))
        );
      }
    })
    /*** on met à jour la facture (table_booking) à partir des infos de cette page ***/
    let table_bookingDTO: TableBookingDTO = new TableBookingDTO(
      this.table_booking.id,
      this.table_booking.arrival,
      this.final_price,
      false,
      this.table_booking.id_table,
      this.table_booking.id_hotel_booking
    );
    this.tableBookingService
      .updateTableBooking(table_bookingDTO)
      .subscribe(
        data => (table_bookingDTO = data),
        error => (this.error = error)
      );
      this.finish();
  }

  
  finish(){
    setTimeout(() => {
      //requete http creation ...
      this.router.navigate(["/adminRestaurant"]);
    }, 2500);
  }
}
