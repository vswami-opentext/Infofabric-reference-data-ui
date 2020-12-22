import { Component, OnInit } from '@angular/core';
import { MainServiceService } from './../../services/main-service.service';
import { StoreService } from './../../services/store.service';
import { NotificationProperties, NotificationService } from 'tgocp-ng/dist';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  tenantList: any = [];
  modelList: any = [];
  typeList: any = [];

  headerObj={ tenantSelected: "", modelSelected: {}, typeSelected: {}};
  actionModal = false;
  selectedAction:string;
  enableFilter:boolean = false;
  showAction = false;

  primaryButton = 'Create';
  addTitle = 'Create Record';
  prop = new NotificationProperties();

  constructor(private mainService: MainServiceService, private store: StoreService, private notification: NotificationService) { }

  ngOnInit(): void {
    
    this.mainService.fetchTenant().subscribe( data => {
      this.tenantList = data['tenant'];
      this.store.activeTenant = this.headerObj['tenantSelected'] = data['tenant'][0];
      this.tenantChange();
    }, err => {
      this.prop.type = "error";
      this.prop.title = err;
      this.notification.show(this.prop);
    });
  }

  tenantChange() {
    this.store.activeTenant = this.headerObj['tenantSelected'];
    this.mainService.fetchModel(this.headerObj['tenantSelected']).subscribe(data => {
      this.modelList = data['models'];
      this.store.setModelList(this.modelList);
      // this.headerObj['modelSelected'] =data['models'][0];
      this.store.setActiveModel(data['models'][0]);
      this.modelChange();
      sessionStorage.setItem('activeTenant', this.headerObj['tenantSelected']);
      this.mainService.getPermissions(this.modelList).subscribe(data => {
        this.store.setPermission(data);
        console.log('tenatn permission data--->',data);
      }, err => {
        this.prop.type = "error";
        this.prop.title = err;
        this.notification.show(this.prop);
      });
    }, err => {
      this.prop.type = "error";
      this.prop.title = err;
      this.notification.show(this.prop);
    });
  }

  modelChange(){
    this.typeList = this.mainService.fetchComponent().subscribe( data => {
      this.typeList = data;
      // this.store.setActiveType(this.typeList[0]);
      this.store.setActiveType(data[0]);
      this.store.setTypeList(data);
      this.headerObj['typeSelected']=data[0];
      this.typeChange()
    }, err => {
      this.prop.type = "error";
      this.prop.title = err;
      this.notification.show(this.prop);
    });
  }

  typeCall(){
    console.log('type params----->', this.store.activeTenant,  this.store.activeModel);
  }

  typeChange(){
    console.log('fetching grid....',this.headerObj['typeSelected']);
    if(this.headerObj['typeSelected']){
      this.store.setActiveType(this.headerObj['typeSelected']);
    }
    // this.typeCall();
    this.mainService.getFilteredRecords(this.store.activeTenant,  this.store.activeModel['id'] ).subscribe(data => {
      console.log('first----->', data);
      this.store.onTypeAction(data);
      
    }, err => {
      this.prop.type = "error";
      this.prop.title = err;
      this.notification.show(this.prop);
    });
    // this.store.setActiveModel(data[0]);
    
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
