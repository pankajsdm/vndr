import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VndrComponent } from './vndr.component';

describe('VndrComponent', () => {
  let component: VndrComponent;
  let fixture: ComponentFixture<VndrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VndrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VndrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
