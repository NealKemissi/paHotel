import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  /***/
  events: Event[] = [];
  /***/
  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) {
    this.eventService.getAllEvents().subscribe(data => this.events = data, error => this.error = error);
  }

  ngOnInit() { }
}
