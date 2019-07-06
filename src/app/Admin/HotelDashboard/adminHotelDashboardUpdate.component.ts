import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'adminHotelDashboardUpdate',
    templateUrl: './adminHotelDashboardUpdate.component.html',
    styleUrls: ['./adminHotelDashboardUpdate.component.css']
})
export class AdminHotelDashboardUpdateComponent {

    /***/
    error: string;
    /***/
    loading: boolean = true;
    /***/
    msgUpdate: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
    }

    onUpdate() {
        if (!this.msgUpdate) {
            this.msgUpdate = true;
            setTimeout(() => {
                //requete http update ...
                this.router.navigate(['/dashboard']);
            }, 2500);
        }
    }
}
