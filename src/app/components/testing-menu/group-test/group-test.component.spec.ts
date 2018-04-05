import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTestComponent } from './group-test.component';

describe('GroupTestComponent', () => {
  let component: GroupTestComponent;
  let fixture: ComponentFixture<GroupTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
