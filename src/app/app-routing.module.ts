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

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'roomBooking', component: RoomBookingComponent },
  { path: 'events', component: EventsComponent },
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'adminUserCreate', component: AdminUserCreateComponent},
  { path: 'adminUser', component: AdminUserComponent },
  { path: 'adminUserUpdate', component: AdminUserUpdateComponent },
  { path: 'adminBookingDetail', component: AdminBookingDetailComponent },
  { path: 'adminRoomDetail', component: AdminRoomDetailComponent },
  { path: 'adminRoomCreate', component: AdminRoomCreateComponent },
  { path: 'adminEventDetail', component: AdminEventDetailComponent },
  { path: 'adminEventCreate', component: AdminEventCreateComponent },
  { path: 'adminEventUpdate', component: AdminEventUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
