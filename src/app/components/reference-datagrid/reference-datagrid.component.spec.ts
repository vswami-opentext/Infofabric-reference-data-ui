import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDatagridComponent } from './reference-datagrid.component';

describe('ReferenceDatagridComponent', () => {
  let component: ReferenceDatagridComponent;
  let fixture: ComponentFixture<ReferenceDatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceDatagridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
