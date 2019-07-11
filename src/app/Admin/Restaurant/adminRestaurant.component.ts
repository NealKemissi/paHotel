import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Table } from "src/app/models/table";
import { TableService } from "src/app/services/table.service";

@Component({
  selector: "adminRestaurant",
  templateUrl: "./adminRestaurant.component.html",
  styleUrls: ["./adminRestaurant.component.css"]
})
export class AdminRestaurantComponent {
  /***/
  tables: Table[] = [];
  /***/
  error: string;
  /***/
  loading: boolean = false;
  /***/
  restaurant = []; // objet table
  /** pagination */
  page: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.tableService.getAllTables().subscribe(
      data => {
        this.tables = data,
        console.log('id table :'+this.tables[0].id)
        this.loadMapRestaurant();
      },
      error => {
        this.error = error;
      }
    );
    //this.tables.forEach(t => console.log("id table : " + t.id));
  }

  loadMapRestaurant() {
    for (var i: number = 0; i < Math.sqrt(this.tables.length); i++) { // 25 tables => resto 5x5, 36 tables => resto 6x6 etc..
      this.restaurant.push([]);
      for (var j: number = 0; j < Math.sqrt(this.tables.length); j++) {
        this.setCoordonates(i, j);
      }
    }
  }

  setCoordonates(i: number, j: number) {
    console.log('for ('+i+', '+j+')');
    let table: Table = this.tables.find(t =>
      t.x_pos == i && t.y_pos == j);
      if(table !== undefined){
        console.log('seting table n°'+table.id);
        this.restaurant[i][j] = table;
        console.log('ok');
      }
  }
}
