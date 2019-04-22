import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcountPage } from './edit-acount.page';

describe('EditAcountPage', () => {
  let component: EditAcountPage;
  let fixture: ComponentFixture<EditAcountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAcountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAcountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
