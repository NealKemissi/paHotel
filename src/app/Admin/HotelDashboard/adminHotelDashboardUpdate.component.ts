import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
  selector: "adminHotelDashboardUpdate",
  templateUrl: "./adminHotelDashboardUpdate.component.html",
  styleUrls: ["./adminHotelDashboardUpdate.component.css"]
})
export class AdminHotelDashboardUpdateComponent {
  /***/
  description_general: string;
  description_rooms: string;
  description_events: string;
  description_restaurant: string;
  /***/
  error: string;
  /***/
  loading: boolean = true;
  /***/
  msgUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.getHotelDescription();
  }

  onUpdate() {
    if (!this.msgUpdate) {
      this.msgUpdate = true;
      setTimeout(() => {
        //requete http update ...
        this.router.navigate(["/dashboard"]);
      }, 2500);
    }
  }

  getHotelDescription() {
    this.dashboardService.getPresentationDescription().subscribe(
      data => {
        this.description_general = data;
      },
      error => {
        this.error = "Une erreur s'est produite, " + error.headers.message;
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
