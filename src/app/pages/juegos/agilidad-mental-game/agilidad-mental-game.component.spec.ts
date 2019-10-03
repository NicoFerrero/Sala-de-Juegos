import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgilidadMentalGameComponent } from './agilidad-mental-game.component';

describe('AgilidadMentalGameComponent', () => {
  let component: AgilidadMentalGameComponent;
  let fixture: ComponentFixture<AgilidadMentalGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgilidadMentalGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgilidadMentalGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
