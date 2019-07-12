import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuDishBookingService } from "src/app/services/menu_dish_booking.service";
import { MenuDTO } from "src/app/models/dto/menuDTO";

@Component({
  selector: "adminMenuCreate",
  templateUrl: "./adminMenuCreate.component.html",
  styleUrls: ["./adminMenuCreate.component.css"]
})
export class AdminMenuCreate {
  name: string;
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

  onCreate() {
    if (this.name == undefined) {
      this.error = "Tous les champs doivent etre remplis !";
    } else {
      this.msgCreating = true;
      this.createMenu();
    }
  }

  createMenu() {
    this.error = undefined;
    let menuDTO: MenuDTO = new MenuDTO(null, this.name, true);
    this.menuDishService
      .createMenu(menuDTO)
      .subscribe(data => (menuDTO = data), error => (this.error = error));
    setTimeout(() => {
      //requete http create ...
      this.router.navigate(["/adminMenu"]);
    }, 2500);
  }
}
