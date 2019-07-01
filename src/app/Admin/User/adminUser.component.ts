import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'adminUser',
    templateUrl: './adminUser.component.html',
    styleUrls: ['./adminUser.component.css']
})
export class AdminUserComponent {

    /** utilisateurs */
    users: User[] = [];
    /** detail utilisateur */
    user: User;
    /***/
    error: string;
    /***/
    msgConfirm: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

    ngOnInit() {
        this.userService.getAllUsers().subscribe(data => this.users = data, error => this.error = error);
    }

    onDetail(idUser: number) {
        if (idUser !== undefined) {
            this.user = this.users.find(i => i.id == idUser);
        }
    }

    onBookingDetail() {
        this.router.navigate(['/adminBookingDetail']);
    }

    onCreate() {
        this.router.navigate(['/adminUserCreate']);
    }

    onUpdate() {
        this.router.navigate(['/adminUserUpdate']);
    }

    onDelete() {
        this.msgConfirm = true;
    }

    onConfirm(value : number) {
        if(value == 0){
            this.msgConfirm = false;
        } else {
            //requete http suppression ...
            this.router.navigate(['/adminHome']);
        }
    }
}
