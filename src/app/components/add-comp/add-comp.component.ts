import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import _ from 'lodash';
import { StoreService } from './../../services/store.service';
import { MainServiceService } from './../../services/main-service.service';
import { NotificationProperties, NotificationService } from 'tgocp-ng/dist';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';

@Component({
  selector: 'app-add-comp',
  templateUrl: './add-comp.component.html',
  styleUrls: ['./add-comp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCompComponent implements OnInit {

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
  prop = new NotificationProperties();

  // @Input()
  // activeRelatedTypes:any;

  @Input() primaryButtonName:any;
  @Input() addModalTitle:any;
  @Input() showAction:any;
  @Input() onDisable:any;
  @Input() rowDatas:any;
  @Output() cancelEmit = new EventEmitter();

  constructor(private store: StoreService, private service: MainServiceService, private notification: NotificationService) { }

  ngOnInit(): void {
    // ngOnChanges(){
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@--------------------');
      if(this.rowDatas){
        this.rowData =this.rowDatas;
      }
      this.headers = this.store.headers;
      this.activeRelatedTypes = this.store.activeRelatedTypes;
    }

  joinedSelections(key, value) { 
    this.getRelatedFieldData();
    let values = _.map(this.getRelatedInfoForRelationship_op1(key, value), 'value');
    console.log('values--->', values);
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
    console.log('getRelatedDocuments-->');
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
      this.store.relatedFieldInfo = this.relatedFieldInfo;
    // });
  }

  getRelatedFieldData() {
    console.log('----+_+3',this.relatedFieldInfo, this.store.activeRelatedTypes);
    if (this.hasRelationships && this.store.activeRelatedTypes.length > 0) {
      
      this.store.activeRelatedTypes.forEach(async (t) => {
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

    canSave(item) {
      let activeRelationshipfound = true;
      this.headers.forEach((h) => {
        if (h.activeRelationship) {
          if (item[h.activeRelationship] && activeRelationshipfound) {
            activeRelationshipfound = true;
          } else {
            activeRelationshipfound = false;
          }
        }
      });
      // console.log('activeRelationshipfound', activeRelationshipfound);
      return _.every(item, (v, k) => {
        let activeHeader = _.find(this.headers, h => h.value === k);
        if (activeHeader && !activeHeader.nullAllowed) {
          return v.length > 0 && activeRelationshipfound;
        }
        return true;
      });
    }

  onCancel(){
    this.showAction = false;
    this.cancelEmit.emit();
  }

  async onAction(){
    console.log('--->',this.primaryButtonName ,this.rowData);
    let result;
    if(this.primaryButtonName == 'create'){
      result =await this.service.createRecord(this.rowData)
    } else if(this.primaryButtonName == 'update'){
      result = await this.service.updateRecord(this.rowData);
    }else{
      result =await this.service.deleteRecord(this.rowData);
    }
    this.prop.type = 'success';
    this.prop.title = result;
    this.notification.show(this.prop); 
  }

}
