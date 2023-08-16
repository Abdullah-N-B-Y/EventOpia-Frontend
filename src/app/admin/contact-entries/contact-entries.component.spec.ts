import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEntriesComponent } from './contact-entries.component';

describe('ContactEntriesComponent', () => {
  let component: ContactEntriesComponent;
  let fixture: ComponentFixture<ContactEntriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactEntriesComponent]
    });
    fixture = TestBed.createComponent(ContactEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
