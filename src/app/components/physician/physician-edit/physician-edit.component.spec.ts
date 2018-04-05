import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianEditComponent } from './Physician-edit.component';

describe('PhysicianEditComponent', () => {
  let component: PhysicianEditComponent;
  let fixture: ComponentFixture<PhysicianEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicianEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
