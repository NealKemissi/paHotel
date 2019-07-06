import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceBookingService } from 'src/app/services/serviceBooking.service';
import { ServiceBooking } from 'src/app/models/serviceBooking';

@Component({
    selector: 'adminServiceBookingUpdate',
    templateUrl: './adminServiceBookingUpdate.component.html',
    styleUrls: ['./adminServiceBookingUpdate.component.css']
})
export class AdminServiceBookingUpdateComponent {

    /** service */
    service: ServiceBooking = new ServiceBooking();
    /***/
    error: string;
    /***/
    loading: boolean = true;
    /***/
    msgUpdate: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private serviceBookingService: ServiceBookingService) { }

    ngOnInit() {
        this.serviceBookingService.getServiceBooking().subscribe(
            data => {
                this.service = data;
                this.loading = false;
            },
            error => {
                this.error = error;
                this.loading = false;
            });
    }

    onUpdate() {
        if (!this.msgUpdate) {
            console.log("id :" + this.service.id + ", nom :" + this.service.name);
            this.msgUpdate = true;
            setTimeout(() => {
                //requete http update ...
                this.router.navigate(['/adminServiceBookingHome']);
            }, 2500);
        }
    }
}
