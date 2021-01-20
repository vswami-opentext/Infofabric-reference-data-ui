import { Component, OnInit, OnChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import _ from 'lodash';
import { StoreService } from './../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reference-datagrid',
  templateUrl: './reference-datagrid.component.html',
  styleUrls: ['./reference-datagrid.component.scss']
})
export class ReferenceDatagridComponent implements OnInit, OnChanges, OnDestroy {
  gridData:any;
  columns: Array<any> = [];
  rowData = {};
  deleteModal: boolean = false;
  primaryButtonName: string;
  addModalTitle : string; 
  editModal: boolean= false;
  activeType={};
  attributes = [];
  fields = [];
  equality = [];
  query = '';
  activeKeyFields =[]
  hasRelationships = true;
  relationships = [];
  headers =[];
  priority = {
    equality: 1,
    data: 2,
    metadata: 3
  }
  relatedEqualities = {};
  activeRelatedTypes = [];

  subs: Subscription[] = [];

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    this.store.loadGrid().subscribe(data => {
      console.log('grid second------->',data);
      if(data){
        this.gridData = data.results;
        this.fetchColumns(data.results);
        this.gridData = this.flattenedReferenceDocs(data.results);
      }
      // this.loadHeader();
    })
    
    // if(this.store.referenceData){
    //   // this.store.setTypeList(dummy);
    //   this.fetchColumns(this.store.referenceData);
    //   this.gridData = this.flattenedReferenceDocs();
    // }
  }

  // loadGrid(){
  //   this.fetchColumns(this.store.referenceData);
  //     this.gridData = this.flattenedReferenceDocs();
  // }

  ngOnChanges(){
    this.userWritable();
  }

  fetchColumns(data) {
    this.columns = [];
    _.forOwn(data[0], (val, key) => {
      if (typeof val === 'object') {
        _.forOwn(val, (v, k) => {
          this.columns.push({ field: `${key}-${k}`, header: `${key}-${k}` });
        });
      } else {
        this.columns.push({ field: key, header: key });
      }
    })
  }

  flattenedReferenceDocs(data) {
    return this.flattenDocuments(data);
  }

  flattenDocuments(documents) {
    let flattenedRefDocs = [];
    documents.forEach(ref => flattenedRefDocs.push(this.flattenObject(ref)));
    return flattenedRefDocs;
  }

  flattenObject(object) {
    let flattenedObj = {};
    _.forOwn(object, (val, key) => {
      if (typeof val === 'object') {
        _.forOwn(val, (v, k) => {
          flattenedObj[`${key}-${k}`] = v;
        });
      } else {
        flattenedObj[key] = val;
      }
    });
    return flattenedObj;
  }

  onDeleteRow(){
    this.deleteModal = true;
  }

  onRowClick(event) {
    console.log('permission test--->', this.userWritable(), this.store.isReadOnly);
    if (!this.store.isReadOnly) {

      this.rowData = event.data;
      console.log('match--->', event.originalEvent.target.id);
      this.editModal = true;
      if (event.originalEvent.target.id == 'delete') {
        // this.onDeleteRow();
        this.primaryButtonName = 'Delete';
        this.addModalTitle = 'Are you sure you want to delete this record';
        this.deleteModal = true;
      } else {
        this.primaryButtonName = 'Update';
        this.addModalTitle = 'Edit Record'
      }
    }
  }

  onCancel(){
    this.deleteModal = this.editModal = false;
  }

  loadHeader(){
    this.activeType = this.store.activeType;
    let activeModel = this.store.activeModel;
    this.attributes = _.filter(activeModel['attributes'], a => this.activeType['attributes'].includes(a.id));
    
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
            this.store.setActiveRelatedTypes(this.activeRelatedTypes);
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
          console.log('-----------------------------^%---->', valuesToBeSet);
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
      console.log('-=-=-dear=>', this.headers);
       
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

  userWritable() {
  //   if (this.store.activeCastConnector !== null) {
  //     return this.store.permission[this.store.activeTenant['name']].dataCast;
  //   } else if (this.store.activeDataStream !== null) {
  //     return this.store.permission[this.store.activeTenant['name']].dataStream;
  //   }
    return false;
  }

  ngOnDestroy(){
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
