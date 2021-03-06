import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room';
import { Event } from 'src/app/models/event';
import { RoomService } from 'src/app/services/room.service';
import { EventService } from 'src/app/services/event.service';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'adminHome',
  templateUrl: './adminHome.component.html',
  styleUrls: ['./adminHome.component.css']
})
export class AdminHomeComponent {

  /** pagination */
  page1: number = 1;
  page2: number = 1;
  page3: number = 1;
  /** reservations */
  bookings: Booking[] = [];
  /** chambres */
  rooms: Room[] = [];
  /** evenements */
  events: Event[] = [];
  /***/
  error: string;
  /** filtres */
  number: string;
  /***/
  beginning: string;
  /***/
  bookingId: number;

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService, private eventService: EventService, private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getAllBookings().subscribe(data => this.bookings = data, error => this.error = error);
    this.roomService.getAllRooms().subscribe(data => this.rooms = data, error => this.error = error);
    this.eventService.getAllEvents().subscribe(data => this.events = data, error => this.error = error);
  }

  onBookingDetail(id_booking : number) {
    this.router.navigate(['/adminBookingDetail'], {queryParams : { id: id_booking } });
  }

  onRoomDetail(id_room : number) {
    this.router.navigate(['/adminRoomDetail'], {queryParams : { id: id_room } });
  }

  onRoomCreate(){
    this.router.navigate(['/adminRoomCreate']);
  }

  onEventDetail(id_event : number) {
    this.router.navigate(['/adminEventDetail'], {queryParams : { id: id_event } });
  }

  onEventCreate() {
    this.router.navigate(['/adminEventCreate'])
  }
}
