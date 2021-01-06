import { Injectable } from '@angular/core';
import _ from 'lodash';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  activeType = {}
  relationship = {};
  typeList = [];
  modelList = [];
  activeModel = {};
  activeTenant ='thermofisher';
  attributes = [];
  relationships = [];
  query = ''
  fields = []
  activeKeyFields = [];
  headers = [];
  referenceData={};
  relatedFieldInfo=[];
  activeRelatedTypes=[];
  permission = {};
  isReadOnly = false;
  filters = [];
  pagination:any = {
    page: 1,
    rowsPerPage: 10,
    sortBy: null,
    descending: true,
    totalItems: 0
  }

  private _subject = new Subject<any>();
  activeDataStream: any;
  activeCastConnector: any;


  constructor() { }

  setActiveRelatedTypes(data){
    this.activeRelatedTypes = data;
  }

  setFilters(filter){
    this.filters = filter;
  }

  setStream(){
    // let extension  = this.activeModel;
    let ext = this.activeModel;

    this.activeCastConnector = null;
    this.activeDataStream = null;

    if (ext['extension']) {
      const { dataStream: stream, dataCastConnector: cast }= ext['extension']['ReferenceDataUI'];
      if (cast) {
        this.activeCastConnector = cast;
      } else if (stream) {
        this.activeDataStream = stream;
      }
    }
  }

  setPermission(permission){
    this.permission = permission;
  }

  setModelList(model){
    this.modelList = model;
  }

  setActiveModel(model){
    this.activeModel = model;
    this.setStream();;
  }

  onTypeAction(event) {
    this._subject.next(event);
  }

  loadGrid(): Observable<any> {
    return this._subject.asObservable();
}

  setActiveType(type){
    this.activeType = type;
    if (type) {
      const { extension } = type;
      if (extension) {
        const { isReadOnly } = extension.ReferenceDataUI;
        if (isReadOnly !== undefined) {
          this.isReadOnly = isReadOnly;
        } else {
          this.isReadOnly = false;
        }
      }
    }
    this.setActiveRelationship(this.activeModel);
    this.setAttributes();
  }

  setreferenceData(grid){
    this.referenceData = grid;
  }

  setActiveRelationship(rels){
    const relationships = rels ? rels.relationships : this.activeModel['relationships'];
    if (relationships) {
      this.relationships = relationships.filter(rel => _.find(rel.members, m => m.type === this.activeType['_key']));
    }
  }

  setRelationship(relationship){
    this.relationship = relationship;
  }

  setTypeList(data){
    this.typeList = data;
  }

  setAttributes(){
    this.attributes = this.attributes || _.filter(this.activeModel['attributes'], a => this.activeType['attributes'].includes(a.id));
  }

  setHeaders(header){
    this.headers = header;
  }
}
