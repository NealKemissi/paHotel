import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { global } from '../globals';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  token : string = localStorage.getItem('token');
  is_admin : boolean = (localStorage.getItem('admin') == undefined || localStorage.getItem('admin') == '0') ? false : true;
  id_user : number = parseInt(localStorage.getItem('id'));

  constructor(private route: ActivatedRoute, private router: Router) { }

  onNavigateLogin():void {
    this.router.navigate(['/login']);
  }

  onEditDashboard():void {
    if(true == true){
      this.router.navigate(['/adminHotelDashboardUpdate']);
    }
  }
}
