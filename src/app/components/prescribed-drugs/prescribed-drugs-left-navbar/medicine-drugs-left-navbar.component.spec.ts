import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescribedMedicineLeftNavbarComponent } from './prescribed-medicine-left-navbar.component';

describe('PrescribedMedicineLeftNavbarComponent', () => {
  let component: PrescribedMedicineLeftNavbarComponent;
  let fixture: ComponentFixture<PrescribedMedicineLeftNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescribedMedicineLeftNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescribedMedicineLeftNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
