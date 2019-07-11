import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TableBookingService } from "src/app/services/table_booking.service";
import { BookingService } from "src/app/services/booking.service";
import { Booking } from "src/app/models/booking";
import { TableBookingDTO } from "src/app/models/dto/table_bookingDTO";

@Component({
  selector: "adminRestaurantBookingCreate",
  templateUrl: "./adminRestaurantBookingCreate.component.html",
  styleUrls: ["./adminRestaurantBookingCreate.component.css"]
})
export class AdminRestaurantBookingCreate {
  /** id Table **/
  id_table: number = 0;
  /***/
  arrival: string;
  /***/
  total_price: number;
  /***/
  id_booking: number;
  /***/
  error: string;
  /***/
  loading: boolean = false;
  /***/
  msgCreating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tableBookingService: TableBookingService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.route.queryParams.forEach(params => {
      this.id_table = params["id"];
    });
  }

  preventInput() {
    let value = this.total_price;
    if (value >= 100) {
      event.preventDefault();
      this.total_price = parseInt(value.toString().substring(0, 2));
    } else if (value <= -1) {
      event.preventDefault();
      this.total_price = 0;
    }
  }

  onCreate() {
    this.msgCreating = true;
    let booking: Booking;
    this.bookingService.getBooking(this.id_booking).subscribe(
      data => {
        booking = data;
        this.createTableBooking(booking);
      },
      error => {
        this.error = error;
        this.msgCreating = false;
      }
    );
  }

  createTableBooking(booking: Booking) {
    if (booking == undefined) {
      this.msgCreating = false;
      this.error =
        "la réservation n'éxiste pas, veuillez renseigner un ID valide";
    } else {
      this.error = undefined;
      let table_bookingDTO: TableBookingDTO = new TableBookingDTO(
        null,
        this.arrival,
        0,
        false,
        this.id_table,
        1,
        1
      );
      this.tableBookingService
        .createTableBooking(table_bookingDTO)
        .subscribe(
          data => (table_bookingDTO = data),
          error => (this.error = error)
        );
      setTimeout(() => {
        //requete http create ...
        this.router.navigate(["/adminRestaurant"]);
      }, 2500);
    }
  }
}
