import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Service } from "src/app/models/service";
import { ServiceBooking } from "src/app/models/service_booking";
import { ServiceService } from "src/app/services/service.service";
import { ServiceBookingService } from "src/app/services/service_booking.service";
import { ServiceBookingDTO } from "src/app/models/dto/service_bookingDTO";

@Component({
  selector: "adminAddServiceBooking",
  templateUrl: "./adminAddServiceBooking.component.html",
  styleUrls: ["./adminAddServiceBooking.component.css"]
})
export class AdminAddServiceBookingComponent {
  /** services booking */
  services_booking: ServiceBooking[];
  /***/
  allServicesAvailable: Service[] = [];
  /***/
  services: Service[] = [];
  /***/
  name: string;
  /***/
  error: string;
  /***/
  loading: boolean = true;
  /***/
  msgConfirm: boolean = false;
  /***/
  msgUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private serviceBookingService: ServiceBookingService
  ) {}

  ngOnInit() {
    this.route.queryParams.forEach(params => {
      this.serviceBookingService
        .getAllServicesBookingsByIdBooking(params["id"])
        .subscribe(
          data => {
            this.services_booking = data;
            this.loading = false;
            this.loadAllServicesOfUserFromServicesBooking();
          },
          error => {
            this.error = error;
            this.loading = false;
          }
        );
    });
    this.serviceService.getAllServices().subscribe(
      data => {
        this.allServicesAvailable = data;
        this.loading = false;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  /** chargement de toute les services... */
  loadAllServicesOfUserFromServicesBooking() {
    this.services_booking.forEach(v => {
      console.log("service :  n : " + v.id_service);
      this.serviceService.getService(v.id_service).subscribe(
        data => {
          let service: Service = data;
          console.log("event n : " + service.id);
          this.services.push(service);
        },
        error => {
          this.error = error;
        }
      );
    });
  }

  deleteServiceFromBooking() {
    this.msgConfirm = true;
  }

  onConfirm(value: number) {
    if (value == 0) {
      this.msgConfirm = false;
    } else {
      this.msgConfirm = false;

      var id: string;
      this.route
      .queryParams
      .subscribe(params => {
        id = params['id'];
      });
      this.msgUpdate = true;
      setTimeout(() => {
        //requete http suppression ...
        this.router.navigate(['/adminBookingDetail'], {queryParams : { id: id } });
    }, 2500);
    }
  }

  addService(){
    var id_booking: string;
    this.route
    .queryParams
    .subscribe(params => {
        id_booking = params['id'];
    });
    let service: Service = this.allServicesAvailable.find(s => s.name == this.name);
    let service_booking: ServiceBookingDTO = new ServiceBookingDTO(null, null, null, service.id, parseInt(id_booking));
    console.log('service id '+service.id+', id_booking '+parseInt(id_booking));
    this.serviceBookingService.createServiceBooking(service_booking);
    this.msgUpdate = true;
    setTimeout(() => {
        //requete http create ...
        this.router.navigate(['/adminBookingDetail'], {queryParams : { id: id_booking } });
    }, 2500);
  }
}
