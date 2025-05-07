import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomEventsComponent } from './random-events.component';

describe('RandomEventsComponent', () => {
  let component: RandomEventsComponent;
  let fixture: ComponentFixture<RandomEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomEventsComponent]
    });
    fixture = TestBed.createComponent(RandomEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
