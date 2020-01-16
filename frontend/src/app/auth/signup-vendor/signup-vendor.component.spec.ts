import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupVendorComponent } from './signup-vendor.component';

describe('SignupVendorComponent', () => {
  let component: SignupVendorComponent;
  let fixture: ComponentFixture<SignupVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
