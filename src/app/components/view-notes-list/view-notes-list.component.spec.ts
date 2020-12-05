import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotesListComponent } from './view-notes-list.component';

describe('ViewNotesListComponent', () => {
  let component: ViewNotesListComponent;
  let fixture: ComponentFixture<ViewNotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNotesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
