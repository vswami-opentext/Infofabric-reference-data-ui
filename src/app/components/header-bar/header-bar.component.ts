import { Component, OnInit } from '@angular/core';
import { MainServiceService } from './../../services/main-service.service';

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

  constructor(private mainService: MainServiceService) { }

  ngOnInit(): void {
    this.tenantList = this.mainService.fetchTenant();
  }

  tenantChange(){
    this.modelList = this.mainService.fetchModel();
  }
  modelChange(){
    this.typeList = this.mainService.fetchComponent();
  }
  typeChange(){
    console.log('fetching grid....');
    
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
