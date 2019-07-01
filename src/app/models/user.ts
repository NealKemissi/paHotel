import { Booking } from "./booking";

export class User {
  /***/
  id : number;
  /***/
  firstName : string;
  /***/
  lastName : string;
  /***/
  email : string;
  /***/
  password : string;
  /***/
  bookings : Array<Booking>;
}
