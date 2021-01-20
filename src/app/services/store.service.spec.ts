import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let services: StoreService;
  var httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoreService]
    });
    services = TestBed.get(StoreService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(services).toBeTruthy();
  });

  it('it should retrive get setActiveRelatedTypes', () => {
    services.setActiveRelatedTypes([])
      expect(services.activeRelatedTypes).toEqual([]);
  });

  it('it should retrive get setFilters', () => {
    services.setFilters([])
      expect(services.filters).toEqual([]);
  });

  it('it should retrive get setPermission', () => {
    services.setPermission([])
      expect(services.permission).toEqual([]);
  });
  it('it should retrive get setreferenceData', () => {
    services.setreferenceData([])
      expect(services.referenceData).toEqual([]);
  });

  it('it should retrive get setRelationship', () => {
    services.setRelationship([])
      expect(services.relationship).toEqual([]);
  });

  it('it should retrive get setTypeList', () => {
    services.setTypeList([])
      expect(services.typeList).toEqual([]);
  });
  it('it should retrive get setHeaders', () => {
    services.setHeaders([])
      expect(services.headers).toEqual([]);
  });
  it('it should retrive get getRelatedFieldInfo', () => {
    services.relatedFieldInfo = [];
    services.getRelatedFieldInfo()
      expect(services.relatedFieldInfo).toEqual([]);
  });
  it('it should retrive get getEquality', () => {
    services.relatedFieldInfo = [];
    services.getEquality();
      expect(services.relatedFieldInfo).toEqual([]);
  });
  it('it should retrive get setStream', () => {
    services.relatedFieldInfo = [];
    services.setStream();
      expect(services.activeCastConnector).toEqual(null);
  });
  it('it should retrive get setModelList', () => {
    services.relatedFieldInfo = [];
    services.setModelList([]);
      expect(services.modelList).toEqual([]);
  });
  it('it should retrive get setActiveType', () => {
    services.relatedFieldInfo = [];
    services.setActiveType({});
      expect(services.activeType).toEqual({});
  });
  it('it should retrive get setActiveModel', () => {
    services.relatedFieldInfo = [];
    services.setActiveModel({});
      expect(services.activeModel ).toEqual({});
  });
  it('it should retrive get onTypeAction', () => {
    services.relatedFieldInfo = [];
    services.onTypeAction({});
      expect(services.activeType).toEqual({});
  });
  it('it should retrive get getRelatedFieldData', () => {
    services.relatedFieldInfo = [];
    services.hasRelationships = true;
    services.activeRelatedTypes = [
      {type :[]}
    ]
    services.getRelatedFieldData();
      expect(services.activeType).toEqual({});
  });
  // it('it should retrive get setActiveRelationship', () => {
  //   services.relatedFieldInfo = [];
  //   services.setActiveRelationship({relationships: true});
  //     expect(services.relationships).toEqual([]);
  // });
});
