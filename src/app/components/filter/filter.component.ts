import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  primaryButtonName:string ='Filter';
  addModalTitle:string ='Filter';

  @Input() showAction:any;

  @Output()
  cancelEmit = new EventEmitter();

  filterList:any = [{
    name:'name'
  }];

  constructor() { }

  ngOnInit(): void {
  }


  addFilter(){
    this.filterList.push({});
  }
  removeFilter(index){
    this.filterList.slice(index,1);
  }

  onCancel(){
    this.showAction = false;
    console.log('-=-=>',this.showAction);
    this.cancelEmit.emit();
  }

}
