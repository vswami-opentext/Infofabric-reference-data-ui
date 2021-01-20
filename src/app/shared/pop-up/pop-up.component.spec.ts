import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PopUpComponent } from './pop-up.component';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

describe('PopUpComponent', () => {
  let component: PopUpComponent;
  let fixture: ComponentFixture<PopUpComponent>;

  class MocktranslateService {

    public show(lang: string): Observable<any> {
      return of({
        results: 'success',
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpComponent ],
      providers: [
        { provide: TranslateService, useClass: MocktranslateService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
