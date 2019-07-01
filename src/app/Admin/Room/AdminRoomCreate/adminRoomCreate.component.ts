import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
    selector: 'adminRoomCreate',
    templateUrl: './adminRoomCreate.component.html',
    styleUrls: ['./adminRoomCreate.component.css']
})
export class AdminRoomCreateComponent {

    /** chambre */
    numRoom: number;
    /***/
    id: number;
    /***/
    floor: number;
    /***/
    places: number;
    /***/
    equipementRoom: string;
    /***/
    equipments: string[] = []
    /***/
    isAvailable: boolean;
    /***/
    isClean: boolean;
    /***/
    error: string;
    /***/

    constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService) { }

    ngOnInit() {
    }

    onCreate() {
        console.log(this.floor);
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
        if(this.floor!=undefined && this.numRoom!=undefined) {
            this.id = parseInt((this.floor+this.numRoom).toString());
        }
    }

    addEquipment(equipementRoom : string) {
        if(equipementRoom!=undefined && this.equipments.length < 3){
            this.equipments.push(equipementRoom);
        }
    }

    deleteEquipment(equipment: string) {
        let i = this.equipments.indexOf(equipment);
        this.equipments.splice(i, 1);
    }
}
