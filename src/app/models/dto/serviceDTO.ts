export class ServiceDTO {
    /***/
    id: number;
    /***/
    name: string;
    /***/
    created_at: string;
    /***/
    description: string;
    /***/
    price: number;
    /***/
    available: number

    constructor(id: number, name: string, description : string, price: number, available: number) {
        this.id = id;
        this.name = name;
        this.created_at = new Date().toString();
        this.description = description;
        this.price = price;
        this.available = available;
    }
}
