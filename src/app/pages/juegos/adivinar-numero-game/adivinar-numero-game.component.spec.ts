import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinarNumeroGameComponent } from './adivinar-numero-game.component';

describe('AdivinarNumeroGameComponent', () => {
  let component: AdivinarNumeroGameComponent;
  let fixture: ComponentFixture<AdivinarNumeroGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdivinarNumeroGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdivinarNumeroGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
