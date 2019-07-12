export class RoomBookingDTO {
  /***/
  id: number;
  /***/
  arrival: string; // ?
  /***/
  departure: string; // ?
  /***/
  booked_at: string; // ?
  /***/
  adult_number: number;
  /***/
  id_room: number;
  /***/
  id_booking: number;
  /***/
  id_room_booking_status: number;

  constructor(
    id: number,
    arrival: string,
    departure: string,
    booked_at: string,
    adult_number: number,
    id_room: number,
    id_booking: number,
    id_room_booking_status: number
  ) {
      this.id = id;
      this.arrival = arrival;
      this.departure = departure;
      this.booked_at = booked_at
      this.adult_number = adult_number;
      this.id_room = id_room;
      this.id_booking = id_booking;
      this.id_room_booking_status = id_room_booking_status;
  }
}
