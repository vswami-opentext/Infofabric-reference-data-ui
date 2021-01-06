import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainServiceService } from './../../services/main-service.service';
import { StoreService } from './../../services/store.service';
import { NotificationProperties, NotificationService } from 'tgocp-ng/dist';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy {

  tenantList: any = [];
  modelList: any = [];
  typeList: any = [];

  headerObj = { tenantSelected: "", modelSelected: {}, typeSelected: {} };
  actionModal = false;
  selectedAction:string;
  enableFilter:boolean = false;
  showAction = false;
  isLoading = false;
  subs: Subscription[] =[];
  primaryButton = 'Create';
  addTitle = 'Create Record';
  prop = new NotificationProperties();

  constructor(private mainService: MainServiceService, private store: StoreService, private notification: NotificationService) { }

  ngOnInit(): void {
    
    const tenantSubs =this.mainService.fetchTenant().subscribe( data => {
      this.tenantList = data['tenant'];
      
      if(localStorage.getItem('activeTenant')){
        this.store.activeTenant = this.headerObj['tenantSelected'] = localStorage.getItem('activeTenant');
      } else {
        this.store.activeTenant = this.headerObj['tenantSelected'] = data['tenant'][0];
      }
      this.tenantChange();
    }, err => {
      this.prop.type = "error";
      this.prop.title = err;
      this.notification.show(this.prop);
    });
    this.subs.push(tenantSubs);
  }

  tenantChange() {
    this.store.activeTenant = this.headerObj['tenantSelected'];
    const modelSubs = this.mainService.fetchModel(this.headerObj['tenantSelected']).subscribe(data => {

      this.modelList = data['models'];
      this.store.setModelList(this.modelList);
      this.store.setActiveModel(data['models'][0]);
      this.modelChange();
      localStorage.setItem('activeTenant', this.headerObj['tenantSelected']);

      const permissionSubs = this.mainService.getPermissions(this.modelList).subscribe(data => {
        this.store.setPermission(data);
        console.log('tenant permission data--->', data);
      }, err => {
        this.prop.type = "error";
        this.prop.title = err;
        this.notification.show(this.prop);
      });
      this.subs.push(permissionSubs);
    }, err => {
      this.prop.type = "error";
      this.prop.title = err;
      this.notification.show(this.prop);
    });
    this.subs.push(modelSubs);
  }

  modelChange(){
    const typeListSubs = this.mainService.fetchComponent().subscribe( data => {
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
    this.subs.push(typeListSubs);
  }

  typeChange(){
    console.log('fetching grid....',this.headerObj['typeSelected']);
    if(this.headerObj['typeSelected']){
      this.store.setActiveType(this.headerObj['typeSelected']);
    }
    this.store.filters = [];
    
    const filterRecordSubs = this.mainService.getFilteredRecords(this.store.activeTenant,  this.store.activeModel['id'] ).subscribe(data => {
      this.store.onTypeAction(data);
      this.filtersApplied();
    }, err => {
      this.prop.type = "error";
      this.prop.title = err;
      this.notification.show(this.prop);
    });
    // this.store.setActiveModel(data[0]);
    this.subs.push(filterRecordSubs);
    
  }

  filtersApplied() {
    if (JSON.parse(window.sessionStorage.getItem(this.store.activeType['name']))) {
      this.store.filters = JSON.parse(window.sessionStorage.getItem(this.store.activeType['name']))
    } else {
      this.store.filters = []
    }
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

  userWritable() {
    if (this.store.activeCastConnector !== null) {
      return this.store.permission[this.store.activeTenant].dataCast;
    } else if (this.store.activeDataStream !== null) {
      return this.store.permission[this.store.activeTenant].dataStream;
    }
    return false;
  }

  isReadOnly(){
    return this.store.isReadOnly;
  }

  ngOnDestroy(){
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
  }

}
