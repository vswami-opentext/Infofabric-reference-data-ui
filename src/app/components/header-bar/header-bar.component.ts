import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MainServiceService } from './../../services/main-service.service';
import { StoreService } from './../../services/store.service';
import { NotificationProperties, NotificationService } from 'tgocp-ng/dist';
import { Subscription } from 'rxjs';
import { constants } from './../../utils/costant';
import _ from 'lodash';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy {

  tenantList: any = [];
  modelList: any = [];
  typeList: any = [];
  attributes = [];
  
  headers =[];
  fields = [];
  equality = [];
  query = '';
  activeKeyFields =[]
  hasRelationships = true;
  relationships = [];
  priority = {
    equality: 1,
    data: 2,
    metadata: 3
  }
  
  relatedEqualities = {};
  activeRelatedTypes = [];

  headerObj = { tenantSelected: { 'companyName':''}, modelSelected: {}, typeSelected: {} };
  actionModal = false;
  selectedAction:string;
  enableFilter:boolean = false;
  showAction = false;
  isLoading = false;
  subs: Subscription[] =[];
  primaryButton = 'Create';
  addTitle = 'Create Record';
  prop = new NotificationProperties();

  constructor(private mainService: MainServiceService, private store: StoreService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.isLoading=true;
    const tenantSubs =this.mainService.fetchTenant().subscribe( data => {
      this.isLoading =false;
      this.tenantList = data['tenant'];
      
      // if(localStorage.getItem('activeTenant')){
      //   this.store.activeTenant = this.headerObj['tenantSelected'].name = localStorage.getItem('activeTenant');
      // } else {
        this.store.activeTenant = this.headerObj['tenantSelected'] = data['tenant'][0];
      // }
      this.tenantChange();
    }, err => {
      this.prop.type = "error";
      this.prop.title = err;
      this.notification.show(this.prop);
    });
    this.subs.push(tenantSubs);
  }

  tenantChange() {
    this.isLoading =true;
    this.store.activeTenant = this.headerObj['tenantSelected'];
    const modelSubs = this.mainService.fetchModel(this.headerObj['tenantSelected']['companyName']).subscribe(results => {
      this.isLoading =false;
      this.modelList = results['data'];
      this.store.setModelList(this.modelList);
      // this.store.setActiveModel(results['data'][0]);
      this.store.setActiveModel(results['models'][0]);
      this.modelChange();
      localStorage.setItem('activeTenant', this.headerObj['tenantSelected']['name']);

      const permissionSubs = this.mainService.getPermissions(this.modelList).subscribe(data => {
        this.store.setPermission(data);
        console.log('tenant permission data--->', data);
      }, err => {
        this.prop.type = "error";
        this.prop.title = err;
        this.notification.show(this.prop);
      });
      this.subs.push(permissionSubs);
    }, err => {
      this.prop.type = "error";
      this.prop.title = err;
      this.notification.show(this.prop);
    });
    this.subs.push(modelSubs);
  }

  modelChange(){
    this.isLoading =true;
    const typeListSubs = this.mainService.fetchComponent(this.store.activeTenant, this.store.activeModel['id']).subscribe( data => {
      this.typeList = data;
      this.isLoading =false;
      // this.store.setActiveType(this.typeList[0]);
      this.store.setActiveType(data[0]);
      this.store.setTypeList(data);
      this.headerObj['typeSelected']=data[0];
      this.typeChange()
    }, err => {
      this.prop.type = "error";
      this.prop.title = err;
      this.notification.show(this.prop);
    });
    this.subs.push(typeListSubs);
  }

  typeChange(){
    console.log('fetching grid....',this.headerObj['typeSelected']);
    if(this.headerObj['typeSelected']){
      this.store.setActiveType(this.headerObj['typeSelected']);
    }
    this.store.filters = [];
    this.loadHeader();
    this.fetchDocuments();
    // const filterRecordSubs = this.mainService.getFilteredRecords(this.store.activeTenant,  this.store.activeModel['id'] ).subscribe(data => {
    //   this.store.onTypeAction(data);
    //   this.filtersApplied();
    // }, err => {
    //   this.prop.type = "error";
    //   this.prop.title = err;
    //   this.notification.show(this.prop);
    // });
    
    // this.subs.push(filterRecordSubs);
    
  }

  hasImportRoles() {
    return _.includes(this.store.roles, constants.IMPORT_ROLE);
  }
  hasExportRoles() {
    return _.includes(this.store.roles, constants.EXPORT_ROLE);
  }
  userAddable() {
    return _.includes(this.store.roles, constants.ADD_ROLE);
  }

  filtersApplied() {
    if (JSON.parse(window.sessionStorage.getItem(this.store.activeType['name']))) {
      this.store.filters = JSON.parse(window.sessionStorage.getItem(this.store.activeType['name']))
    } else {
      this.store.filters = []
    }
  }

  popupEvent(event){
    this.enableFilter = true;
    this.store.getRelatedFieldData();
    console.log('--filter--',this.enableFilter);
    this.selectedAction = event;
  }

  onCancel(){
    console.log('popupw-->', this.enableFilter);
    this.enableFilter = false;
  }

  userWritable() {
  //   if (_.includes(this.store.roles, constants.EDIT_ROLE)) {
  //   if (this.store.activeCastConnector !== null) {
  //     return this.store.permission[this.store.activeTenant['name']].dataCast;
  //   } else if (this.store.activeDataStream !== null) {
  //     return this.store.permission[this.store.activeTenant['name']].dataStream;
  //   }
  // }
    return false;
  }

  isReadOnly() {
    return this.store.isReadOnly;
  }

  fetchDocuments(){
    this.isLoading = true;
    let payload = {
      tenant: this.store.activeTenant,
      model: this.store.activeModel['name'],
      type: this.store.activeType['name'],
      fields: this.store.fields,
      skip: (this.store.pagination.page - 1) * this.store.pagination.rowsPerPage,
      limit: this.store.pagination.rowsPerPage,
      sort: this.store.pagination.sortBy,
      queryString: this.store.query,
      rels: JSON.stringify(this.store.activeKeyFields),
      descending: this.store.pagination.descending
    };
    payload = this.addFilterQueryToParams(payload);
    try {
      if (payload.tenant && payload.model) {
        this.getReferenceDocuments(payload);
        this.isLoading =false;
      }
    } catch (error) {
      console.log('error occured here', error);
      if (error.body.message && error.body.statusCode !== 404) {
        console.error(error.body.message);
        if (error.body.message.includes('User is not authorized')) {
          // this.setErrorText(`You are not allowed to query data for this component :  ${this.activeType.name}`);
        } else {
          // this.setErrorText(error.body.message);
        }
      }
      this.store.setreferenceData({
        results: [],
        count: 0
      });
    }
  }

  getFilters() {
    // --to be add
    // if (this.useSession) {
      return this.getFilterFromSession() || this.store.filters;
    // }
    // return this.activeFilters;
  }

  getFilterFromSession() {
    // --to be add
    return JSON.parse(window.sessionStorage.getItem(this.store.activeType['name']));
    // return JSON.parse(window.sessionStorage.getItem("key"));
  }

  addFilterQueryToParams(payload) {
    let filters = this.getFilters();
    if (filters[0] && filters[0].attribute && filters[0].query) {
      // this.filterCount = filters.length;
      _.forEach(filters, (obj) => {
        /* This "if" part is specifically implemented for filtering relationship
        data. This is a tempoarary solution and filtering
        should be supported in backend by default. UI
        should avoid getting id's and filtering based on them... */
        if (obj.type === 'dropdown') {
          try {
            let arr = [];
            if (obj.operator.value === 'LIKE') {
              // Another workaround for contains
              const query = obj.query.replace(/%/g, '');
              const field = this.store.relatedFieldInfo.filter((f) => {
                const allValues = _.map(f.values, 'name');
                const hasValue = _.filter(allValues, v => v.toLowerCase().includes(query.toLowerCase())).length > 0;
                return hasValue;
              });
              let vals = [];
              if (field[0] && field[0].values) {
                vals = _.map(field[0].values.filter(v => v.name.toLowerCase().includes(query.toLowerCase())), 'value');
              }
              let op = obj.isOr ? 'OR' : 'AND';
              payload.relatedFilters = payload.relatedFilters || {};
              payload.relatedFilters[op] = payload.relatedFilters[op] || [];

              arr = payload.relatedFilters[op];
              arr.push({
                field: field[0] ? field[0].actualFilterValue : '',
                op: 'IN',
                value: vals,
                not: obj.isNot
              });
              payload.relatedFilters[op] = arr;
            } else {
              const field = this.store.relatedFieldInfo.filter(f => _.map(f.values, 'name').includes(obj.query));
              const val = field[0] ? field[0].values.filter(v => v.name === obj.query) : [];

              let op = obj.isOr ? 'OR' : 'AND';
              payload.relatedFilters = payload.relatedFilters || {};
              payload.relatedFilters[op] = payload.relatedFilters[op] || [];

              arr = payload.relatedFilters[op];
              arr.push({
                field: field[0] ? field[0].actualFilterValue : '',
                op: obj.operator.value,
                value: val[0] ? val[0].value : [],
                not: obj.isNot
              });
              payload.relatedFilters[op] = arr;
            }
          } catch (e) {
            console.error(e);
          }
        } else {
          let op = obj.isOr ? 'OR' : 'AND';
          payload.relatedFilters = payload.relatedFilters || {};
          payload.relatedFilters[op] = payload.relatedFilters[op] || [];

          payload.relatedFilters[op].push({
            field: obj.attribute,
            op: obj.operator.value,
            value: obj.query,
            not: obj.isNot
          });
        }
      });
    } else {
      // this.filterCount = 0;
      // this.store.setFilters([]);
    }
    return payload;
  }

  async getReferenceDocuments(payload){
    console.log('filter query payload---->', payload);
    this.showAction = false;
    const { tenant, model, type, rels, fields, sort, descending, skip, limit, filters, relatedFilters, queryString } = payload;
    // commit('SET_LOADING', true);
    // commit('SET_ERRORS', []);

    if (filters || relatedFilters) {
      let results = await this.mainService.getFilteredRecords({
        tenant,
        model,
        type,
        rels,
        fields,
        sort,
        descending,
        skip,
        limit,
        queryString
      }, { filters, relatedFilters });
      this.store.onTypeAction(results);
        this.filtersApplied();
      if (results['ok']) {
        // commit('LOAD_REFERENCE_DOCUMENTS', data);
      } else {
        // commit('LOAD_REFERENCE_DOCUMENTS', {
        //   results: [],
        //   count: 0
        // });
      }
      // commit('SET_LOADING', false);
    } else {
      const filterRecordSub =this.mainService.getFilteredRecords({
        tenant,
        model,
        type,
        fields,
        rels,
        sort,
        descending,
        skip,
        limit,
        queryString
      },null).subscribe(results => {
        console.log('data fround-=-=->', results);
        this.store.onTypeAction(results);
        this.filtersApplied();
        // if (results['ok']) {
        //   this.store.onTypeAction(results);
        //   this.filtersApplied();
        //   // commit('LOAD_REFERENCE_DOCUMENTS', data);
        // } else {
        //   // commit('LOAD_REFERENCE_DOCUMENTS', {
        //   //   results: [],
        //   //   count: 0
        //   // });
        // }
      })
      this.subs.push(filterRecordSub);
      
      // commit('SET_LOADING', false);
    }
  }

  loadHeader(){
    // this.activeType = this.store.activeType;
    let activeModel = this.store.activeModel;
    // this.attributes = _.filter(activeModel['attributes'], a => this.store.activeType['attributes'].includes(a.id));
    // this.attributes = this.store.attributes;
     this.store.setAttributes();
    
     this.headers = _.sortBy(_.map(_.filter(this.store.attributes, a => a.name !== 'deleted'), (a, i) => {
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
      console.log('-=-=-header created=>', this.headers);
       
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

  ngOnDestroy(){
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
  }

}
