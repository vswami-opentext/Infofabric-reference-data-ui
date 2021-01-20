import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainServiceService } from './../../services/main-service.service'
import { StoreService } from './../../services/store.service'
import { HeaderBarComponent } from './header-bar.component';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from 'tgocp-ng/dist';

describe('HeaderBarComponent', () => {
  let component: HeaderBarComponent;
  let mainService: MainServiceService;
  let store: StoreService;
  let serviceNotification: NotificationService;
  let fixture: ComponentFixture<HeaderBarComponent>;

  class MockUser {
    public fetchTenant(): Observable<any> {
      return of({
        tenant : [{name :'name'}],
      });
    }
    public fetchModel(): Observable<any> {
      return of({
        models : [{name :'name'}],
      });
    }
    public getFeatures (): Observable<any> {
      return of({
        models : [{name :'name'}],
      });
    }
    public fetchComponent (): Observable<any> {
      return of({
        models : [{name :'name'}],
      });
    }
  }
  class MockNotification {

    public show(lang: string): Observable<any> {
      return of({
        results: 'success',
      });
    }
  }

  class StoreClass {

    activeModel ={ name:''};
    activeType = { name: ''};
    types = [];
    attributes = [];

    public show(lang: string): Observable<any> {
      return of({
        results: 'success',
      });
    }
    public setActiveModel(data){
      this.activeModel = data;
    }
    public setActiveType(data){
      this.activeModel = data;
    }     
    public setModelList (data) {
      this.activeModel = data;
    }
    public setTypeList(data){
      this.types =data;
    }
    public setAttributes(data){
      this.attributes = data;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBarComponent ],
      imports: [
        FormsModule,
        HttpClientModule
      ],
      providers: [
        { provide: MainServiceService, useClass: MockUser },
        { provide: NotificationService, useClass: MockNotification },
        { provide: StoreService, useClass: StoreClass }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBarComponent);
    component = fixture.componentInstance;
    store = new StoreService(null);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
