import { Component, OnInit } from '@angular/core';
import * as data from '../../../assets/response.json';
import _ from 'lodash';
import  *  as  dummy  from  './../../../assets/response.json';
import { StoreService } from './../../services/store.service';

@Component({
  selector: 'app-reference-datagrid',
  templateUrl: './reference-datagrid.component.html',
  styleUrls: ['./reference-datagrid.component.scss']
})
export class ReferenceDatagridComponent implements OnInit {
  gridData:any = dummy;
  columns: Array<any> = [];
  rowData = {};
  deleteModal: boolean = false;
  primaryButtonName: string;
  addModalTitle : string; 
  editModal: boolean= false;

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.store.setTypeList(dummy);
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

  onDeleteRow(){
    this.deleteModal = true;
  }

  onRowClick(event){
    this.rowData = event.data;
    console.log('match--->',event.originalEvent.target.id);
    this.editModal = true;
    if(event.originalEvent.target.id == 'delete'){
      // this.onDeleteRow();
      this.primaryButtonName = 'Delete';
      this.addModalTitle = 'Delete Record';
      this.deleteModal = true;
    } else{
      this.primaryButtonName = 'Update';
      this.addModalTitle = 'Edit Record'
    }
  }

  onCancel(){
    this.deleteModal = this.editModal = false;
  }
}
