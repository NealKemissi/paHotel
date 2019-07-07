import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoomBookingComponent } from './roomBooking.component';
import { RoomService } from '../services/room.service';
import { HttpClientModule } from '@angular/common/http';

describe('RoomBookingComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        RoomBookingComponent
      ],
      providers: [
          RoomService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RoomBookingComponent);
    const app = fixture.debugElement.componentInstance;
    /***/
    app.dateArrivee = "20/05/2019";
    app.dateDepart = "23/05/2019";
    app.room = {
        id: 12,
        floor: 1,
        seats: 4,
        equipments: ["TV", "climatisation", "fibre"],
        isAvailable: true
    }
    /***/
    fixture.detectChanges();
    expect(app).toBeTruthy(); 
  });

  it('should render title in a h2 tag', () => {
    const fixture = TestBed.createComponent(RoomBookingComponent);
    //fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    /***/
    compiled.dateArrivee = "20/05/2019";
    compiled.dateDepart = "23/05/2019";
    compiled.room = {
        id: 12,
        floor: 1,
        seats: 4,
        equipments: ["TV", "climatisation", "fibre"],
        isAvailable: true
    }
    /***/
    expect(compiled.querySelector('h2').textContent).toContain('RESERVATION');
  });
});