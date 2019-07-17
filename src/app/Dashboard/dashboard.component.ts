import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "../services/dashboard.service";
import { Dashboard } from "../models/dashboard";
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
  dashboard: Dashboard;
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
    this.dashboardService.getHotelDescription(1).subscribe(
      data => {
        this.dashboard = data;
        console.log('dashboard : '+this.dashboard.presentation)
      },
      error => {
        this.error = "Une erreur s'est produite, " + error.headers.message;
        //console.log('rien trouvé '+JSON.stringify(error));
      }
    );
  }
}
