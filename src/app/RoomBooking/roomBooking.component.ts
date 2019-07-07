import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { map, find } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'roomBooking',
  templateUrl: './roomBooking.component.html',
  styleUrls: ['./roomBooking.component.css']
})
export class RoomBookingComponent {

  /** dates sejour */
  @Input() dateBegin: string;
  /***/
  @Input() dateEnd: string;
  /***/
  @Input() id: number;
  /** infos utilisateurs */
  hasAccount: boolean = false;
  /***/
  nom: string;
  /***/
  prenom: string;
  /***/
  email: string;
  /** infos inscription utilisateurs **/
  password: string;
  /***/
  confirm: string;
  /** infos chambre */
  room: Room;
  /***/
  loading: boolean = false;
  /***/
  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService) { }

  ngOnInit() {
    this.dateBegin = this.route.snapshot.paramMap.get('dateBegin');
    this.dateEnd = this.route.snapshot.paramMap.get('dateEnd');
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log("Begin :" + this.dateBegin + ", End :" + this.dateEnd+ ", room id :" + this.id);

    this.roomService.getRoom(this.id).subscribe(
      data => {
          this.room = data;
          this.loading = false;
          console.log('room number :' + this.room.number);
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }

  onChange(): void {
    this.hasAccount = !this.hasAccount;
  }
}
