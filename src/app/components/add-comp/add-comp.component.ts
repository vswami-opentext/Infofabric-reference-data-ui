import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import _ from 'lodash';
import * as data from './../../../assets/model-dummy.json'
import { StoreService } from './../../services/store.service';
import { MainServiceService } from './../../services/main-service.service';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';

@Component({
  selector: 'app-add-comp',
  templateUrl: './add-comp.component.html',
  styleUrls: ['./add-comp.component.scss']
})
export class AddCompComponent implements OnInit, OnChanges {

  // primaryButtonName:string = 'Add';
  // addModalTitle:string = 'Add Component';
  attributes = [];
  fields = [];
  equality = [];
  priority = {
    equality: 1,
    data: 2,
    metadata: 3
  }
  activeKeyFields =[]
  hasRelationships = true;
  relationships = [];
  types = [];
  activeType = {};
  relatedEqualities = {};
  activeRelatedTypes = [];
  query = '';
  selectedRecord= {};
  headers =[];
  selectedRelationshipField= {};
  relatedFieldInfo= [];
  rowData = {};

  @Input()
  primaryButtonName:any;

  @Input()
  addModalTitle:any;

  @Input()
  showAction:any;

  @Input()
  onDisable:any;

  @Input()
  rowDatas:any;

  @Output()
  cancelEmit = new EventEmitter();

  constructor(private store: StoreService, private service: MainServiceService) { }

  // ngOnInit(): void {
    ngOnChanges(){
      if(this.rowDatas){
        this.rowData =this.rowDatas;
      }
    // this.rowData = this.rowDatas;
    let activeType = this.store.activeType;
    let activeModel = this.store.activeModel;
    this.attributes = _.filter(activeModel['attributes'], a => activeType['attributes'].includes(a.id));
    // this.attributes = this.store.attributes;
    
     this.headers = _.sortBy(_.map(_.filter(this.attributes, a => a.name !== 'deleted'), (a, i) => {
      this.fields.push(a.name);
      let isEquality = this.equality.includes(a.name);
      let priority = this.priority.data;

      if (isEquality) {
        priority = this.priority.equality;
      } else if (a.isMeta) {
        priority = this.priority.metadata;
      }
      return {
        text: a.name,
        value: a.name,
        align: 'left',
        sortable: true,
        width: 'auto',
        isMetaData: a.isMeta,
        nullAllowed: a.nullAllowed,
        isEquality,
        priority,
        datatype: a.type
      };
    }), ['priority']);
    
    // const relationships = rels ? rels.relationships : state.activeModel.relationships;
    this.relationships = this.store.relationships;
    // if (relationships) {
      
    // this.relationships = data[0].relationships.filter(rel => _.find(rel.members, m => m.type === this.store.activeType['_key']));
    this.activeKeyFields = [];
      if (this.hasRelationships) {
        let query = '';
        this.relationships.forEach((r) => {
          
          try {
            const { members } = r;
            let keyField;
            members.forEach((m, mi) => {
              if (m.extension && m.type === this.store.activeType['_key']) {
                keyField = m.name;
                this.relatedEqualities[keyField] = m.isEqualityField;
                this.activeKeyFields.push({ [keyField]: m.extension.ReferenceDataUI.joinSelections });
              } else {
                const relatedMember = members.filter(mem => mem.type === this.store.activeType['_key'])[0];
                
                if (relatedMember['extension']) {
                  this.activeRelatedTypes.push({
                    type: this.store.typeList.filter(t => t._key === m.type),
                    relName: relatedMember.name || '',
                    selections: [relatedMember.extension.ReferenceDataUI.joinSelections, 'id'],
                    keyField: relatedMember.keyFieldName
                  });
                  // this.activeRelatedTypes.push({});
                }
              }
            });
            this.store.activeKeyFields = this.activeKeyFields;
          } catch (e) {
            console.error(`${e}. Relationships not properly configured.`);
          }
        });
        this.query = `${this.fields}`;
      } else {
        this.query = `${this.fields}`;
      }
      this.store.query = this.query;
      this.store.fields = this.fields;
      
      this.activeKeyFields.forEach((k) => {
        _.forOwn(k, (values, keyField) => {
          // headers = this.getRelatedHeaders(keyField, values).concat(headers);
          
          let valuesToBeSet = this.getRelatedHeaders(keyField, values);
          this.headers = valuesToBeSet.concat(this.headers);
          
          let keyF = {
            activeRelationship: keyField,
            values: valuesToBeSet,
            isEquality: _.reduce(valuesToBeSet, (value, i) => { return i.isEquality || value; }, true),
            isMetaData: _.reduce(valuesToBeSet, (value, i) => { return i.isMetaData || value; }, false)
          };
          this.headers.unshift(keyF);
        });
      });
      // this.store.headers(this.headers);      
      this.store.setHeaders(this.headers);
  }
  
  getRelatedHeaders(key, values) {
    let headers = [];
    values.forEach((k) => {
      let isEquality = this.relatedEqualities[key];
      let priority = this.priority.data;
      if (isEquality) {
        priority = this.priority.equality;
      }

      headers.push({
        text: `${key}_${k}`,
        value: `${key}-${k}`,
        align: 'left',
        sortable: false,
        isMetaData: false,
        width: 'auto',
        type: 'dropdown', // Needs to be dynamic somehow
        priority,
        isEquality
      });
    });
    return headers;
  }

  joinedSelections(key, value) {
    this.getRelatedFieldData();
    let values = _.map(this.getRelatedInfoForRelationship_op1(key, value), 'value');
    if (value) {
      value.forEach((element) => {
        let filteredValues = [];
        if (this.selectedRecord[element.value]) {
          filteredValues = _.concat(filteredValues, _.filter(values, (o) => {
            return o.includes(this.selectedRecord[element.value]);
          }));
        }
        [this.selectedRecord[key]] = filteredValues;
      }); // console.log('filtered Vlues', this.selectedRecord[key]);
    }
    console.log('value fna--->', values);
    // values = [{activeRelationship:'name'},{activeRelationship:'name'},{activeRelationship:'name'}]
    return values;
  }
  getRelationshipHeaders_op2(values, key) {
    let returnValue = _.map(values, v => _.truncate(v.value, { length: 100 }));
    let [actualValue] = returnValue;
    return returnValue;
  }
  setSelectedRelationshipField(value, key) {
    this.selectedRelationshipField[key] = value;
    // console.log(this.selectedRelationshipField);
  }
  sortValuesM(input, key, direction = 'asc') {
    if (key) {
      return orderBy(input, [item => !isNumber(get(item, key)) ? get(item, key).toLowerCase() : get(item, key)], direction);
    }
    return orderBy(input, direction);
  }

  getRelatedDocuments(type, query, relName, keyField) {
    // this.$nextTick(async () => {
      const payload = {
        tenant: this.store.activeTenant,
        model: this.store.activeModel['name'],
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
      console.log('----+_+3',this.relatedFieldInfo, this.activeRelatedTypes);
    // });
  }

  getRelatedFieldData() {
    if (this.hasRelationships && this.activeRelatedTypes.length > 0) {
      
      this.activeRelatedTypes.forEach(async (t) => {
        if (t.type[0]) {
          const query = `${t.selections}`;
          this.getRelatedDocuments(t.type[0].name, query, t.relName, t.keyField);
        }
      });
    }
  }

  getRelatedInfo(key, value = '', mode = '') {
    let returnValue;
    const filteredInfo = this.relatedFieldInfo.filter(r => r.name === key);
    let values = filteredInfo[0] ? this.sortValuesM(filteredInfo[0].values, 'name') : [];
    returnValue = _.map(values, v => !_.isNumber(v.name) ? _.truncate(v.name, { length: 100 }) : v.name);
    return returnValue;
  }

  getRelatedInfoForRelationship_op1(key, value) { // console.log('getRelatedInfoForRelationship_op1 ', key, value, this.getRelationshipHeaders_op2(value, key));
      let returnValue = [];
      this.getRelationshipHeaders_op2(value, key).forEach((el) => {
        this.setSelectedRelationshipField(el, key);
        let relatedInfo = this.getRelatedInfo(el);
        for (let i = 0; i < relatedInfo.length; i++) {
          if (returnValue[i]) {
            returnValue[i].value = `${returnValue[i].value}, ${relatedInfo[i]}`;
          } else {
            returnValue[i] = { value: relatedInfo[i], names: [] };
            // returnValue[i].names.push(el);
          }
          returnValue[i].names.push(el);
          // console.log('return Value', returnValue);
          // returnValue[i] = this.getRelatedInfo(el);
        }
      });
      return returnValue;
    }

  onCancel(){
    this.showAction = false;
    this.cancelEmit.emit();
  }

}
