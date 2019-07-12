export class BookingDTO {
  /***/
  id: number;
  /***/
  date_booking: string;
  /***/
  start_date: string;
  /***/
  end_date: string;
  /***/
  staying_days: number;
  /***/
  active: number;
  /***/
  comment: string;
  /***/
  id_booking_status: number;
  /***/
  id_user: number;

  constructor(
    id: number,
    start_date: string,
    end_date: string,
    active: number,
    comment: string,
    id_booking_status: number,
    id_user: number
  ) {
      this.id=id;
      this.start_date=start_date;
      this.end_date=end_date;
      var first = new Date(start_date);
      var secondDate = new Date(end_date);
      this.staying_days = Math.round(Math.abs((first.getTime() - secondDate.getTime())/(24*60*60*1000)));
      this.active = active;
      this.comment = comment;
      this.id_booking_status = id_booking_status;
      this.id_user = id_user;
  }
}
