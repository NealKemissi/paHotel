export class UserDTO {
    /***/
    id : number;
    /***/
    email : string;
    /***/
    password1 : string;
    /***/
    password2 : string;
    /***/
    lastname : string;
    /***/
    firstname : string;
    /***/
    birthday : string;

    constructor(id : number, email: string, password1: string, password2: string, lastname: string, firstname: string, birthday: string) {
        this.id = id;
        this.email = email;
        this.password1 = password1;
        this.password2 = password2;
        this.lastname = lastname;
        this.firstname = firstname;
        this.birthday = birthday;
    }
  }
  