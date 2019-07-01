import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoomsComponent } from './rooms.component';
import { RoomService } from '../services/room.service';
import { HttpClientModule } from '@angular/common/http';

describe('RoomsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        RoomsComponent
      ],
      providers: [
          RoomService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RoomsComponent);
    const app = fixture.debugElement.componentInstance;
    
    fixture.detectChanges();
    expect(app).toBeTruthy(); 
  });

  it('should render title in a h2 tag', () => {
    const fixture = TestBed.createComponent(RoomsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('NOS CHAMBRES');
  });
});