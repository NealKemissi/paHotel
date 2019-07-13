import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuDishBookingService } from "src/app/services/menu_dish_booking.service";
import { Dishes } from "src/app/models/dishes";
import { TableBooking } from "src/app/models/table_booking";
import { TableBookingService } from "src/app/services/table_booking.service";
import { DishBooking } from "src/app/models/dish_booking";
import { TableBookingDTO } from "src/app/models/dto/table_bookingDTO";
import { DishBookingDTO } from "src/app/models/dto/dish_bookingDTO";

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
  all_dishes_of_restaurant: Dishes[] = [];
  /***/
  final_price: number = 0;
  /***/
  name: string;
  /***/
  loading: boolean = false;
  /***/
  error: string;
  /***/
  msgConfirm: boolean = false;
  /***/
  creating: boolean = false;
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
    this.creating = true;
  }

  addDish() {
    let id_dish: number;
    id_dish = this.all_dishes_of_restaurant.find(d => d.name == this.name).id;
    if (id_dish == undefined) {
      this.error = "une erreur s'est produite lors de l'ajout du plat";
    } else {
      this.msgDeleting = true; // --> pour le loading, meme chose que msgCreating
      let dish_bookingDTO: DishBookingDTO = new DishBookingDTO(
        null,
        this.table_booking.id,
        id_dish
      );
      this.menuDishBookingService
        .createDishBooking(dish_bookingDTO)
        .subscribe(
          data => (dish_bookingDTO = data),
          error => ((this.error = error), (this.msgDeleting = false))
        );
      /*** on met à jour la facture (table_booking) à partir des infos de cette page ***/
      this.updateTableBooking();
      setTimeout(() => {
        //requete http creation ...
        this.router.navigate(["/adminRestaurant"]);
      }, 2500);
    }
  }

  updateTableBooking() {
    let new_price =
      this.final_price +
      this.all_dishes_of_restaurant.find(d => d.name == this.name).price;
    let table_bookingDTO: TableBookingDTO = new TableBookingDTO(
      this.table_booking.id,
      this.table_booking.arrival,
      new_price,
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
  }
}
