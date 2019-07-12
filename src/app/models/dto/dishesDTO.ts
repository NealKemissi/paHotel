export class DishesDTO {
    /***/
    id : number;
    /***/
    name : string;
    /***/
    price : number;
    /***/
    available : boolean;
    /***/
    id_dish_type : number;
    /***/
    id_menu : number;

    constructor(id: number, name: string, price: number, available : boolean, id_dish_type : number, id_menu: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.available = available;
        this.id_dish_type = id_dish_type;
        this.id_menu = id_menu
    }
}
