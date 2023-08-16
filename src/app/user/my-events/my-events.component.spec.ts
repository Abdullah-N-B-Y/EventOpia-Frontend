import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventsComponent } from './my-events.component';

describe('MyEventsComponent', () => {
  let component: MyEventsComponent;
  let fixture: ComponentFixture<MyEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyEventsComponent]
    });
    fixture = TestBed.createComponent(MyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
