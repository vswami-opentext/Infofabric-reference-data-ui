import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MainServiceService } from './main-service.service';

describe('MainServiceService', () => {
  let services: MainServiceService;
  var httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MainServiceService]
    });
      services = TestBed.get(MainServiceService);
      httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(services).toBeTruthy();
  });

  it('it should retrive get getPermissions', () => {
    // services.getPermissions([]).subscribe(data => {
    //   console.log('------------------------>',data);
    //   expect(data).toBe([]);
    // });
    httpMock.match(`http://localhost:3000/permission`);
    expect(MainServiceService).toBeTruthy();
    // expect(request.request.method).toBe('GET');
  });

  it('it should retrive get fetchTenant', () => {
    services.fetchTenant().subscribe(data => {
      expect(data).toBe(0);
    })
    httpMock.match(`http://localhost:3000/tenants`);
    // expect(request.request.method).toBe('DELETE');
  });

  it('it should retrive get fetchModel', () => {
    services.fetchModel("tenant").subscribe(data => {
      expect(data).toBe(0);
    })
    httpMock.match('http://localhost:3000/models?');
    // expect(request.request.method).toBe('DELETE');
  });

  // it('it should retrive get fetchComponent', () => {
  //   services.fetchComponent("tenant", "01").subscribe(data => {
  //     expect(data).toBe([{}]);
  //   })
  //   httpMock.match('api/types/${tenant.companyName}/${typeId}');
  //   // expect(request.request.method).toBe('DELETE');
  // });

  it('it should retrive get getFilteredRecords', () => {
    services.getFilteredRecords("tenant", false).subscribe(data => {
      expect(data).toBe(0);
    })
    httpMock.match('api/types/${tenant.companyName}/${typeId}');
    // expect(request.request.method).toBe('DELETE');
  });

  it('it should retrive get getFilteredRecords', () => {
    services.getFilteredRecords("tenant", true).subscribe(data => {
      expect(data).toBe(0);
    })
    httpMock.match('api/types/${tenant.companyName}/${typeId}');
    // expect(request.request.method).toBe('DELETE');
  });

  // it('it should retrive get getRecords', () => {
  //   services.getRecords({ type : true}).subscribe(data => {
  //     expect(data).toBe(0);
  //   })
  //   httpMock.match('api/types/${tenant.companyName}/${typeId}');
  //   // expect(request.request.method).toBe('DELETE');
  // });

  it('it should retrive get getFeatures', () => {
    services.getFeatures({type:''}).subscribe(data => {
      expect(data).toBe(0);
    })
    httpMock.match('api/features');
    // expect(request.request.method).toBe('DELETE');
  });
});
