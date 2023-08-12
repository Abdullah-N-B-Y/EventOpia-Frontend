import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedDialogComponent } from './failed-dialog.component';

describe('FailedDialogComponent', () => {
  let component: FailedDialogComponent;
  let fixture: ComponentFixture<FailedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailedDialogComponent]
    });
    fixture = TestBed.createComponent(FailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
