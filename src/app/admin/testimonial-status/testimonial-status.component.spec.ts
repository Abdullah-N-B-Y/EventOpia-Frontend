import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialStatusComponent } from './testimonial-status.component';

describe('TestimonialStatusComponent', () => {
  let component: TestimonialStatusComponent;
  let fixture: ComponentFixture<TestimonialStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialStatusComponent]
    });
    fixture = TestBed.createComponent(TestimonialStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
