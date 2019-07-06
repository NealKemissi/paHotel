import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from '../globals';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  titre = "My-Template";
  isAdmin : boolean = global.IS_ADMIN;

  constructor(private route: ActivatedRoute, private router: Router) { }

  onNavigateLogin():void {
    this.router.navigate(['/login']);
  }

  onEditDashboard():void {
    if(this.isAdmin == true){
      this.router.navigate(['/adminHotelDashboardUpdate']);
    }
  }
}
