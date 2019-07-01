import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
    selector: 'adminRoomDetail',
    templateUrl: './adminRoomDetail.component.html',
    styleUrls: ['./adminRoomDetail.component.css']
})
export class AdminRoomDetailComponent {

    /** chambre */
    room: Room;
    /***/
    error: string;
    /***/
    msgDelete: boolean = false;
    /***/
    msgClean: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService) { }

    ngOnInit() {
        this.roomService.getRoom().subscribe(data => this.room = data, error => this.error = error);
    }

    onDelete() {
        if (!this.msgClean) {
            this.msgDelete = true;
        }
    }

    onClean() {
        this.msgDelete = false;
        this.msgClean = true;
        setTimeout(() => {
            //requete http update ...
            this.router.navigate(['/adminHome']);
        }, 2500);
    }

    onConfirmDelete(value: number) {
        if (value == 0) {
            this.msgDelete = false;
        } else {
            //requete http suppression ...
            this.router.navigate(['/adminHome']);
        }
    }

}
