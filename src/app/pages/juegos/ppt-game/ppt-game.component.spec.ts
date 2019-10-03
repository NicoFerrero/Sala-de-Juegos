import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PptGameComponent } from './ppt-game.component';

describe('PptGameComponent', () => {
  let component: PptGameComponent;
  let fixture: ComponentFixture<PptGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PptGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PptGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
