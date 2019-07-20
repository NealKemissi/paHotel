export class EventBookingDTO {
  /***/
  id: number;
  /***/
  booked_at: string;
  /***/
  seats_number: number;
  /***/
  available: number;
  /***/
  id_event: number;
  /***/
  id_booking: number;
  /***/
  id_event_booking_status: number;

  constructor(
    id: number,
    booked_at: string,
    seats_number: number,
    available: number,
    id_event:number,
    id_booking: number,
    id_event_booking_status: number
  ) {
      this.id = id;
      this.booked_at = booked_at;
      this.seats_number = seats_number;
      this.available = available;
      this.id_event = id_event;
      this.id_booking = id_booking;
      this.id_event_booking_status = id_event_booking_status;
  }
}
