import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import _ from 'lodash';
import { StoreService } from './../../services/store.service';
import { MainServiceService } from './../../services/main-service.service';
import { NotificationProperties, NotificationService } from 'tgocp-ng/dist';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import mapValues from 'lodash/mapValues';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-comp',
  templateUrl: './add-comp.component.html',
  styleUrls: ['./add-comp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCompComponent implements OnInit {

  attributes = [];
  fields = [];
  equality = [];
  priority = {
    equality: 1,
    data: 2,
    metadata: 3
  }
  activeKeyFields = []
  hasRelationships = true;
  relationships = [];
  types = [];
  activeType = {};
  relatedEqualities = {};
  activeRelatedTypes = [];
  query = '';
  selectedRecord = {};
  headers = [];
  selectedRelationshipField = {};
  relatedFieldInfo = [];
  rowData = {};
  isLoading:boolean=false;
  subs: Subscription[] =[];
  prop = new NotificationProperties();

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
    // this.store.getRelatedFieldData();
    let values = _.map(this.getRelatedInfoForRelationship_op1(key, value), 'value');
    // let values = this.getRelatedInfoForRelationship_op1(key, value);
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

  // getRelatedDocuments(type, query, relName, keyField) {
  //   console.log('getRelatedDocuments-->');
  //   // this.$nextTick(async () => {
  //     const payload = {
  //       tenant: this.store.activeTenant,
  //       model: this.store.activeModel['name'],
  //       queryString: query,
  //       type
  //     };
  //     try {
  //       // const { ok, data } =  this.service.getRecords(payload);
  //       const data =  this.service.getRecords(payload);
        
  //       // if (ok) {
  //         data.results.forEach((dat) => {
  //           Object.keys(dat).forEach((d) => {
  //             if (_.findIndex(this.relatedFieldInfo, r => (r.name === `${relName}-${d}`)) === -1) {
  //               this.relatedFieldInfo.push({
  //                 name: `${relName}-${d}`,
  //                 actualFilterValue: keyField,
  //                 values: _.map(data.results, (res) => { return { name: res[d], value: parseInt(res.id, 10) }; })
  //               });
  //             }
  //           });
  //         });
  //       // }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     this.store.relatedFieldInfo = this.relatedFieldInfo;
  //   // });
  // }

  // getRelatedFieldData() {
  //   console.log('----+_+3',this.relatedFieldInfo, this.store.activeRelatedTypes);
  //   if (this.hasRelationships && this.store.activeRelatedTypes.length > 0) {
      
  //     this.store.activeRelatedTypes.forEach(async (t) => {
  //       if (t.type[0]) {
  //         const query = `${t.selections}`;
  //         this.getRelatedDocuments(t.type[0].name, query, t.relName, t.keyField);
  //       }
  //     });
  //   }
  // }

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
      console.log('-=-=============we>',returnValue);
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

  async onAction(event) {
    console.log('--->', this.primaryButtonName, this.rowData);
    this.isLoading = true;
    let result;
    if (this.primaryButtonName == 'Create') {
      this.saveRecord(this.rowData, 'Create');
    } else if (this.primaryButtonName == 'Update') {
      this.saveRecord(this.rowData, 'update');
    } else {
      const deletedRecord = _.cloneDeep(this.selectedRecord);
      deletedRecord.deleted = true;
      this.saveRecord(deletedRecord, 'delete');
    }
    this.prop.type = 'success';
    this.prop.title = result;
    this.notification.show(this.prop);
  }

  trimObjectValuesM(input) {
    return mapValues(input, (val) => {
      if (typeof val === 'boolean') {
        return val;
      }
      return typeof val === 'object' ? this.trimObjectValuesM(val) : val.toString().trim();
    });
  }

  async saveRecord(inputRecordData, value) {
    // let recordData = inputRecordData;
    if (value === 'delete') {
      this.rowDatas = _.pick(this.rowDatas, _.map(_.filter(this.store.attributes, a => !a.isMeta), 'name'));
    } else {
      this.rowDatas = _.pick(this.rowDatas, _.map(_.filter(this.store.attributes, a => a.name !== 'deleted' && !a.isMeta), 'name'));
    }

    // Since the relationship object has been stored with `-` as a seperator, this is necessary.
    // ToDo: Find a better way to store related fields so that this can be avoided.
    if (this.hasRelationships) {
      _.forOwn(inputRecordData, (r, rk) => {
        if (rk.includes('-')) {
          let temp = rk.split('-');
          let key = temp[0];
          let val = temp[1];
          if (this.rowDatas[key]) {
            let rel = this.rowDatas[key];
            rel[val] = r;
          } else {
            this.rowDatas[key] = { [val]: r };
          }
        }
      });
    }

    const payload = {
      [this.store.activeType['name']]: [{
        [this.store.activeType['name']]: this.trimObjectValuesM(this.rowDatas)
      }]
    };

    // this.pending = true;
    if (this.store.activeDataStream !== null || this.store.activeCastConnector !== null) {
      try {
        const { ok, data } = await this.service.saveRecord({
          tenant: this.store.activeTenant,
          model: this.store.activeModel['name'],
          stream: this.store.activeDataStream,
          connector: this.store.activeCastConnector,
          queryString: this.store.query,
          type: {
            name: this.store.activeType['name'],
            equality: this.store.getEquality()
          },
          payload
        });
        if (ok) {
          this.isLoading = false;
          // this.$nextTick(() => {
            // this.fetchDocuments();
          // });
          // this.setSuccessText(`${this.activeType.name} item ${value}d`);
        } else {
          console.error('ERROR', data);
          // this.setErrorText(`Failed to ${value} ${this.activeType.name} item`);
        }
      } catch (error) {
        console.error('ERROR', error);
        this.isLoading = false;
        if (error.data.message) {
          // this.setErrorText(`There was a problem with ${value}. Reason: ${error.data.message}`);
        } else {
          // this.setErrorText(`There was a problem with ${value}. Reason: Internal Error`);
        }
      } finally {
        // this.pending = false;
        // this.closeModal(value);
      }
    } else {
      // this.pending = false;
      //this.setErrorText(`Failed to ${value}. Reference data ingest stream name is not defined for the model`);
    }
  }

}
