import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'adminMenu',
  templateUrl: './adminMenu.component.html',
  styleUrls: ['./adminMenu.component.css']
})
export class AdminMenuComponent {

  /** pagination */
  page: number = 1;
  /***/
  error: string;
  /***/
  msgConfirm: boolean = false;
  /***/
  msgCreating: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
}
