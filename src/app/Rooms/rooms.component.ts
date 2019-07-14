import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { RoomBookingService } from '../services/room_booking.service';
import { RoomBooking } from '../models/room_booking';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  /** pagination */
  page: number = 1;
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

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService, private roomBookingServuce: RoomBookingService) { }

  ngOnInit() {
  }

  onSearch(): void {
    console.log("Begin :"+this.dateBegin+", End :"+this.dateEnd+", for "+this.nbPeople+" people");
    if(this.nbPeople != undefined && this.dateBegin != undefined && this.dateBegin != undefined) {
      this.roomService.getRoomsInTermsOfSeats(this.nbPeople).subscribe(data => {
        this.rooms = data.filter(r => r.id_room_status != 2 && this.checkAvailability(r.id));
      }, error => {
        this.error = error});
    } 
  }

  // TODO bien faire la gestion de la disponnibilité de la room en fonction des dates
  checkAvailability(id_room: number): boolean {
    let room_booking: RoomBooking; //let room_booking: RoomBooking[];
    this.roomBookingServuce.getAllBookings().subscribe(
      data => {
        room_booking = data.find(r => r.id_room == id_room);
        return (room_booking == undefined)?  true: this.compareDate(room_booking.arrival, room_booking.departure);
      }, error => {
        this.error = error;
        return false;
      }// .filter(r => this.compareDate(r.arrival, r.departure))
    )
    return true;
  }

  compareDate(arrival: string, departure: string): boolean {
    let date1 = new Date(this.dateBegin);
    let date2 = new Date(this.dateEnd);
    let date_arrival = new Date(arrival);
    let date_departure = new Date(departure);
    console.log('date_1='+date1+', date_2='+date2+', date_arrival='+date_arrival+', date_departure'+date_departure);
    console.log(date1 > date_departure);
    console.log(date2 < date_arrival);

    if(date1 > date_departure){
      console.log('toto')
      return true;
    } else if(date2 < date_arrival){
      console.log('titi')
      return true;
    } else return false;
  }

  onBook(room_id : number): void {
    this.router.navigate(['/roomBooking', { dateBegin: this.dateBegin, dateEnd: this.dateEnd, id: room_id }]);
  }
}
