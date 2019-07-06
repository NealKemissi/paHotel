import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'adminUserUpdate',
    templateUrl: './adminUserUpdate.component.html',
    styleUrls: ['./adminUserUpdate.component.css']
})
export class AdminUserUpdateComponent {

    /** utilisateur */
    user: User = new User();
    /***/
    error: string;
    /***/
    loading: boolean = true;
    /***/
    msgUpdate: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

    ngOnInit() {
        this.route.queryParams.forEach(params => {
            this.userService.getUser(params['email']).subscribe(
                data => {
                    this.user = data;
                    this.loading = false;
                    console.log('email user'+this.user.email);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
        })

    }

    onUpdate() {
        if (!this.msgUpdate) {
            console.log("nom :" + this.user.firstname + ", prenom :" + this.user.lastname + ", email :" + this.user.email);
            this.msgUpdate = true;
            setTimeout(() => {
                //requete http update ...
                this.router.navigate(['/adminUser']);
            }, 2500);
        }
    }
}
