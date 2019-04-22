import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcountPage } from './add-acount.page';

describe('AddAcountPage', () => {
  let component: AddAcountPage;
  let fixture: ComponentFixture<AddAcountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAcountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
