import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceBooking } from 'src/app/models/serviceBooking';
import { ServiceBookingService } from 'src/app/services/serviceBooking.service';

@Component({
  selector: 'adminServiceBookingHome',
  templateUrl: './adminServiceBookingHome.component.html',
  styleUrls: ['./adminServiceBookingHome.component.css']
})
export class AdminServiceBookingHomeComponent {

  /** utilisateurs */
  services: ServiceBooking[] = [];
  /** detail utilisateur */
  serviceBooking: ServiceBooking;
  /***/
  error: string;
  /***/
  msgConfirm: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private serviceBookingService: ServiceBookingService) { }

  ngOnInit() {
    this.serviceBookingService.getAllServicesBooking().subscribe(data => this.services = data, error => this.error = error);
  }

  onDelete() {
    this.msgConfirm = true;
}

onConfirm(value : number) {
    if(value == 0){
        this.msgConfirm = false;
    } else {
        //requete http suppression ...
        this.router.navigate(['/adminHome']);
    }
}
}
