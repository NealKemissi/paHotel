import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { global } from '../globals';

@Component({
  selector: 'my-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 
    token : string = localStorage.getItem('token');
    is_admin : boolean = (localStorage.getItem('admin') == undefined || localStorage.getItem('admin') == '0') ? false : true;
    id_user : number = parseInt(localStorage.getItem('id'));

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
      
      console.log('from NAVBAR : admin ici : '+localStorage.getItem('admin')+', is admin : '+this.is_admin);
    }

    onLogout(): void {
      localStorage.clear();
      window.location.reload();
      //this.router.navigate(['/dashboard']);
    }
}
