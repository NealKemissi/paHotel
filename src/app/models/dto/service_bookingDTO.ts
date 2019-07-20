export class ServiceBookingDTO {
    /***/
    id: number;
    /***/
    booked_at: string;
    /***/
    realised_at: string;
    /***/
    available: number;
    /***/
    id_service: number;
    /***/
    id_booking: number;   
    /***/
    id_service_booking_status: number;

    constructor(id: number, booked_at: string, realised_at:string, available:number, id_service : number, id_booking: number) {
        this.id = id;
        this.booked_at = booked_at;
        this.realised_at = realised_at; //new Date().setDate(new Date().getDate() + 1).toString();
        this.available = available;
        this.id_service = id_service;
        this.id_booking = id_booking;
        this.id_service_booking_status = 1;
    }
}
