export class RoomDTO {
    /***/
    id : number;
    /***/
    number : string;
    /***/
    description : string;
    /***/
    seats : number;
    /***/
    cleared : boolean;
    /***/
    available : number
    /***/
    id_room_status : number;

    constructor(id: number, number: string, description: string, seats : number, cleared: boolean, available: number, id_room_status: number) {
        this.id = id;
        this.number = number;
        this.description = description;
        this.seats = seats;
        this.cleared = cleared;
        this.available = available;
        this.id_room_status = id_room_status;
    }
  }
  