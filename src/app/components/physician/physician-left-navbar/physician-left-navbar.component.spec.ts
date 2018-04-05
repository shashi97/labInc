import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleLeftNavbarComponent } from './role-left-navbar.component';

describe('RoleLeftNavbarComponent', () => {
  let component: RoleLeftNavbarComponent;
  let fixture: ComponentFixture<RoleLeftNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleLeftNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleLeftNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
