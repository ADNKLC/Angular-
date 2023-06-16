/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EgitimListeleComponent } from './egitim-listele.component';

describe('EgitimListeleComponent', () => {
  let component: EgitimListeleComponent;
  let fixture: ComponentFixture<EgitimListeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgitimListeleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgitimListeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
