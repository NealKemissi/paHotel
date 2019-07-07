export class EventDTO {
    /***/
    id: number;
    /***/
    name: string;
    /***/
    beginning: string;
    /***/
    description: string;

    constructor(id: number, name: string, beginning: string, description : string) {
        this.id = id;
        this.name = name;
        this.beginning = beginning;
        this.description = description;
    }
  }
  