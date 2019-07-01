import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'my-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 
    login : boolean = true;

    constructor(private route: ActivatedRoute, private router: Router) { }

    onLogout(): void {
      this.login = false;
        this.router.navigate(['/dashboard']);
    }
}
