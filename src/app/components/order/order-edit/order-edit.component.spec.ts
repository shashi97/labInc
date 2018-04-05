import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { insuranceEditComponent } from './Order-edit.component';

describe('insuranceEditComponent', () => {
  let component: insuranceEditComponent;
  let fixture: ComponentFixture<insuranceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ insuranceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(insuranceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
