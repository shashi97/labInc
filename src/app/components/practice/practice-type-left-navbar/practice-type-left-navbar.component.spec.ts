import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabLeftNavbarComponent } from './lab-left-navbar.component';

describe('LabLeftNavbarComponent', () => {
  let component: LabLeftNavbarComponent;
  let fixture: ComponentFixture<LabLeftNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabLeftNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabLeftNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
