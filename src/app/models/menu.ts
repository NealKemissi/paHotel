import { Dishes } from "./dishes";

export class Menu {
    /***/
    id : number;
    /***/
    name : string;
    /***/
    available : boolean;
    /** MAGOUILLE  **/
    dishes : Dishes[];
}
