import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConflictComponent } from './create-conflict.component';

describe('CreateConflictComponent', () => {
  let component: CreateConflictComponent;
  let fixture: ComponentFixture<CreateConflictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateConflictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConflictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
