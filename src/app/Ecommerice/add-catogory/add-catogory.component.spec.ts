import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatogoryComponent } from './add-catogory.component';

describe('AddCatogoryComponent', () => {
  let component: AddCatogoryComponent;
  let fixture: ComponentFixture<AddCatogoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCatogoryComponent]
    });
    fixture = TestBed.createComponent(AddCatogoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
