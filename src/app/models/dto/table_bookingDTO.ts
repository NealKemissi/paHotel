export class TableBookingDTO {
    /***/
    id: number;
    /***/
    arrival: string;
    /***/
    total_price: number;
    /***/
    done: boolean;
    /***/
    id_table: number;
    /***/
    id_hotel_booking: number;
    /***/
    id_booking: number;

    constructor(id:number, arrival:string, total_price:number, done:boolean, id_table:number, id_hotel_booking:number, id_booking:number){
        this.id = id;
        this.arrival = arrival;
        this.total_price = total_price;
        this.done = done;
        this.id_table = id_table;
        this.id_hotel_booking = id_hotel_booking;
        this.id_booking = id_booking;
    }
  }
  