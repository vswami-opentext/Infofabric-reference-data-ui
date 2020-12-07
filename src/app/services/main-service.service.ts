import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  tenantList: any = [
    {
      name:'Thermofisher',
      id:'001'
    },
    {
      name:'Merz',
      id:'002'
    }
  ]

  modelList: any = [
    {
      name:'thermo_ref_ui',
      id:'001'
    },
    {
      name:'Thermo_ref_ui',
      id:'002'
    }
  ]

  typeList: any = [
    {
      name:'country',
      id:'001'
    },
    {
      name:'capital',
      id:'002'
    }
  ]
  
  constructor() { }

  fetchTenant(){
    return this.tenantList;
  }

  fetchModel(){
    return this.modelList;
  }
  
  fetchComponent(){
    return this.typeList;
  }
  
}
