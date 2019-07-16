import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "../services/dashboard.service";
//import { global } from '../globals';

@Component({
  selector: "my-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent {
  token: string = localStorage.getItem("token");
  is_admin: boolean =
    localStorage.getItem("admin") == undefined ||
    localStorage.getItem("admin") == "0"
      ? false
      : true;
  id_user: number = parseInt(localStorage.getItem("id"));
  /***/
  description_general: string;
  description_rooms: string;
  description_events: string;
  description_restaurant: string;
  /***/
  error: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.getHotelDescription();
  }

  onNavigateLogin(): void {
    this.router.navigate(["/login"]);
  }

  onEditDashboard(): void {
    if (true == true) {
      this.router.navigate(["/adminHotelDashboardUpdate"]);
    }
  }

  getHotelDescription() {
    this.dashboardService.getPresentationDescription().subscribe(
      data => {
        this.description_general = data;
      },
      error => {
        this.error = "Une erreur s'est produite, " + error.headers.message;
        //console.log('rien trouvé '+JSON.stringify(error));
      }
    );
    this.dashboardService.getRoomsDescription().subscribe(
      data => {
        this.description_rooms = data;
      },
      error => {
        this.error = "Une erreur s'est produite, " + error.headers.message;
      }
    );
    this.dashboardService.getEventsDescription().subscribe(
      data => {
        this.description_events = data;
      },
      error => {
        this.error = "Une erreur s'est produite, " + error.headers.message;
      }
    );
    this.dashboardService.getRestaurantDescription().subscribe(
      data => {
        this.description_restaurant = data;
      },
      error => {
        this.error = "Une erreur s'est produite, " + error.headers.message;
      }
    );
  }
}
