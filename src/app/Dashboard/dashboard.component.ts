import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  titre = "My-Template";

  constructor(private route: ActivatedRoute, private router: Router) { }

  onNavigateLogin():void {
    this.router.navigate(['/login']);
  }
}
