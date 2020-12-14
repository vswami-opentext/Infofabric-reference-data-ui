import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoreService } from  './.././../services/store.service';
import { MainServiceService } from 'src/app/services/main-service.service';
import { utils, write } from 'xlsx';
import _ from 'lodash';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  primaryButtonName:string ='Export';
  addModalTitle:string ='Export';

  exportData = {};

  @Input()
  showAction:boolean = true;

  @Output()
  cancelEmit = new EventEmitter();

  formatList:any = ['xlsx'];

  constructor(private store:StoreService, private mainService:MainServiceService) { }

  ngOnInit(): void {
  }

  formatChange(event){
    console.log('--->',event);
    this.exportData['formatSelected'] = event.target.value;
  }
  export(){

  const payload = {
    tenant: this.store.activeTenant,
    model: this.store.activeModel['name'],
    type: this.store.activeType['name'],
    fields: this.store.fields,
    limit: 0,
    queryString: this.store.query,
    rels: JSON.stringify(this.store.activeKeyFields)
  };
  // this.addFilterQueryToParams(payload);
  try {
    // const { data } = await MainServiceService.getFilteredRecords(payload, { relatedFilters: payload.relatedFilters });
    let data  = this.mainService.getFilteredRecords(payload, { relatedFilters: payload.relatedFilters });
    // this.allDocuments = data.results;
    this.exportDataToDownload(data['results']);
  } catch (error) {
    // this.allDocuments = [];
    console.error(error);
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
}

downloadFile(data, fileName, fileFormat) {
  let fileNameWithExtension = `${fileName}.${fileFormat}`;
  if (fileFormat === 'xlsx') {
    let sheetData = utils.json_to_sheet(data);
    let newWorkBook = utils.book_new();
    utils.book_append_sheet(newWorkBook, sheetData, fileName);
    let workBookOptions = { bookType: 'xlsx', bookSST: false, type: 'binary' };
    let workBookOut = write(newWorkBook, workBookOptions);
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
    this.showAction = false;
    this.cancelEmit.emit();
  }

}
