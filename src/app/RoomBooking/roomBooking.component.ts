import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

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
  /** infos utilisateurs */
  hasAccount : boolean = false;
  /***/
  nom: string;
  /***/
  prenom: string;
  /***/
  email: string;
  /** infos inscription utilisateurs **/
  password : string;
  /***/
  confirm : string;
  /** infos chambre */
  room: Room;
  /***/
  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService) { }

  ngOnInit() {
    this.dateBegin = this.route.snapshot.paramMap.get('dateBegin');
    this.dateEnd = this.route.snapshot.paramMap.get('dateEnd');
    console.log("Begin :"+this.dateBegin+", End :"+this.dateEnd);

    this.roomService.getRoom().subscribe(data => this.room = data, error => this.error = error);
  }

  onChange(): void {
    this.hasAccount = !this.hasAccount;
  }
}
