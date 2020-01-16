import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BecomeACustomerComponent } from './become-a-customer.component';

describe('LandingPageComponent', () => {
  let component: BecomeACustomerComponent;
  let fixture: ComponentFixture<BecomeACustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeACustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeACustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
