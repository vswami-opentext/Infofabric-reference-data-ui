import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCompComponent } from './../add-comp/add-comp.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'tgocp-ng/dist';
import { ReferenceDatagridComponent } from './reference-datagrid.component';
import { MainServiceService } from './../../services/main-service.service';
import { Observable, of } from 'rxjs';

describe('ReferenceDatagridComponent', () => {
  let component: ReferenceDatagridComponent;
  let service: MainServiceService;
  let addComo: AddCompComponent;
  let fixture: ComponentFixture<ReferenceDatagridComponent>;

  class MockUser {
    public getFeatures(): Observable<any> {
      return of({
        prop: 'Select',
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceDatagridComponent, AddCompComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [ { provide: MainServiceService, useClass: MockUser },],
      imports: [
        DataTableModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDatagridComponent);
    component = fixture.componentInstance;
    service = new MainServiceService(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
