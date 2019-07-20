import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { EventDTO } from 'src/app/models/dto/eventDTO';

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
        this.route.queryParams.forEach(params => {
            this.eventService.getEvent(params['id']).subscribe(
                data => {
                    this.event = data;
                    this.loading = false;
                    console.log('event :' + this.event.name);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
        })
    }

    onUpdate() {
        if (!this.msgUpdate) {
            console.log("date :" + this.event.beginning + ", nom :" + this.event.name + ", description :" + this.event.description);
            this.msgUpdate = true;
            let eventDTO : EventDTO = new EventDTO(
                this.event.id,
                this.event.name,
                this.event.beginning,
                this.event.description,
                this.event.available
            );
            this.eventService.updateEvent(eventDTO).subscribe(data => eventDTO = data, error => this.error = error);
            setTimeout(() => {
                //requete http update ...
                this.router.navigate(['/adminEventDetail'], {queryParams : { id: this.event.id } });
            }, 2500);
        }
    }
}
