import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'adminEventCreate',
    templateUrl: './adminEventCreate.component.html',
    styleUrls: ['./adminEventCreate.component.css']
})
export class AdminEventCreateComponent {

    /** évenement */
    dateEvent: string;
    /***/
    nameEvent: string;
    /***/
    descriptionEvent: string;

    constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) { }

    ngOnInit() {
    }

    onCreate() {
        console.log("date :" + this.dateEvent + ", nom :" + this.nameEvent + ", description :" + this.descriptionEvent);
    }
}
