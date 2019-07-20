import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Register/register.component';
import { RoomsComponent } from './Rooms/rooms.component';
import { RoomBookingComponent } from './RoomBooking/roomBooking.component';
import { AdminHomeComponent } from './Admin/Home/adminHome.component';
import { AdminBookingDetailComponent } from './Admin/Booking/AdminBookingDetail/adminBookingDetail.component';
import { AdminRoomDetailComponent } from './Admin/Room/AdminRoomDetail/adminRoomDetail.component';
import { AdminEventDetailComponent } from './Admin/Event/AdminEventDetail/adminEventDetail.component';
import { AdminRoomCreateComponent } from './Admin/Room/AdminRoomCreate/adminRoomCreate.component';
import { AdminEventCreateComponent } from './Admin/Event/AdminEventCreate/adminEventCreate.component';
import { AdminEventUpdateComponent } from './Admin/Event/AdminEventUpdate/adminEventUpdate.component';
import { EventsComponent } from './Events/events.component';
import { AdminUserComponent } from './Admin/User/adminUser.component';
import { AdminUserUpdateComponent } from './Admin/User/adminUserUpdate/adminUserUpdate.component';
import { AdminUserCreateComponent } from './Admin/User/adminUserCreate/adminUserCreate.component';
import { adminServiceHomeComponent } from './Admin/Service/adminServiceHome.component';
import { adminServiceUpdateComponent } from './Admin/Service/adminServiceUpdate/adminServiceUpdate.component';
import { AdminHotelDashboardUpdateComponent } from './Admin/HotelDashboard/adminHotelDashboardUpdate.component';
import { AdminAddServiceBookingComponent } from './Admin/Booking/AdminAddServiceBooking/adminAddServiceBooking.component';
import { AdminRestaurantComponent } from './Admin/Restaurant/adminRestaurant.component';
import { AdminRestaurantBookingCreate } from './Admin/Restaurant/adminRestaurantBookingCreate/adminRestaurantBookingCreate.component';
import { AdminMenuComponent } from './Admin/Menu/adminMenu.component';
import { AdminDishCreate } from './Admin/Menu/adminDishCreate/adminDishCreate.component';
import { AdminMenuCreate } from './Admin/Menu/adminMenuCreate/adminMenuCreate.component';
import { AdminMenuUpdate } from './Admin/Menu/adminMenuUpdate/adminMenuUpdate.component';
import { HotelServicesComponent } from './HotelServices/hotel-services-component/hotelServices.component';
import { AdminAddEventBookingComponent } from './Admin/Booking/AdminAddEventBooking/adminAddEventBooking.component';
import { AdminRestaurantOrderComponent } from './Admin/Restaurant/adminRestaurantOrderDetail/adminRestaurantOrder.component';
import { AdminEmployeeCreateComponent } from './Admin/User/adminEmployeeCreate/adminEmployeeCreate.component';

const routes: Routes = [
  /******** Accueil **********/
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  /******** Partie authentification **********/
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  /******** Partie reservation **********/
  { path: 'rooms', component: RoomsComponent },
  { path: 'roomBooking', component: RoomBookingComponent },
  /******** Partie évenements et services **********/
  { path: 'events', component: EventsComponent },
  { path: 'hotelServices', component: HotelServicesComponent},
  /*************************************************************************************/
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'adminHotelDashboardUpdate', component: AdminHotelDashboardUpdateComponent },
  /******** Gestion des utilisateurs **********/
  { path: 'adminUserCreate', component: AdminUserCreateComponent},
  { path:  'adminEmployeeCreate', component: AdminEmployeeCreateComponent},
  { path: 'adminUser', component: AdminUserComponent },
  { path: 'adminUserUpdate', component: AdminUserUpdateComponent },
  /******** Gestion des reservations **********/
  { path: 'adminBookingDetail', component: AdminBookingDetailComponent },
  { path: 'adminAddServiceBooking', component: AdminAddServiceBookingComponent },
  { path: 'adminAddEventBooking', component: AdminAddEventBookingComponent},
  /******** Gestion des chambres **********/
  { path: 'adminRoomDetail', component: AdminRoomDetailComponent },
  { path: 'adminRoomCreate', component: AdminRoomCreateComponent },
  /******** Gestion des services **********/
  { path: 'adminServiceHome', component: adminServiceHomeComponent},
  { path: 'adminServiceUpdate', component: adminServiceUpdateComponent},
  /******** Gestion des evenements **********/
  { path: 'adminEventDetail', component: AdminEventDetailComponent },
  { path: 'adminEventCreate', component: AdminEventCreateComponent },
  { path: 'adminEventUpdate', component: AdminEventUpdateComponent },
  /******** Gestion du restaurant **********/
  { path: 'adminRestaurant', component: AdminRestaurantComponent},
  { path: 'adminRestaurantBookingCreate', component: AdminRestaurantBookingCreate},
  { path: 'adminRestaurantOrder', component: AdminRestaurantOrderComponent},
  /******** Gestion des plats **********/
  { path: 'adminMenu', component: AdminMenuComponent},
  { path: 'adminDishCreate', component: AdminDishCreate},
  { path: 'adminMenuCreate', component: AdminMenuCreate},
  { path: 'adminMenuUpdate', component: AdminMenuUpdate}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
