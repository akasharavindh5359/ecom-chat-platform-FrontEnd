import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommHomeComponent } from './ecomm-home.component';

describe('EcommHomeComponent', () => {
  let component: EcommHomeComponent;
  let fixture: ComponentFixture<EcommHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcommHomeComponent]
    });
    fixture = TestBed.createComponent(EcommHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
