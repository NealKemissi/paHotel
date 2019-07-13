import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/models/dto/userDTO';

@Component({
    selector: 'adminUserCreate',
    templateUrl: './adminUserCreate.component.html',
    styleUrls: ['./adminUserCreate.component.css']
})
export class AdminUserCreateComponent {

    /** utilisateur */
    email: string;
    /***/
    password1: string;
    /***/
    password2: string;
    /***/
    lastname: string;
    /***/
    firstname: string;
    /***/
    birthday: string;
    /***/
    error: string;
    /***/
    msgCreating: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

    ngOnInit() {
    }

    onCreate() {
        console.log("nom :" + this.firstname + ", prenom :" + this.lastname + ", email :" + this.email+ ", password :" + this.password1+ ", date :" + this.birthday);
        this.msgCreating = true;
        let user: UserDTO = new UserDTO(null, this.email, this.password1, this.password2, this.lastname, this.firstname, this.birthday);
        this.userService.createUser(user).subscribe(data => user = data, error => this.error = error);
        setTimeout(() => {
            //requete http create ...
            this.router.navigate(['/adminUser']);
        }, 2500);
    }
}
