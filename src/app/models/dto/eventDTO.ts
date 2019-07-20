export class EventDTO {
    /***/
    id: number;
    /***/
    name: string;
    /***/
    beginning: string;
    /***/
    description: string;
    /***/
    available: number

    constructor(id: number, name: string, beginning: string, description : string, available: number) {
        this.id = id;
        this.name = name;
        this.beginning = beginning;
        this.description = description;
        this.available = available;
    }
  }
  