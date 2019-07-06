import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from '../globals';

@Component({
  selector: 'my-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 
    login : boolean = true;
    isAdmin : boolean = global.IS_ADMIN;

    constructor(private route: ActivatedRoute, private router: Router) { }

    onLogout(): void {
      this.login = false;
        this.router.navigate(['/dashboard']);
    }
}
