import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { NotificationService } from 'tgocp-ng/dist';

describe('AppComponent', () => {

  let translate: TranslateService;

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

    public getBrowserLang (lang: string) {
      return 'en';
    }
    public use(lang: string) {
      return 'en';
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: NotificationService, useClass: MockNotification },
        { provide: TranslateService, useClass: MocktranslateService }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    // translate.setDefaultLang('en');
    translate = new TranslateService(null,null,null,null,null,null,null,null,null);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    translate = new TranslateService(null,null,null,null,null,null,null,null,null);
    // translate.setDefaultLang('en');
    expect(app).toBeTruthy();
  });

  it(`should have as title 'infofabric-reference-data-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('infofabric-reference-data-ui');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('infofabric-reference-data-ui app is running!');
  // });
});
