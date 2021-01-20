import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AddCompComponent } from './add-comp.component';
import { NotificationService } from 'tgocp-ng/dist';
import { Observable, of } from 'rxjs';

describe('AddCompComponent', () => {
  let component: AddCompComponent;
  let fixture: ComponentFixture<AddCompComponent>;

  class MockNotification {

    public show(lang: string): Observable<any> {
      return of({
        results: 'success',
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompComponent ],
      imports: [
        HttpClientModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: NotificationService, useClass: MockNotification }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
