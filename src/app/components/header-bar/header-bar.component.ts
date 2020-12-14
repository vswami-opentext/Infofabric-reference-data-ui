import { Component, OnInit } from '@angular/core';
import { MainServiceService } from './../../services/main-service.service';
import * as data from './../../../assets/model-dummy.json'
import * as datatype from './../../../assets/type-dummy.json'
import { StoreService } from './../../services/store.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  tenantList: any = [];
  modelList: any = [];
  typeList: any = [];

  typeSelected:any;
  tenantSelected:any;
  modelSelected:any;
  actionModal = false;
  selectedAction:string;
  enableFilter:boolean = false;
  showAction = false;

  primaryButton = 'Add';
  addTitle = 'Create Record';

  constructor(private mainService: MainServiceService, private store: StoreService) { }

  ngOnInit(): void {
    this.typeList = data[0].types;
    this.tenantList = this.mainService.fetchTenant();
  }

  tenantChange(){
    // this.modelList = this.mainService.fetchModel();
    this.store.setActiveModel(data);
    this.modelList = data;
  }
  modelChange(){
    // this.typeList = this.mainService.fetchComponent();
    this.typeList = datatype;
  }
  typeChange(){
    console.log('fetching grid....',this.typeSelected); 
    this.store.setActiveModel(data[0]);
    this.store.setActiveType(this.typeSelected);
    this.store.setTypeList(this.typeList);
  }

  popupEvent(event){
    this.enableFilter = true;
    console.log('--filter--',this.enableFilter);
    this.selectedAction = event;
  }

  onCancel(){
    console.log('popupw-->', this.enableFilter);
    this.enableFilter = false;
  }

}
