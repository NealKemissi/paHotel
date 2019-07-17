import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard.service";
import { Dashboard } from "src/app/models/dashboard";
import { DashboardDTO } from "src/app/models/dto/dashboardDTO";

@Component({
  selector: "adminHotelDashboardUpdate",
  templateUrl: "./adminHotelDashboardUpdate.component.html",
  styleUrls: ["./adminHotelDashboardUpdate.component.css"]
})
export class AdminHotelDashboardUpdateComponent {
  /***/
  dashboard: Dashboard;
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
      let dashboardDTO: DashboardDTO = new DashboardDTO(
        this.dashboard.id,
        this.dashboard.presentation,
        this.dashboard.rooms,
        this.dashboard.events,
        this.dashboard.services,
        this.dashboard.restaurant
      )
      this.dashboardService.updateHotelDescription(dashboardDTO).subscribe(
        data => {
          dashboardDTO = data,
          setTimeout(() => {
            //requete http update ...
            this.router.navigate(["/dashboard"]);
          }, 2500);
        }, error => {
          this.error = error;
          this.msgUpdate = false;
        }
      )
      
      
    }
  }

  getHotelDescription() {
    this.dashboardService.getHotelDescription(1).subscribe(
      data => {
        this.dashboard = data;
      },
      error => {
        this.error = "Une erreur s'est produite, " + error.headers.message;
        //console.log('rien trouvé '+JSON.stringify(error));
      }
    );
  }
}
