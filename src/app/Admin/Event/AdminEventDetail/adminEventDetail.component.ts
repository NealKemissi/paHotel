import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { EventDTO } from 'src/app/models/dto/eventDTO';

@Component({
    selector: 'adminEventDetail',
    templateUrl: './adminEventDetail.component.html',
    styleUrls: ['./adminEventDetail.component.css']
})
export class AdminEventDetailComponent {

    /** évenement */
    event: Event;
    /***/
    error: string;
    /***/
    msgConfirm: boolean = false;
    /***/
    msgUpdate: boolean = false;
    /***/
    loading: boolean = false;

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
        this.router.navigate(['/adminEventUpdate'], {queryParams : { id: this.event.id } });
    }

    onDelete() {
        this.msgConfirm = true;
    }

    onConfirm(value: number) {
        if (value == 0) {
            this.msgConfirm = false;
        } else {
            this.msgConfirm = false;
            this.error = undefined;
            this.msgUpdate = true;
            let eventDTO : EventDTO = new EventDTO(
                this.event.id,
                this.event.name,
                this.event.beginning,
                this.event.description,
                0
            );
            this.eventService.updateEvent(eventDTO).subscribe(data => eventDTO = data, error => this.error = error);
            this.finish();
        }
    }

    finish(){
        setTimeout(() => {
            //requete http suppression ...
            this.router.navigate(['/adminHome']);
        }, 2500);
    }
}
