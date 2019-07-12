import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ServiceService } from "src/app/services/service.service";
import { Service } from "src/app/models/service";

@Component({
  selector: "hotelServices",
  templateUrl: "./hotelServices.component.html",
  styleUrls: ["./hotelServices.component.css"]
})
export class HotelServicesComponent {
  /** pagination */
  page: number = 1;
  /***/
  services: Service[] = [];
  /***/
  error: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.serviceService
      .getAllServices()
      .subscribe(data => (this.services = data), error => (this.error = error));
  }
}
