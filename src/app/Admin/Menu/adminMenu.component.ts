import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuDishBookingService } from 'src/app/services/menu_dish_booking.service';
import { Menu } from 'src/app/models/menu';
import { Dishes } from 'src/app/models/dishes';

@Component({
  selector: 'adminMenu',
  templateUrl: './adminMenu.component.html',
  styleUrls: ['./adminMenu.component.css']
})
export class AdminMenuComponent {

  /** pagination */
  page1: number = 1;
  page2: number = 1;
  page3: number = 1;
  /***/
  menus : Menu[];
  /***/
  filter_menu_name: string;
  /***/
  menu_detail : Dishes[];
  /***/
  dishes : Dishes[];
  /***/
  filter_dish_name: string;
  /***/
  error: string;
  /***/
  msgConfirm: boolean = false;
  /***/
  msgCreating: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private menuDishBookingService: MenuDishBookingService) { }

  ngOnInit() {
    this.menuDishBookingService.getAllMenus().subscribe(
      data => {
        this.menus = data,
        this.menuDishBookingService.getAllDishes().subscribe(
          data => {
            this.dishes = data;
          },
          error => {
            this.error = error;
          }
        )
      },
      error => {
        this.error = error;
      }
    )
  }

  onMenuDetail(menu_id : number){
    this.menu_detail = this.dishes.filter(
      d => d.id_menu == menu_id
    );
  }

  onDishDelete(dish_id: number){

  }
}
