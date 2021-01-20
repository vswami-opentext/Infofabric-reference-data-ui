import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { StoreService } from  './.././../services/store.service';
import { MainServiceService } from 'src/app/services/main-service.service';
import { NotificationProperties, NotificationService } from 'tgocp-ng/dist';
import { utils, write } from 'xlsx';
import _ from 'lodash';


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportComponent implements OnInit, OnDestroy {

  primaryButtonName:string ='Export';
  addModalTitle:string ='Export';
  warningModal:boolean = false;
  filterCount:any;

  exportData = {fileName:'',formatSelected:''};

  @Input() showAction:boolean = true;

  @Output() cancelEmit = new EventEmitter();

  formatList:any = ['xlsx'];
  prop = new NotificationProperties();

  constructor(private store:StoreService, private mainService:MainServiceService, private notification: NotificationService) { }

  ngOnInit(): void {
  }

  formatChange(event){
    this.exportData['formatSelected'] = event.target.value;
  }
  noFilterWarning(){
    if(this.store.filters.length > 0){
      this.export()
    }else{
      this.showAction =false;
      this.warningModal = true;
    }
  }

  export() {
    if (this.userCanQuery()) {
      const payload = {
        tenant: this.store.activeTenant,
        model: this.store.activeModel['name'],
        type: this.store.activeType['name'],
        fields: this.store.fields,
        limit: 0,
        queryString: this.store.query,
        rels: JSON.stringify(this.store.activeKeyFields)
      };
        this.addFilterQueryToParams(payload);
      try {
        // const { data } = await MainServiceService.getFilteredRecords(payload, { relatedFilters: payload.relatedFilters });
        this.mainService.getFilteredRecords(payload, { relatedFilters: payload['relatedFilters'] }).subscribe(data => {
          this.exportDataToDownload(data['results']);
        }, err => {
          this.prop.type = "error";
          this.prop.title = err;
          this.notification.show(this.prop);
        });
        // this.allDocuments = data.results;

      } catch (error) {
        // this.allDocuments = [];
        console.error(error);
      }
    }
  }

s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF; // eslint-disable-line no-bitwise
  }
  return buf;
}

download(blob, fileName) {
  if (navigator.msSaveBlob) { // For IE 10+
    navigator.msSaveBlob(blob, fileName);
  } else {
    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.style.visibility = 'hidden';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  this.warningModal = false;
}

downloadFile(data, fileName, fileFormat) {
  let fileNameWithExtension = `${fileName}.${fileFormat}`;
  if (fileFormat === 'xlsx') {
    let sheetData = utils.json_to_sheet(data);
    let newWorkBook = utils.book_new();
    utils.book_append_sheet(newWorkBook, sheetData, fileName);
    // let workBookOptions = { bookType: 'xlsx', bookSST: false, type: 'binary' };
    let workBookOut = write(newWorkBook, { bookType: 'xlsx', bookSST: false, type: 'binary' });
    let blob = new Blob([this.s2ab(workBookOut)], { type: 'application/octet-stream' });
    this.download(blob, fileNameWithExtension);
  } else {
    let blob = new Blob([data], {
      type: 'text/csv;charset=utf-8;'
    });
    this.download(blob, fileNameWithExtension);
  }
}

downloadData(data, headers) {
  let dataToExport = [];
  // if (this.format === 'xlsx') {
    _.forEach(data, (val) => {
      let o = {};
      _.forEach(headers, (v, i) => {
        if (v) {
          if (val[v] !== undefined) {
            o[v] = val[v];
          } else {
            o[v] = '';
          }
        }
      });
      dataToExport.push(o);
    });
  // } else {
  //   dataToExport = this.parseArrayOfObjectsAsCSV(data, headers);
  // }
  this.downloadFile(dataToExport, this.exportData['fileName'], this.exportData['formatSelected']);
}

exportDataToDownload(documents) {
  let flattenedDocs = this.flattenDocuments(documents);
  this.downloadData(flattenedDocs, this.store.headers.map(h => h.value));
  // this.closeModal('exportModal');
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

flattenDocuments(documents) {
  let flattenedRefDocs = [];
  documents.forEach(ref => flattenedRefDocs.push(this.flattenObject(ref)));
  return flattenedRefDocs;
}

  onCancel(){
    this.showAction = this.warningModal =false;
    this.cancelEmit.emit();
  }

  userCanQuery() {
    return (this.store.permission[`${this.store.activeModel['name']}_dq`] !== undefined) ? this.store.permission[`${this.store.activeModel['name']}_dq`] : true;
  }

  addFilterQueryToParams(payload) {
    // let filters = this.getFilters();
    let filters = this.store.filters;
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

  ngOnDestroy(){

  }

}
