import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatheroComponent } from './cathero.component';

describe('CatheroComponent', () => {
  let component: CatheroComponent;
  let fixture: ComponentFixture<CatheroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatheroComponent]
    });
    fixture = TestBed.createComponent(CatheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
