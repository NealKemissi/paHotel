import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';

@Component({
    selector: 'adminUser',
    templateUrl: './adminUser.component.html',
    styleUrls: ['./adminUser.component.css']
})
export class AdminUserComponent {

    /** pagination */
    page: number = 1;
    /** utilisateurs */
    users: User[] = [];
    /** detail utilisateur */
    user: User;
    /***/
    bookings: Booking[];
    /***/
    error: string;
    /***/
    msgConfirm: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private bookingService: BookingService) { }

    ngOnInit() {
        this.userService.getAllUsers().subscribe(data => this.users = data, error => this.error = error);
    }

    onDetail(idUser: number) {
        if (idUser !== undefined) {
            this.user = this.users.find(i => i.id == idUser);
            this.bookingService.getAllBookings().subscribe(
                data => {
                    this.bookings = data.filter(b => b.id_user == this.user.id);
                }, error => {
                    this.error = error;
                }
            )
        }
    }

    onBookingDetail(id_booking: number) {
        this.router.navigate(['/adminBookingDetail'], {queryParams: { id: id_booking }});
    }

    onCreate() {
        this.router.navigate(['/adminUserCreate']);
    }

    onUpdate() {
        this.router.navigate(['/adminUserUpdate'], {queryParams : { email: this.user.email } });
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
