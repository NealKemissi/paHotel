import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Table } from "src/app/models/table";
import { TableService } from "src/app/services/table.service";
import { TableDTO } from "src/app/models/dto/tableDTO";

@Component({
  selector: "adminRestaurantTable",
  templateUrl: "./adminRestaurantTable.component.html",
  styleUrls: ["./adminRestaurantTable.component.css"]
})
export class AdminRestaurantTableComponent {
  /** pagination */
  page: number = 1;
  /***/
  tables: Table[] = [];
  /***/
  id_table_to_delete: number;
  /***/
  error: string;
  /***/
  loading: boolean = false;
  /***/
  msgConfirm: boolean = false;
  /***/
  msgCreateConfirm: boolean = false;
  /***/
  msgUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.tableService.getAllTables().subscribe(
      data => {
        this.tables = data;
        console.log("id table :" + this.tables[0].id);
      },
      error => {
        this.error = error;
      }
    );
  }

  onDelete(id_table_to_delete: number) {
    this.error = undefined;
    this.msgConfirm = true;
    this.msgCreateConfirm = false;
    this.id_table_to_delete = id_table_to_delete;
  }

  onConfirm(value: number) {
    this.msgConfirm = false;
    if (value != 0) {
      this.msgUpdate = true;
      let table: Table = this.tables.find(t => t.id == this.id_table_to_delete);
      let table_to_delete: TableDTO = new TableDTO(
        table.id,
        table.x_pos,
        table.y_pos,
        0
      );
      this.tableService.updateTable(table_to_delete).subscribe(
        data => {
          (table_to_delete = data), this.finish();
        },
        error => {
          (this.error = error), (this.msgUpdate = false);
        }
      );
    }
  }

  onAdd() {
    this.error = undefined;
    this.msgConfirm = false;
    this.msgCreateConfirm = true;
  }

  onAddConfirm(value: number) {
    this.msgCreateConfirm = false;
    if (value != 0) {
      this.msgUpdate = true;
      let table_to_add: TableDTO = new TableDTO(null, 5, 0, 1);
      this.tableService.createTable(table_to_add).subscribe(
        data => {
          (table_to_add = data), this.finish();
        },
        error => {
          (this.error = error), (this.msgUpdate = false);
        }
      );
    }
  }

  finish() {
    setTimeout(() => {
      this.router.navigate(["/adminRestaurant"]);
    }, 2500);
  }
}
