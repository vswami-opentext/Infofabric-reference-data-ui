import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { StoreService } from './../../services/store.service';
import { MainServiceService } from './../../services/main-service.service';
import _ from 'lodash';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import { Subscription } from 'rxjs';

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

  primaryButtonName:string ='FILTER';
  addModalTitle:string ='FILTER';
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
  isLoading:boolean =false;
  subs:Subscription[] =[];

  @Input() showAction:any;
  @Output() cancelEmit = new EventEmitter();
  @Output() filterApply = new EventEmitter();
  
  constructor(private store:StoreService, private service: MainServiceService) { }

  ngOnInit(): void {
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&--->out');
    this.setupCommonFilterMethod();
    this.isLoading=true;
    const gridSub = this.store.loadGrid().subscribe(data => {
      this.activeFilters = [];
      this.filterAttributes = [];
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&--->in');
      this.setupCommonFilterMethod();
      this.isLoading=false;
    });
    this.subs.push(gridSub);
  }


  // addFilter(){
  //   this.activeFilters.push({attribute:{},operator:{},value:'',arr:false});
  // }
  removeFilter(index){
    this.activeFilters.splice(index,1);
  }

  getFilterFromSession() {
    // --to be add
    return JSON.parse(window.sessionStorage.getItem(this.store.activeType['name']));
    // return JSON.parse(window.sessionStorage.getItem("key"));
  }

  setupCommonFilterMethod() {
    _.forEach(this.store.headers, (obj) => {
      if (!obj.activeRelationship) {
        this.filterAttributes.push({ name: obj.text, value: obj.value, type: obj.type });
      }
    });
    console.log('filter---->', this.filterAttributes);
    this.filterAttributes;
    const filtersInSession = this.getFilterFromSession();
    console.log('session storeage at---->', filtersInSession);
    
    // if (this.useSession && filtersInSession) {
    if (filtersInSession) {
      this.store.filters = filtersInSession;
      _.forEach(filtersInSession, (filter, index) => {
        this.addFilter(filter);
      });
    } else {
      this.addNewFilter();
    }
  }

  attrChange(filterIndex, event) {
    console.log('attr--->',event, filterIndex)
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
      console.log('removed--->', this.filterAttributes, attribute);
      this.removeFilterAttributeFromList(attribute);
      this.addFilterAttributeToList(filterIndex);
      this.setFilterStatus();
  }
  removeFilterAttributeFromList(attributeToRemove) {
     _.remove(this.filterAttributes, (filterAttribute) => {
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
    this.activeFilters[i].operator = event.value;
  }

  valueChange(i, event) {
    console.log('val--->', event.data)
    this.activeFilters[i].value = event.target.value;
  }

  andOperation(i, event) {
    console.log('arr--->', event.target.checked);
    this.activeFilters[i].arr = event.target.checked;
  }

  addFilter(filter) {
    this.activeFilters.push(filter);
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
    console.log('filter data->', this.activeFilters);
    window.sessionStorage.setItem(this.store.activeType['name'], JSON.stringify(this.activeFilters));
    // this.filterApply.emit();
    this.showAction = false;
    this.cancelEmit.emit();
    
  }

  updateNestedData(filterIndex, text) {
    // this.activeFilters[filterIndex].queryText = text;
    console.log('trust-=->', text, this.activeFilters[filterIndex]);
    this.updateFilterQuery(filterIndex);
    this.setFilterStatus();
  }

  getNestedInfo(filter) {
    const { attribute: key } = filter;
    const filteredInfo = this.store.getRelatedFieldInfo().filter(r => r.name === key);
    const info = filteredInfo[0] ? this.sortValuesM(filteredInfo[0].values, 'name').filter(v => v.name.toLowerCase().includes(filter.queryText.toLowerCase())) : [];
    const result = info.length > 0 ? _.map(info, 'name') : [];
    console.log('dropdown-=->', result);
    return result;
  }
  sortValuesM(input, key, direction = 'asc') {
    if (key) {
      return orderBy(input, [item => !isNumber(get(item, key)) ? get(item, key).toLowerCase() : get(item, key)], direction);
    }
    return orderBy(input, direction);
  }

  onCancel() {
    this.showAction = false;
    this.cancelEmit.emit();
  }

  ngOnDestroy(){
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
  }

}
