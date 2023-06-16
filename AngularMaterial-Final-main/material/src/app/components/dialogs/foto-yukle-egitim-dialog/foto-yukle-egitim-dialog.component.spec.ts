/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FotoYukleEgitimDialogComponent } from './foto-yukle-egitim-dialog.component';

describe('FotoYukleEgitimDialogComponent', () => {
  let component: FotoYukleEgitimDialogComponent;
  let fixture: ComponentFixture<FotoYukleEgitimDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoYukleEgitimDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoYukleEgitimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
