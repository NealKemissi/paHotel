import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './Navbar/navbar.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { SearchFilterPipe, HighLightPipe } from './pipe/filter.pipe';
import { LoginComponent } from './Login/login.component';
import { UserService } from './services/user.service';
import { RegisterComponent } from './Register/register.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RoomsComponent } from './Rooms/rooms.component';
import { RoomBookingComponent } from './RoomBooking/roomBooking.component';
import { RoomService } from './services/room.service';
import { AdminHomeComponent } from './Admin/Home/adminHome.component';
import { EventService } from './services/event.service';
import { BookingService } from './services/booking.service';
import { AdminBookingDetailComponent } from './Admin/Booking/AdminBookingDetail/adminBookingDetail.component';
import { AdminRoomDetailComponent } from './Admin/Room/AdminRoomDetail/adminRoomDetail.component';
import { AdminEventDetailComponent } from './Admin/Event/AdminEventDetail/adminEventDetail.component';
import { AdminRoomCreateComponent } from './Admin/Room/AdminRoomCreate/adminRoomCreate.component';
import { BoolTransformPipe, isCleanPipe, RoomStatusPipe } from './pipe/boolean.pipe';
import { AdminEventCreateComponent } from './Admin/Event/AdminEventCreate/adminEventCreate.component';
import { AdminEventUpdateComponent } from './Admin/Event/AdminEventUpdate/adminEventUpdate.component';
import { EventsComponent } from './Events/events.component';
import { AdminUserComponent } from './Admin/User/adminUser.component';
import { AdminUserUpdateComponent } from './Admin/User/adminUserUpdate/adminUserUpdate.component';
import { AdminUserCreateComponent } from './Admin/User/adminUserCreate/adminUserCreate.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { adminServiceHomeComponent } from './Admin/Service/adminServiceHome.component';
import { adminServiceUpdateComponent } from './Admin/Service/adminServiceUpdate/adminServiceUpdate.component';
import { AdminHotelDashboardUpdateComponent } from './Admin/HotelDashboard/adminHotelDashboardUpdate.component';
import { ServiceService } from './services/service.service';
import { RoomBookingService } from './services/room_booking.service';
import { EventBookingService } from './services/event_booking.service';
import { ServiceBookingService } from './services/service_booking.service';
import { AdminAddServiceBookingComponent } from './Admin/Booking/AdminAddServiceBooking/adminAddServiceBooking.component';
import { AdminRestaurantComponent } from './Admin/Restaurant/adminRestaurant.component';
import { TableService } from './services/table.service';
import { TableBookingService } from './services/table_booking.service';
import { AdminRestaurantBookingCreate } from './Admin/Restaurant/adminRestaurantBookingCreate/adminRestaurantBookingCreate.component';
import { AdminMenuComponent } from './Admin/Menu/adminMenu.component';
import { MenuDishBookingService } from './services/menu_dish_booking.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    /***/
    LoginComponent,
    RegisterComponent,
    /***/
    DashboardComponent,
    /***/
    RoomsComponent,
    RoomBookingComponent,
    /***/
    EventsComponent,
    /****************/
    AdminHomeComponent,
    /***/
    AdminHotelDashboardUpdateComponent,
    /***/
    AdminUserComponent,
    AdminUserCreateComponent,
    AdminUserUpdateComponent,
    /***/
    AdminBookingDetailComponent,
    AdminAddServiceBookingComponent,
    /***/
    AdminRoomDetailComponent,
    AdminRoomCreateComponent,
    /***/
    adminServiceHomeComponent,
    adminServiceUpdateComponent,
    /***/
    AdminEventDetailComponent,
    AdminEventCreateComponent,
    AdminEventUpdateComponent,
    /***/
    AdminRestaurantComponent,
    AdminRestaurantBookingCreate,
    AdminMenuComponent,
    /***/
    SpinnerComponent,
    /***/
    SearchFilterPipe,
    HighLightPipe,
    BoolTransformPipe,
    RoomStatusPipe,
    isCleanPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    HttpClientModule,
    FormsModule,
    /** https://www.npmjs.com/package/ngx-pagination */
    NgxPaginationModule,
  ],
  providers: [
    CookieService,
    UserService,
    RoomService,
    EventService,
    ServiceService,
    /***/
    BookingService,
    RoomBookingService,
    EventBookingService,
    ServiceBookingService,
    /***/
    TableService,
    TableBookingService,
    MenuDishBookingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
