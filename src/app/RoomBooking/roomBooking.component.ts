import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Room } from "../models/room";
import { RoomService } from "../services/room.service";
import { UserService } from "../services/user.service";
import { BookingService } from "../services/booking.service";
import { User } from "../models/user";
import { BookingDTO } from "../models/dto/bookingDTO";
import { RoomBookingService } from "../services/room_booking.service";
import { RoomBookingDTO } from "../models/dto/room_bookingDTO";
import { UserDTO } from "../models/dto/userDTO";

@Component({
  selector: "roomBooking",
  templateUrl: "./roomBooking.component.html",
  styleUrls: ["./roomBooking.component.css"]
})
export class RoomBookingComponent {
  token: string = localStorage.getItem("token");
  id_user: number = (localStorage.getItem("id") != null)? parseInt(localStorage.getItem("id")) : undefined;
  /** dates sejour */
  @Input() dateBegin: string;
  /***/
  @Input() dateEnd: string;
  /**id de la chambre*/
  @Input() id: number;
  /** infos utilisateurs */
  hasAccount: boolean = false;
  /***/
  user: User;
  /***/
  nom: string;
  /***/
  prenom: string;
  /***/
  birthday: string;
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
  /***/
  msgCreating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private userService: UserService,
    private bookingService: BookingService,
    private roomBookingService: RoomBookingService
  ) {}

  ngOnInit() {
    this.dateBegin = this.route.snapshot.paramMap.get("dateBegin");
    this.dateEnd = this.route.snapshot.paramMap.get("dateEnd");
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    console.log(
      "Begin :" +
        this.dateBegin +
        ", End :" +
        this.dateEnd +
        ", room id :" +
        this.id
    );

    if (this.id_user != undefined) {
      this.userService.getUserById(this.id_user).subscribe(
        data => {
          this.user = data;
          console.log("user : " + this.user.firstname);
        },
        error => {
          this.error = error;
        }
      );
    }

    this.roomService.getRoom(this.id).subscribe(
      data => {
        this.room = data;
        this.loading = false;
        console.log("room number :" + this.room.number);
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  onChange(): void {
    this.hasAccount = !this.hasAccount;
  }

  onBooking() {
    this.msgCreating = true;
    if (this.id_user != undefined) {
      this.createBooking(this.id_user);
    } else if (this.hasAccount == true) {
      this.checkAccountThenCreateBooking();
    } else this.createAccountThenCreateBooking();
  }

  createBooking(id_user: number) {
    let id_of_booking: number;
    let booking_DTO: BookingDTO = new BookingDTO(
      null,
      this.dateBegin,
      this.dateEnd,
      0,
      null,
      1,
      id_user
    );
    this.bookingService.createBooking(booking_DTO).subscribe(
      data => {
        id_of_booking = data.id;
        let room_booking_DTO: RoomBookingDTO = new RoomBookingDTO(
          null,
          this.dateBegin,
          this.dateEnd,
          null,
          this.room.seats,
          this.room.id,
          id_of_booking,
          1
        );
        this.roomBookingService.createRoomBooking(room_booking_DTO).subscribe(
          data => {
            room_booking_DTO = data;
            this.finish();
          },
          error => {
            this.error = error;
            this.msgCreating = false;
          }
        );
      },
      error => {
        this.error = error;
        this.msgCreating = false;
      }
    );
  }

  checkAccountThenCreateBooking() {
    if (this.email == undefined) {
      this.msgCreating = false;
      this.error = "l'email n'est pas renseigné..";
    } else {
      this.userService.getUser(this.email).subscribe(
        data => {
          let id = data.id;
          this.createBooking(id);
        },
        error => {
          this.error = error;
          this.msgCreating = false;
        }
      );
    }
  }

  createAccountThenCreateBooking() {
    if (
      this.email == undefined ||
      this.nom == undefined ||
      this.prenom == undefined ||
      this.password == undefined ||
      this.confirm == undefined ||
      this.birthday == undefined
    ) {
      this.msgCreating = false;
      console.log(this.birthday+', '+this.nom+', '+this.prenom+', '+this.email+', '+this.password+', '+this.confirm);
      this.error = "Veuillez renseigner tous les champs";
    } else if (this.password != this.confirm) {
      this.msgCreating = false;
      this.error = "Les mots de passe ne correspondent pas";
    } else {
      let userDTO = new UserDTO(
        null,
        this.email,
        this.password,
        this.confirm,
        this.nom,
        this.prenom,
        this.birthday
      );
      this.userService.createUser(userDTO).subscribe(
        data => {
          let id_u = data.id;
          this.createBooking(id_u);
        },
        error => {
          this.error = error;
          this.msgCreating = false;
        }
      );
    }
  }

  finish(){
    setTimeout(() => {
      this.router.navigate(["/dashboard"]);
    }, 2500);
  }
}
