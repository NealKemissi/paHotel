import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Event } from "src/app/models/event";
import { EventBooking } from "src/app/models/event_booking";
import { EventService } from "src/app/services/event.service";
import { EventBookingService } from "src/app/services/event_booking.service";
import { EventBookingDTO } from "src/app/models/dto/event_bookingDTO";

@Component({
  selector: "adminAddEventBooking",
  templateUrl: "./adminAddEventBooking.component.html",
  styleUrls: ["./adminAddEventBooking.component.css"]
})
export class AdminAddEventBookingComponent {
  /** services booking */
  events_booking: EventBooking[];
  /***/
  allEventsAvailable: Event[] = [];
  /***/
  my_events: Event[] = [];
  /***/
  name: string;
  /***/
  error: string;
  /***/
  loading: boolean = true;
  /***/
  msgConfirm: boolean = false;
  /***/
  msgUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private eventBookingService: EventBookingService
  ) {}

  ngOnInit() {
    this.route.queryParams.forEach(params => {
        this.eventBookingService
          .getAllEventsBookingsByIdBooking(params["id"])
          .subscribe(
            data => {
              this.events_booking = data;
              this.loading = false;
              this.loadAllEventsOfUserFromEventsBooking();
            },
            error => {
              this.error = error;
              this.loading = false;
            }
          );
      });
      this.eventService.getAllEvents().subscribe(
        data => {
          this.allEventsAvailable = data;
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  /** chargement de toute les events en fonction de l'id qui se trouve dans event booking... */
  loadAllEventsOfUserFromEventsBooking() {
    this.events_booking.forEach(v => {
      console.log("event :  n : " + v.id_event);
      this.eventService.getEvent(v.id_event).subscribe(
        data => {
          let event: Event = data;
          console.log("event n : " + event.id);
          this.my_events.push(event);
        },
        error => {
          this.error = error;
        }
      );
    });
  }

  deleteEventFromBooking(){
    this.msgConfirm = true;
  }

  onConfirm(value: number) {
    if (value == 0) {
      this.msgConfirm = false;
    } else {
      this.msgConfirm = false;

      var id: string;
      this.route.queryParams.subscribe(params => {
        id = params["id"];
      });
      this.msgUpdate = true;
      setTimeout(() => {
        //requete http suppression ...
        this.router.navigate(["/adminBookingDetail"], {
          queryParams: { id: id }
        });
      }, 2500);
    }
  }

  addEvent(){
    var id_booking: string;
    this.route.queryParams.subscribe(params => {
      id_booking = params["id"];
    });
    let event: Event = this.allEventsAvailable.find(
      v => v.name == this.name
    );
    console.log("event ici : " + event.name + "(id=" + event.id + ")");
    let event_booking: EventBookingDTO = new EventBookingDTO(
      null,
      null,
      10,
      event.id,
      parseInt(id_booking),
      1,
    );
    console.log(
      "event id " + event.id + ", id_booking " + parseInt(id_booking)
    );
    this.eventBookingService
      .createEventBooking(event_booking)
      .subscribe(data => (event_booking = data), error => (this.error = error));
    this.msgUpdate = true;
    setTimeout(() => {
      //requete http create ...
      this.router.navigate(["/adminBookingDetail"], {
        queryParams: { id: id_booking }
      });
    }, 2500);
  }

}
