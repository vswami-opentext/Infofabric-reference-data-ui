import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  activeType = {}
  relationship = {};
  typeList = [];
  activeModel = {};
  activeTenant ='thermofisher';
  attributes = [];
  relationships = [];
  query = ''
  fields = []
  activeKeyFields = [];
  headers = [];

  constructor() { }

  setActiveModel(model){
    this.activeModel = model;
    
  }

  setActiveType(type){
    this.activeType = type;
    this.setActiveRelationship(this.activeModel);
    this.setAttributes();
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
