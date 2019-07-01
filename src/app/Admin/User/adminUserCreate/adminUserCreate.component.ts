import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'adminUserCreate',
    templateUrl: './adminUserCreate.component.html',
    styleUrls: ['./adminUserCreate.component.css']
})
export class AdminUserCreateComponent {

    /** utilisateur */
    firstNameUser: string;
    /***/
    lastNameUser: string;
    /***/
    emailUser: string;
    /***/
    passwordUser: string;
    /***/
    confirmPasswordUser: string;

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

    ngOnInit() {
    }

    onCreate() {
        console.log("nom :" + this.firstNameUser + ", prenom :" + this.lastNameUser + ", email :" + this.emailUser+ ", password :" + this.passwordUser);
    }
}
