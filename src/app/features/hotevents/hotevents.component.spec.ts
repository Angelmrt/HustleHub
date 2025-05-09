import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteventsComponent } from './hotevents.component';

describe('HoteventsComponent', () => {
  let component: HoteventsComponent;
  let fixture: ComponentFixture<HoteventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoteventsComponent]
    });
    fixture = TestBed.createComponent(HoteventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
