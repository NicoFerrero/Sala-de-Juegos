import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagramaGameComponent } from './anagrama-game.component';

describe('AnagramaGameComponent', () => {
  let component: AnagramaGameComponent;
  let fixture: ComponentFixture<AnagramaGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnagramaGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnagramaGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
