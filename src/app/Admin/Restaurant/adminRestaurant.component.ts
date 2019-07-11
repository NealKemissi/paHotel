import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Table } from "src/app/models/table";
import { TableService } from "src/app/services/table.service";
import { TableBooking } from "src/app/models/table_booking";
import { TableBookingService } from "src/app/services/table_booking.service";
import { ServiceBookingDTO } from "src/app/models/dto/service_bookingDTO";
import { TableBookingDTO } from "src/app/models/dto/table_bookingDTO";

@Component({
  selector: "adminRestaurant",
  templateUrl: "./adminRestaurant.component.html",
  styleUrls: ["./adminRestaurant.component.css"]
})
export class AdminRestaurantComponent {
  /***/
  tables: Table[] = [];
  /***/
  tables_booking: TableBooking[] = [];
  /***/
  table_info: TableBooking;
  /***/
  id: number = 0;
  /***/
  is_eating_now: boolean = false;
  /***/
  error: string;
  /***/
  loading: boolean = false;
  /***/
  restaurant = []; // objet table
  /***/
  msgConfirm: boolean = false;
  /***/
  msgDeleting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tableService: TableService,
    private tableBookingService: TableBookingService
  ) {}

  ngOnInit() {
    this.tableService.getAllTables().subscribe(
      data => {
        (this.tables = data),
          this.tableBookingService.getAllTablesBooking().subscribe(
            data => {
              this.tables_booking = data;
            },
            error => {
              this.error = error;
            }
          );
        console.log("id table :" + this.tables[0].id);
        this.loadMapRestaurant();
      },
      error => {
        this.error = error;
      }
    );
  }

  loadMapRestaurant() {
    for (var i: number = 0; i < Math.sqrt(this.tables.length); i++) {
      // 25 tables => resto 5x5, 36 tables => resto 6x6 etc..
      this.restaurant.push([]);
      for (var j: number = 0; j < Math.sqrt(this.tables.length); j++) {
        this.setCoordonates(i, j);
      }
    }
  }

  setCoordonates(i: number, j: number) {
    //console.log("for (" + i + ", " + j + ")");
    let table: Table = this.tables.find(t => t.x_pos == i && t.y_pos == j);
    if (table !== undefined) {
      //console.log("setting table n°" + table.id);
      this.restaurant[i][j] = table;
      //console.log("ok");
    }
  }

  onTableBookingDetail(id_table: number) {
    this.id = id_table;
    this.table_info = this.tables_booking.find(
      t => t.id_table == id_table && t.done == false
    );
    if (this.table_info != undefined) {
      this.checkIfTableAvailable();
    }
  }

  checkIfTableAvailable() {
    var now: Date = new Date();
    var date_table_booking = new Date(this.table_info.arrival);
    if (now.getHours() == date_table_booking.getUTCHours()) {
      this.is_eating_now = true;
    } else this.is_eating_now = false;
  }

  onCreate(){
    this.router.navigate(["/adminRestaurantBookingCreate"], {queryParams: { id: this.id }});
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
        this.table_info.id,
        this.table_info.arrival,
        this.table_info.total_price,
        true,
        this.table_info.id_table,
        this.table_info.id_hotel_booking,
        this.table_info.id_booking
      );

      this.tableBookingService
        .updateTableBooking(table_bookingDTO)
        .subscribe(
          data => (table_bookingDTO = data),
          error => (this.error = error)
        );
      setTimeout(() => {
        //requete http suppression ...
        window.location.reload();
      }, 2500);
    }
  }
}
