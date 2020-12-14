import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { StoreService } from './../../services/store.service';
import _ from 'lodash';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {

  primaryButtonName:string ='Filter';
  addModalTitle:string ='Filter';
  filterAttributes = [];
  filterObj =[{attribute:'',operator:'',value:'',arr:''}];
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

  @Input() showAction:any;

  @Output()
  cancelEmit = new EventEmitter();

  filterList:any = [{
    name:'name'
  }];

  constructor(private store:StoreService) { }

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
    this.filterList.push({attribute:'',operator:'',value:'',arr:''});
  }
  removeFilter(index){
    this.filterList.splice(index,1);
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
tenantChange(i,event, are){
    console.log('let let---->', event);
    console.log('let letar---->', are);
  // this.filterObj[i].attribute = 
}

  onCancel(){
    this.showAction = false;
    this.cancelEmit.emit();
  }

}
