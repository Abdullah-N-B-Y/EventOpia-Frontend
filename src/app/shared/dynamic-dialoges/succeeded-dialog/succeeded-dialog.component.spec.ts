import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucceededDialogComponent } from './succeeded-dialog.component';

describe('SucceededDialogComponent', () => {
  let component: SucceededDialogComponent;
  let fixture: ComponentFixture<SucceededDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucceededDialogComponent]
    });
    fixture = TestBed.createComponent(SucceededDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
