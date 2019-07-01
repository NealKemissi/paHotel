import { Event } from "./event";
import { Room } from "./room";
import { User } from "./user";

export class Booking {
    /***/
    id : number;
    /***/
    user : User;
    /***/
    dateBegin : string;
    /***/
    dateEnd : string;
    /***/
    events : Array<Event>;
    /***/
    rooms : Array<Room>;
    /***/
    isPaid : boolean;
}
