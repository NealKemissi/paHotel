import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'adminEventUpdate',
    templateUrl: './adminEventUpdate.component.html',
    styleUrls: ['./adminEventUpdate.component.css']
})
export class AdminEventUpdateComponent {

    /** évenement */
    event: Event = new Event();
    /***/
    error: string;
    /***/
    loading: boolean = true;
    /***/
    msgUpdate: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) { }

    ngOnInit() {
        this.eventService.getEvent().subscribe(
            data => {
                this.event = data;
                this.loading = false;
            },
            error => {
                this.error = error;
                this.loading = false;
            });
    }

    onUpdate() {
        if (!this.msgUpdate) {
            console.log("date :" + this.event.date + ", nom :" + this.event.name + ", description :" + this.event.description);
            this.msgUpdate = true;
            setTimeout(() => {
                //requete http update ...
                this.router.navigate(['/adminEventDetail']);
            }, 2500);
        }
    }
}
