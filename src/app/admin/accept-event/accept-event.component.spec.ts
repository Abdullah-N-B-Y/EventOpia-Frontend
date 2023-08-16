import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptEventComponent } from './accept-event.component';

describe('AcceptEventComponent', () => {
  let component: AcceptEventComponent;
  let fixture: ComponentFixture<AcceptEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptEventComponent]
    });
    fixture = TestBed.createComponent(AcceptEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
