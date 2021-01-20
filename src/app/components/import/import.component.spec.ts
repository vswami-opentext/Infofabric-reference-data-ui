import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ImportComponent } from './import.component';
import { NotificationService } from 'tgocp-ng/dist';
import { Observable, of } from 'rxjs';

describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;
  let notificationService: NotificationService;

  class NotificationCalls {
    public show(): Observable<any> {
      return of({
        prop: 'Select',
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportComponent ],
      imports: [
        HttpClientModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: NotificationService, useClass: NotificationCalls }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
