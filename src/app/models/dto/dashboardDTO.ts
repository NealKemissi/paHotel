export class DashboardDTO {
  /***/
  id: number;
  /***/
  presentation: string;
  /***/
  rooms: string;
  /***/
  events: string;
  /***/
  services: string;
  /***/
  restaurant: string;

  constructor(
    id: number,
    presentation: string,
    rooms: string,
    events: string,
    services: string,
    restaurant: string
  ) {
    this.id = id;
    this.presentation = presentation;
    this.rooms = rooms;
    this.events = events;
    this.services = services;
    this.restaurant = restaurant;
  }
}
