import { Injectable } from '@angular/core';
import _ from 'lodash';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';
import { MainServiceService } from './main-service.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  activeType = {}
  relationship = {};
  typeList = [];
  modelList = [];
  activeModel = {};
  activeTenant ={};
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
  roles:any;
  pagination:any = {
    page: 1,
    rowsPerPage: 10,
    sortBy: null,
    descending: true,
    totalItems: 0
  }
  equality:any= [];

  hasRelationships=true;

  private _subject = new Subject<any>();
  activeDataStream: any;
  activeCastConnector: any;


  constructor(private service: MainServiceService) { }

  setActiveRelatedTypes(data){
    this.activeRelatedTypes = data;
  }

  setFilters(filter){
    this.filters = filter;
  }

  getEquality(){
    return !_.isEmpty(this.activeType) ? _.map(this.activeType['equality'].fields, 'name') : []
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
    this.roles = this.service.getFeatures({tenant :this.activeTenant});
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
    console.log('********************************--->', this.activeModel, this.activeType);
    this.attributes = _.filter(this.activeModel['attributes'], a => this.activeType['attributes'].includes(a.id));
  }

  setHeaders(header){
    this.headers = header;
  }

  getRelatedFieldInfo(){
    return this.relatedFieldInfo;
  }

  getRelatedFieldData() {
    console.log('----+_+3',this.relatedFieldInfo, this.activeRelatedTypes);
    if (this.hasRelationships && this.activeRelatedTypes.length > 0) {
      
      this.activeRelatedTypes.forEach(async (t) => {
        if (t.type[0]) {
          const query = `${t.selections}`;
          this.getRelatedDocuments(t.type[0].name, query, t.relName, t.keyField);
        }
      });
    }
  }

  getRelatedDocuments(type, query, relName, keyField) {
    console.log('getRelatedDocuments-->');
    // this.$nextTick(async () => {
      const payload = {
        tenant: this.activeTenant,
        model: this.activeModel['name'],
        queryString: query,
        type
      };
      try {
        // const { ok, data } =  this.service.getRecords(payload);
        const data =  this.service.getRecords(payload);
        
        // if (ok) {
          data.results.forEach((dat) => {
            Object.keys(dat).forEach((d) => {
              if (_.findIndex(this.relatedFieldInfo, r => (r.name === `${relName}-${d}`)) === -1) {
                this.relatedFieldInfo.push({
                  name: `${relName}-${d}`,
                  actualFilterValue: keyField,
                  values: _.map(data.results, (res) => { return { name: res[d], value: parseInt(res.id, 10) }; })
                });
              }
            });
          });
        // }
      } catch (error) {
        console.log(error);
      }
      this.relatedFieldInfo = this.relatedFieldInfo;
    // });
  }
}
