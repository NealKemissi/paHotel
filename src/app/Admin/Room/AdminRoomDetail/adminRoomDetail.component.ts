import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { RoomDTO } from 'src/app/models/dto/roomDTO';

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
    loading: boolean = true;
    /***/
    msgDelete: boolean = false;
    /***/
    msgUpdate: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService) { }

    ngOnInit() {
        this.route.queryParams.forEach(params => {
            this.roomService.getRoom(params['id']).subscribe(
                data => {
                    this.room = data;
                    this.loading = false;
                    console.log('room number :' + this.room.number);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
        })
    }

    onDelete() {
        if (!this.msgUpdate) {
            this.msgDelete = true;
        }
    }

    onConfirmDelete(value: number) {
        if (value == 0) {
            this.msgDelete = false;
        } else {
            //requete http suppression ...
            this.msgDelete = false;
            this.msgUpdate = true;
            let roomDTO : RoomDTO = new RoomDTO(
                this.room.id,
                this.room.number,
                this.room.description,
                this.room.seats,
                !this.room.cleared,
                0,
                this.room.id_room_status
            );
            this.roomService.updateRoom(roomDTO).subscribe(data => roomDTO = data, error => this.error = error);
            this.finish();
        }
    }

    onClean() {
        let roomDTO : RoomDTO = new RoomDTO(
            this.room.id,
            this.room.number,
            this.room.description,
            this.room.seats,
            !this.room.cleared,
            this.room.available,
            this.room.id_room_status
        );
        this.roomService.updateRoom(roomDTO).subscribe(data => roomDTO = data, error => this.error = error);
        this.msgDelete = false;
        this.msgUpdate = true;
        this.finish();
        
    }

    finish(){
        setTimeout(() => {
            //requete http update ...
            this.router.navigate(['/adminHome']);
        }, 2500);
    }
}
