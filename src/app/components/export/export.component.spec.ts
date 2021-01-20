import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ExportComponent } from './export.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from 'tgocp-ng/dist';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

describe('ExportComponent', () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;
  
  class MockNotification {

    public show(lang: string): Observable<any> {
      return of({
        results: 'success',
      });
    }
  }

  class MocktranslateService {

    public show(lang: string): Observable<any> {
      return of({
        results: 'success',
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports:[ HttpClientModule ],
      providers: [
        { provide: NotificationService, useClass: MockNotification },
        { provide: TranslateService, useClass: MocktranslateService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
