export class UserDTO {
    /***/
    id : number;
    /***/
    email : string;
    /***/
    password : string;
    /***/
    password2 : string;
    /***/
    lastname : string;
    /***/
    firstname : string;
    /***/
    birthday : string;
    /***/
    admin : number;
    /***/
    active : number;

    constructor(id : number, email: string, password: string, password2: string, lastname: string, firstname: string, birthday: string, admin: number, active:number) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.password2 = password2;
        this.lastname = lastname;
        this.firstname = firstname;
        this.birthday = birthday;
        this.admin = admin;
        this.active = active;
    }
  }
  