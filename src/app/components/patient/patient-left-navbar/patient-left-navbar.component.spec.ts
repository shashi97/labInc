import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLeftNavbarComponent } from './patient-left-navbar.component';

describe('PatientLeftNavbarComponent', () => {
  let component: PatientLeftNavbarComponent;
  let fixture: ComponentFixture<PatientLeftNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientLeftNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientLeftNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
