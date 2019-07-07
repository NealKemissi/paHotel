import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { RoomDTO } from 'src/app/models/dto/roomDTO';

@Component({
    selector: 'adminRoomCreate',
    templateUrl: './adminRoomCreate.component.html',
    styleUrls: ['./adminRoomCreate.component.css']
})
export class AdminRoomCreateComponent {

    /** chambre */
    numRoom: number;
    /***/
    number: number;
    /***/
    floor: number;
    /***/
    seats: number;
    /***/
    tool: string;
    /***/
    description: string[] = []
    /***/
    status: boolean;
    /***/
    error: string;
    /***/
    msgCreating: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService) { }

    ngOnInit() {
    }

    onCreate() {
        console.log(this.status);
        if (this.number == undefined || this.seats == undefined || this.status == undefined) {
            this.error = 'Tous les champs obligatoires doivent être remplis !';
        } else {
            this.error = undefined;
            console.log(this.floor);
            let cleared : boolean = (status=='Propre') ? true : false;
            let roomDTO: RoomDTO = new RoomDTO(
                null,
                this.number.toString(),
                this.description.toString(),
                this.seats,
                cleared,
                3
            );
            this.msgCreating = true;
            this.roomService.createRoom(roomDTO).subscribe(data => roomDTO = data, error => this.error = error);
            setTimeout(() => {
                //requete http create ...
                this.router.navigate(['/adminHome']);
            }, 2500);
        }
    }

    preventInput() {
        let value = this.numRoom;
        if (value >= 100) {
            event.preventDefault()
            this.numRoom = parseInt(value.toString().substring(0, 2));
        } else if (value <= -1) {
            event.preventDefault()
            this.numRoom = 0;
        }
        this.setIdFromInput();
    }

    setIdFromInput() {
        if (this.floor != undefined && this.numRoom != undefined) {
            this.number = parseInt((this.floor + this.numRoom).toString());
        }
    }

    addEquipment(tool: string) {
        if (tool != undefined && this.description.length < 3) {
            this.description.push(tool);
        }
    }

    deleteEquipment(tool: string) {
        let i = this.description.indexOf(tool);
        this.description.splice(i, 1);
    }
}
