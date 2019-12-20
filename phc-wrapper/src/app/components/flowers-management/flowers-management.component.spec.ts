import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowersManagementComponent } from './flowers-management.component';

describe('FlowersManagementComponent', () => {
  let component: FlowersManagementComponent;
  let fixture: ComponentFixture<FlowersManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowersManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
