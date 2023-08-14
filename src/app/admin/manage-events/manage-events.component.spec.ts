import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEventsComponent } from './manage-events.component';

describe('ManageEventsComponent', () => {
  let component: ManageEventsComponent;
  let fixture: ComponentFixture<ManageEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEventsComponent]
    });
    fixture = TestBed.createComponent(ManageEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
