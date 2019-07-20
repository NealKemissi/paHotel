import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Service } from "src/app/models/service";
import { ServiceService } from "src/app/services/service.service";
import { ServiceDTO } from "src/app/models/dto/serviceDTO";

@Component({
  selector: "adminServiceHome",
  templateUrl: "./adminServiceHome.component.html",
  styleUrls: ["./adminServiceHome.component.css"]
})
export class adminServiceHomeComponent {
  /** pagination */
  page: number = 1;
  /** utilisateurs */
  services: Service[] = [];
  /** detail utilisateur */
  id_service_to_delete: number;
  /***/
  nameDTO: string;
  /***/
  descriptionDTO: string;
  /***/
  priceDTO: number;
  /***/
  error: string;
  /***/
  msgConfirm: boolean = false;
  /***/
  msgCreating: boolean = false;

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

  onUpdate(id_service: number) {
    this.router.navigate(["/adminServiceUpdate"], {
      queryParams: { id: id_service }
    });
  }

  onDelete(id_service: number) {
    this.msgConfirm = true;
    this.id_service_to_delete = id_service;
    console.log('service to delete : '+this.id_service_to_delete)
  }

  onConfirm(value: number) {
    if (value == 0) {
      this.msgConfirm = false;
    } else {
      let service_to_delete: Service = this.services.find(
        s => s.id == this.id_service_to_delete
      );
      this.msgConfirm = false;
      this.error = undefined;
      this.msgCreating = true;
      console.log('service to delete : '+service_to_delete.id)
      let service: ServiceDTO = new ServiceDTO(
        service_to_delete.id,
        service_to_delete.name,
        service_to_delete.description,
        service_to_delete.price,
        0
      );
      this.serviceService
        .updateService(service)
        .subscribe(data => (service = data), error => (this.error = error));
      this.finish();
    }
  }

  onCreate() {
    if (
      this.nameDTO == undefined ||
      this.descriptionDTO == undefined ||
      this.priceDTO == undefined
    ) {
      this.error = "Tous les champs obligatoires doivent être remplis !";
    } else {
      this.error = undefined;
      this.msgCreating = true;
      console.log("nom :" + this.nameDTO);
      let service: ServiceDTO = new ServiceDTO(
        null,
        this.nameDTO,
        this.descriptionDTO,
        this.priceDTO,
        1
      );
      this.serviceService
        .createService(service)
        .subscribe(data => (service = data), error => (this.error = error));
      this.finish();
    }
  }

  preventInput() {
    let value = this.priceDTO;
    if (value >= 100) {
      event.preventDefault();
      this.priceDTO = parseInt(value.toString().substring(0, 2));
    } else if (value <= -1) {
      event.preventDefault();
      this.priceDTO = 0;
    }
  }

  finish() {
    setTimeout(() => {
      //requete http create + update ...
      this.router.navigate(["/adminHome"]);
    }, 2500);
  }
}
