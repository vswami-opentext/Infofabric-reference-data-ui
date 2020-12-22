import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { StoreService } from './../../services/store.service';
import { MainServiceService } from './../../services/main-service.service';
import _ from 'lodash';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

   OPERATORS = {
    EQUAL_TO: 'Equal To',
    NOT_EQUAL_TO: 'Not Equal To',
    CONTAINS: 'Contains',
    BEGINS_WITH: 'Begins With',
    ENDS_WITH: 'Ends With'
  };

  primaryButtonName:string ='Filter';
  addModalTitle:string ='Filter';
  filterAttributes = [];
  activeFilters =[];
  size = 'lg';
  operators= [
    {
      name: 'Equals To',
      value: 'EQ'
    }, {
      name: 'Contains',
      value: 'LIKE'
    }
  ]
  filterCount:any;
  validData:boolean;
  

  @Input() showAction:any;

  @Output()
  cancelEmit = new EventEmitter();
  
  constructor(private store:StoreService, private service: MainServiceService) { }

  ngOnInit(): void {
    _.forEach(this.store.headers, (obj) => {
      if (!obj.activeRelationship) {
        this.filterAttributes.push({ name: obj.text, value: obj.value, type: obj.type });
      }
    });
    console.log('filter---->', this.filterAttributes);
    this.filterAttributes;
  }


  addFilter(){
    this.activeFilters.push({attribute:{},operator:{},value:'',arr:false});
  }
  removeFilter(index){
    this.activeFilters.splice(index,1);
  }

  // ngOnChanges(){

  // getFilterAttributes(){
  //   const filterAttributes = [];
  //   _.forEach(this.store.headers, (obj) => {
  //     if (!obj.activeRelationship) {
  //       filterAttributes.push({ name: obj.text, value: obj.value, type: obj.type });
  //     }
  //   });
  //   console.log('filter---->', filterAttributes);
  //   return filterAttributes;
  // }
// }
  attrChange(filterIndex, event) {
    console.log('attr--->', event.value)
    let attribute = event.value;
    this.activeFilters[filterIndex].attribute = event.value;

    let index = _.findIndex(this.activeFilters, f => f.attribute === attribute.value);

      let activeFilterElement = this.activeFilters[filterIndex];
      activeFilterElement['attribute'] = attribute.value;
      activeFilterElement['name'] = attribute.name;
      activeFilterElement['type'] = attribute.type;

      if (index > -1) {
        activeFilterElement['isOr'] = true;
        this.activeFilters[index]['isOr'] = true;
      } else {
        activeFilterElement['isOr'] = false;
      }

      this.removeFilterAttributeFromList(attribute);
      this.addFilterAttributeToList(filterIndex);
      this.setFilterStatus();
  }
  removeFilterAttributeFromList(attributeToRemove) {
    this.filterAttributes = _.remove(this.filterAttributes, (filterAttribute) => {
      return filterAttribute.name === attributeToRemove.name;
    });
  }

  addFilterAttributeToList(indexToAdd) {
    const filterToAdd = this.activeFilters[indexToAdd];
    if (filterToAdd['name']) {
      this.filterAttributes.push({
        name: filterToAdd['name'],
        value: filterToAdd.attribute
      });
    }
  }

  setFilterStatus() {
    let flagFilterStatus = true;
    this.activeFilters.forEach((value, key) => {
      const filterName = value['name'].length;
      const filterValue = value['queryText'].length;
      if (!(filterName && filterValue)) {
        flagFilterStatus = false;
      }
    });
    if (flagFilterStatus) {
      // this.$emit('filterEnabled');
    } else {
      // this.$emit('filterDisabled');
    }
    return flagFilterStatus;
  }

  updateOperator(operator, filterIndex) {
    this.activeFilters[filterIndex].operator = operator;
    this.updateFilterQuery(filterIndex);
  }

  updateFilterQuery(filterIndex) {
    let query = this.activeFilters[filterIndex]['queryText'];
    const { operator } = this.activeFilters[filterIndex];
    if (operator['name'] === this.OPERATORS.CONTAINS) {
      query = `%${query}%`;
    } else if (operator['name'] === this.OPERATORS.BEGINS_WITH) {
      query = `${query}%`;
    } else if (operator['name'] === this.OPERATORS.ENDS_WITH) {
      query = `%${query}`;
    }
    this.activeFilters[filterIndex]['query'] = query;
  }

  operatorChange(i, event) {
    console.log('operator--->', event.value)
    this.activeFilters[i].operator = event.value.name;
  }

  valueChange(i, event) {
    console.log('val--->', event.data)
    this.activeFilters[i].value = event.target.value;
  }

  andOperation(i, event) {
    console.log('arr--->', event.target.checked);
    this.activeFilters[i].arr = event.target.checked;
  }

  addNewFilter() {
    let filterModel = {
      attribute: '',
      name: '',
      operator: this.operators[0],
      query: '',
      queryText: '',
      caseSensitive: false,
      type: '',
      isOr: false,
      isNot: false
    };
    this.activeFilters.push(filterModel);
    this.setFilterStatus();
  }

  enableFilter() {
    this.validData = false;
  }

  disableFilter() {
    this.validData = true;
  }

  removeAll(){
   this.clearAll();
   this.applyFilter();
  }

  clearAll(){
    _.forEach(this.activeFilters, (obj, index) => {
      this.addFilterAttributeToList(index);
    });
    this.activeFilters = [];
    this.addNewFilter();
    this.disableFilter();
  }

  async applyFilter(){
    this.store.setFilters(this.activeFilters);
    console.log('filter data->', this.activeFilters)
    const payload = {
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
    this.addFilterQueryToParams(payload);
    try {
      if (payload.tenant && payload.model) {
        await this.getReferenceDocuments(payload);
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
  getFilterFromSession() {
    // --to be add
    // return JSON.parse(window.sessionStorage.getItem("key" || this.sessionKey));
    return JSON.parse(window.sessionStorage.getItem("key"));
  }
  getFilters() {
    // --to be add
    // if (this.useSession) {
      return this.getFilterFromSession() || this.activeFilters;
    // }
    return this.activeFilters;
  }

  addFilterQueryToParams(payload) {
    let filters = this.getFilters();
    if (filters[0] && filters[0].attribute && filters[0].query) {
      this.filterCount = filters.length;
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
      this.filterCount = 0;
      // this.store.setFilters([]);
    }
  }

  async getReferenceDocuments(payload){
    const { tenant, model, type, rels, fields, sort, descending, skip, limit, filters, relatedFilters, queryString } = payload;
    // commit('SET_LOADING', true);
    // commit('SET_ERRORS', []);

    if (filters || relatedFilters) {
      let results = await this.service.getFilteredRecords({
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
      let results = await this.service.getRecords({
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
      });

      if (results['ok']) {
        // commit('LOAD_REFERENCE_DOCUMENTS', data);
      } else {
        // commit('LOAD_REFERENCE_DOCUMENTS', {
        //   results: [],
        //   count: 0
        // });
      }
      // commit('SET_LOADING', false);
    }
  }

  onCancel() {
    this.showAction = false;
    this.cancelEmit.emit();
  }

}
