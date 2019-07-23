import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormTypeComponent } from './create-form-type.component';

describe('CreateFormTypeComponent', () => {
  let component: CreateFormTypeComponent;
  let fixture: ComponentFixture<CreateFormTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFormTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
