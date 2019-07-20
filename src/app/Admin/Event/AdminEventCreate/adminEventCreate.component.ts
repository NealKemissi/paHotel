import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { EventDTO } from 'src/app/models/dto/eventDTO';

@Component({
    selector: 'adminEventCreate',
    templateUrl: './adminEventCreate.component.html',
    styleUrls: ['./adminEventCreate.component.css']
})
export class AdminEventCreateComponent {

    /** évenement */
    beginning: string;
    /***/
    name: string;
    /***/
    description: string;
    /***/
    error : string;
    /***/
    msgCreating: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) { }

    ngOnInit() {
    }

    onCreate() {
        if(this.beginning == undefined || this.name == undefined || this.description == undefined){
            this.error = 'Tous les champs obligatoires doivent être remplis !';
        } else {
            this.error = undefined;
            console.log("date :" + this.beginning + ", nom :" + this.name + ", description :" + this.description);
            let eventDTO: EventDTO = new EventDTO(
                null,
                this.name,
                this.beginning,
                this.description,
                1
            );
            this.msgCreating = true;
            this.eventService.createEvent(eventDTO).subscribe(data => eventDTO = data, error => this.error = error);
            setTimeout(() => {
                //requete http create ...
                this.router.navigate(['/adminHome']);
            }, 2500);
        }
    }
}
