import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommHomeListComponent } from './ecomm-home-list.component';

describe('EcommHomeListComponent', () => {
  let component: EcommHomeListComponent;
  let fixture: ComponentFixture<EcommHomeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcommHomeListComponent]
    });
    fixture = TestBed.createComponent(EcommHomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
