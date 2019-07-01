import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  /***/
  dateBegin: string;
  /***/
  dateEnd: string;
  /***/
  nbPeople: number;
  /***/
  rooms: Room[] = [];
  /***/
  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService) { }

  ngOnInit() {
  }

  onSearch(): void {
    console.log("Begin :"+this.dateBegin+", End :"+this.dateEnd+", for "+this.nbPeople+" people");
    if(this.nbPeople != undefined && this.dateBegin != undefined && this.dateBegin != undefined) {
      this.roomService.getAllRooms().subscribe(data => this.rooms = data, error => this.error = error);
    } 
  }

  onBook(): void {
    this.router.navigate(['/roomBooking', { dateBegin: this.dateBegin, dateEnd: this.dateEnd }]);
  }
}