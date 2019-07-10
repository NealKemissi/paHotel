import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Booking } from "src/app/models/booking";
import { BookingService } from "src/app/services/booking.service";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { RoomBooking } from "src/app/models/room_booking";
import { RoomBookingService } from "src/app/services/room_booking.service";
import { RoomService } from "src/app/services/room.service";
import { Room } from "src/app/models/room";
import { EventBooking } from "src/app/models/event_booking";
import { EventBookingService } from "src/app/services/event_booking.service";
import { EventService } from "src/app/services/event.service";
import { Event } from "src/app/models/event";
import { ServiceBooking } from "src/app/models/service_booking";
import { Service } from "src/app/models/service";
import { ServiceBookingService } from "src/app/services/service_booking.service";
import { ServiceService } from "src/app/services/service.service";
declare let jsPDF; // on l'import grace au script ajouté dans index.html

@Component({
  selector: "adminBookingDetail",
  templateUrl: "./adminBookingDetail.component.html",
  styleUrls: ["./adminBookingDetail.component.css"]
})
export class AdminBookingDetailComponent {
  /** reservation */
  booking: Booking;
  /***/
  rooms_booking: RoomBooking[];
  /***/
  events_booking: EventBooking[];
  /***/
  services_booking: ServiceBooking[];
  /***/
  user: User;
  /***/
  rooms: Room[] = [];
  /***/
  events: Event[] = [];
  /***/
  services: Service[] = [];
  /***/
  error: string;
  /***/
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private userService: UserService,
    private roomBookingService: RoomBookingService,
    private roomService: RoomService,
    private eventBookingService: EventBookingService,
    private eventService: EventService,
    private serviceBookingService: ServiceBookingService,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.route.queryParams.forEach(params => {
      this.bookingService.getBooking(params["id"]).subscribe(
        data => {
          this.booking = data;
          this.loading = false;
          console.log("1) id booking : " + this.booking.id);
          /** get User **/
          this.userService.getUserById(this.booking.id_user).subscribe(
            data => {
              this.user = data;
              console.log("2) user : " + this.user.firstname);
            },
            error => {
              this.error = error;
            }
          ) /** get Les Reservations de chambres **/,
            this.roomBookingService
              .getAllBookingsByIdBooking(this.booking.id)
              .subscribe(
                data => {
                  this.rooms_booking = data;
                  this.loadAllRoomsOfRoomBooking();
                },
                error => {
                  this.error = error;
                }
              ),
            /** get Les Reservations d'Events **/
            this.eventBookingService
              .getAllEventsBookingsByIdBooking(this.booking.id)
              .subscribe(
                data => {
                  this.events_booking = data;
                  this.loadAllEventsOfEventsBooking();
                },
                error => {
                  this.error = error;
                }
              ),
            /** get Les Reservations de services */
            this.serviceBookingService
              .getAllServicesBookingsByIdBooking(this.booking.id)
              .subscribe(
                data => {
                  this.services_booking = data;
                  this.loadAllServicesOfServicesBooking();
                },
                error => {
                  this.error = error;
                }
              );
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    });
  }

  /** chargement de toute les chambres... */
  loadAllRoomsOfRoomBooking() {
    this.rooms_booking.forEach(r => {
      console.log("3) roombooking :  n : " + r.id_room);
      this.roomService.getRoom(r.id_room).subscribe(
        data => {
          let room: Room = data;
          console.log("4) room n : " + room.number);
          this.rooms.push(room);
        },
        error => {
          this.error = error;
        }
      );
    });
  }

  /** chargement de toute les events... */
  loadAllEventsOfEventsBooking() {
    this.events_booking.forEach(v => {
      console.log("event :  n : " + v.id_event);
      this.eventService.getEvent(v.id_event).subscribe(
        data => {
          let event: Event = data;
          console.log("event n : " + event.id);
          this.events.push(event);
        },
        error => {
          this.error = error;
        }
      );
    });
  }

  /** chargement de toute les services... */
  loadAllServicesOfServicesBooking() {
    this.services_booking.forEach(v => {
      console.log("service :  n : " + v.id_service);
      this.serviceService.getService(v.id_service).subscribe(
        data => {
          let service: Service = data;
          console.log("event n : " + service.id);
          this.services.push(service);
        },
        error => {
          this.error = error;
        }
      );
    });
  }

  convertPDF() {
    if (this.booking != undefined) {
      /** methode 1*/
      /*
      const pdfContent : HTMLElement = document.getElementById('test');
      var doc = new jsPDF();

      doc.addHTML(pdfContent, () => {
        doc.save('facture_'+this.booking.id+'.pdf');
      })
      */

      /** methode 2*/
      var doc = new jsPDF();
      doc.text(this.stringBooking(), 8, 8);
      doc.save("facture_" + this.booking.id + ".pdf");

      /** creer une fonction qui retourne toutes les infos avec des balises html, ensuite utiliser la methode 1 et se servir de getElementById pour avoir les bonnes infos */
    }
  }

  stringBooking(): string {
    var infoUser =
      "Facture n°" +
      this.booking.id +
      "\n\nClient : " +
      this.user.firstname.toUpperCase() +
      " " +
      this.user.lastname +
      "\nEmail : " +
      this.user.email;
    var infoDate =
      "Du " + this.booking.start_date + " au " + this.booking.end_date;
    var infoRooms = "Chambre(s) louée(s) : \n";
    this.rooms.forEach(r => {
      infoRooms += "\t- Chambre n° " + r.number + "\n";
    });
    var infoEvents = "Evenement(s) participé(s) : \n";
    this.events.forEach(v => {
      infoEvents += "\t- " + v.name + ", le " + v.beginning + "\n";
    });
    var infoServices = "Service(s) choisi(s) : \n";
    this.services.forEach(s => {
      infoServices += "\t- " + s.name + ", pour la somme de " + s.price + "€\n";
    });
    return (
      infoUser + "\n\n" + infoDate + "\n\n\n" + infoRooms + "\n\n" + infoEvents + "\n\n" + infoServices
    );
  }

  stringifyObject(data: Object, str: string): string {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if (
          data[key] !== null &&
          typeof data[key] === "object" &&
          !Array.isArray(data[key])
        ) {
          str = this.stringifyObject(data[key], str);
        }
        str += "\t" + key + " : " + data[key] + "\n";
      }
    }
    return str;
  }
}
