import { Component, OnInit } from '@angular/core';
import * as data from '../../../assets/response.json';
import _ from 'lodash';

@Component({
  selector: 'app-reference-datagrid',
  templateUrl: './reference-datagrid.component.html',
  styleUrls: ['./reference-datagrid.component.scss']
})
export class ReferenceDatagridComponent implements OnInit {
  gridData: Array<any> = [];
  columns: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.fetchColumns(data.results);
    this.gridData = this.flattenedReferenceDocs();
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

  flattenedReferenceDocs() {
    return this.flattenDocuments(data.results);
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

}
