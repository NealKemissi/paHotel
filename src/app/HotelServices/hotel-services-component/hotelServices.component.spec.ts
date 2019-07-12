import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelServicesComponentComponent } from './hotelServices.component';

describe('HotelServicesComponentComponent', () => {
  let component: HotelServicesComponentComponent;
  let fixture: ComponentFixture<HotelServicesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelServicesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelServicesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
