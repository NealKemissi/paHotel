export class DishBookingDTO {
    /***/
    id : number;
    /***/
    id_table_booking : number;
    /***/
    id_dish : number;

    constructor(id:number, id_table_booking: number, id_dish: number){
        this.id = id;
        this.id_table_booking = id_table_booking;
        this.id_dish = id_dish;
    }
}
