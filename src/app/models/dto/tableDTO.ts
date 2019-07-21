export class TableDTO {
    /***/
    id: number;
    /***/
    x_pos: number;
    /***/
    y_pos: number;
    /***/
    available: number;
    /***/
    status: string;

    constructor(id:number, x_pos: number, y_pos:number, available:number){
        this.id = id;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.available = available;
    }
  }

  