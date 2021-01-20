import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  
  constructor(private http:HttpClient) { }

  getPermissions(data) {
    console.log('reached getPermissions');
    // return this.http.post('http://localhost:3000/permission', data)
    return this.http.get('http://localhost:3000/permission', data);
  }

  fetchTenant(){
    return this.http.get('http://localhost:3000/tenants');
    // return this.http.get('api/tenants');
  }

  fetchModel(tenant){
    // return this.http.get('http://localhost:3000/models?',tenant);
    return this.http.get(`api/models/${tenant}`);
  }
  
  fetchComponent(tenant, typeId){
    console.log('typeId--->',tenant.companyName, typeId);
    return this.http.get('http://localhost:3000/types', typeId);
    // return this.http.get(`api/types/${tenant.companyName}/${typeId}`);
  }

  getFilteredRecords(payload,filter){
    console.log('data, filter--->',payload, filter);
    if(filter ){
      return this.http.get('http://localhost:3000/typeList');
    } else {
      return this.http.get('http://localhost:3000/typeList');
    }
  }

  getRecords(payload){
    //'api/data/{tenant}/{model}/{type}{?fields, queryString, rels, limit, skip, sort, descending}'
    if(payload.type == 'client'){
      return {"count":2,"results":[{"name":"Axis 360","id":"1"},{"name":"Client B","id":"2"}]};
    }else{
      return {"count":15,"results":[{"name":"Distribution Order Proof of Delivery","id":"1"},{"name":"Advanced Shipment Notification","id":"2"},{"name":"Distribution Order Shipment","id":"3"},{"name":"Distribution Transfer Order Shipment","id":"4"},{"name":"Destruction Request","id":"5"},{"name":"Receipt Details","id":"6"},{"name":"Materials Consumed and Produced","id":"7"},{"name":"Distribution Transfer Order Proof of Delivery","id":"8"},{"name":"Inventory Adjustment","id":"9"},{"name":"Packaging Request","id":"10"},{"name":"Transfer Order Request","id":"15"},{"name":"Distribution Order Request","id":"16"},{"name":"Packaging Outbound","id":"19"},{"name":"Inventory Destruction","id":"21"},{"name":"Distribution/Transfer Order Request","id":"22"}]};
    }
  }

  uploadData(payload, data){
    return "ok";
  }

  // getFilteredRecords(pload,filters){
  //   // console.log('env---->', process.env.URL);
  //   return {"count":30,"results":[{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.047356","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.047356","user":"Feed","protocol":"XM22-08","create_dt":"2019-07-15T20:16:15.047356","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Transfer Order Proof of Delivery"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.047725","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.047724","user":"Feed","protocol":"A305","create_dt":"2019-07-15T20:16:15.047724","protocol_client":{"name":"Axis 360"},"protocol_message_type":{"name":"Inventory Adjustment"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.047839","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.047839","user":"Feed","protocol":"A3191084","create_dt":"2019-07-15T20:16:15.047839","protocol_client":{"name":"Axis 360"},"protocol_message_type":{"name":"Destruction Request"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.047943","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.047943","user":"Feed","protocol":"D5336C00007","create_dt":"2019-07-15T20:16:15.047943","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Order Proof of Delivery"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048078","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048078","user":"Feed","protocol":"D5336C00001","create_dt":"2019-07-15T20:16:15.048078","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Order Shipment"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048191","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048191","user":"Feed","protocol":"D5336C00001","create_dt":"2019-07-15T20:16:15.048191","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Transfer Order Proof of Delivery"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048255","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048255","user":"Feed","protocol":"D5336C00001","create_dt":"2019-07-15T20:16:15.048255","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Order Proof of Delivery"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048329","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048329","user":"Feed","protocol":"D5336C00007","create_dt":"2019-07-15T20:16:15.048329","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Transfer Order Request"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048378","include_or_exclude":"Include","notes":"IVR ordering","update_dt":"2019-07-15T20:16:15.048377","user":"Feed","protocol":"D0816C00018","create_dt":"2019-07-15T20:16:15.048377","protocol_client":{"name":"IRT"},"protocol_message_type":{"name":"Distribution/Transfer Order Request"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048423","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048422","user":"Feed","protocol":"D1680C00019","create_dt":"2019-07-15T20:16:15.048422","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Packaging Outbound"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048469","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048469","user":"Feed","protocol":"A305","create_dt":"2019-07-15T20:16:15.048468","protocol_client":{"name":"Axis 360"},"protocol_message_type":{"name":"Inventory Destruction"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048517","include_or_exclude":"Include","notes":"IVR ordering","update_dt":"2019-07-15T20:16:15.048517","user":"Feed","protocol":"FSS-AS-30003","create_dt":"2019-07-15T20:16:15.048516","protocol_client":{"name":"IRT"},"protocol_message_type":{"name":"Distribution/Transfer Order Request"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048568","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048567","user":"Feed","protocol":"D5336C00007","create_dt":"2019-07-15T20:16:15.048567","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Transfer Order Shipment"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048611","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048611","user":"Feed","protocol":"A3191084","create_dt":"2019-07-15T20:16:15.048611","protocol_client":{"name":"Axis 360"},"protocol_message_type":{"name":"Inventory Adjustment"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048673","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048673","user":"Feed","protocol":"D5336C00007","create_dt":"2019-07-15T20:16:15.048673","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Order Shipment"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048727","include_or_exclude":"Include","notes":"IVR ordering","update_dt":"2019-07-15T20:16:15.048727","user":"Feed","protocol":"D419CC00002","create_dt":"2019-07-15T20:16:15.048727","protocol_client":{"name":"IRT"},"protocol_message_type":{"name":"Distribution/Transfer Order Request"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048782","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048782","user":"Feed","protocol":"XM22-08","create_dt":"2019-07-15T20:16:15.048782","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Order Shipment"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048833","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048833","user":"Feed","protocol":"A3051073","create_dt":"2019-07-15T20:16:15.048832","protocol_client":{"name":"Axis 360"},"protocol_message_type":{"name":"Inventory Destruction"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048882","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048882","user":"Feed","protocol":"D5336C00007","create_dt":"2019-07-15T20:16:15.048882","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Transfer Order Proof of Delivery"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.048950","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.048950","user":"Feed","protocol":"A3051073","create_dt":"2019-07-15T20:16:15.048950","protocol_client":{"name":"Axis 360"},"protocol_message_type":{"name":"Inventory Adjustment"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.049009","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.049009","user":"Feed","protocol":"D5336C00001","create_dt":"2019-07-15T20:16:15.049009","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Transfer Order Shipment"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.049067","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.049067","user":"Feed","protocol":"XM22-08","create_dt":"2019-07-15T20:16:15.049067","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Transfer Order Shipment"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.049125","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.049125","user":"Feed","protocol":"A305","create_dt":"2019-07-15T20:16:15.049125","protocol_client":{"name":"Axis 360"},"protocol_message_type":{"name":"Destruction Request"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.049181","include_or_exclude":"Include","notes":"IVR ordering","update_dt":"2019-07-15T20:16:15.049181","user":"Feed","protocol":"DEN-304","create_dt":"2019-07-15T20:16:15.049181","protocol_client":{"name":"IRT"},"protocol_message_type":{"name":"Distribution/Transfer Order Request"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.049253","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.049253","user":"Feed","protocol":"D5336C00007","create_dt":"2019-07-15T20:16:15.049253","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Order Request"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.049318","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.049318","user":"Feed","protocol":"XM22-08","create_dt":"2019-07-15T20:16:15.049318","protocol_client":{"name":"Client B"},"protocol_message_type":{"name":"Distribution Order Proof of Delivery"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.049379","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.049379","user":"Feed","protocol":"A3051073","create_dt":"2019-07-15T20:16:15.049379","protocol_client":{"name":"Axis 360"},"protocol_message_type":{"name":"Destruction Request"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.049441","include_or_exclude":"Include","notes":"IVR ordering","update_dt":"2019-07-15T20:16:15.049441","user":"Feed","protocol":"TV5600-CNS-20007","create_dt":"2019-07-15T20:16:15.049441","protocol_client":{"name":"IRT"},"protocol_message_type":{"name":"Distribution/Transfer Order Request"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.049502","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.049502","user":"Feed","protocol":"A3051073","create_dt":"2019-07-15T20:16:15.049502","protocol_client":{"name":"Axis 360"},"protocol_message_type":{"name":"Packaging Request"}},{"src_dat_feed":"Feed","process_dt":"2019-07-15T20:16:15.049552","include_or_exclude":"Exclude","notes":"","update_dt":"2019-07-15T20:16:15.049552","user":"Feed","protocol":"A3191084","create_dt":"2019-07-15T20:16:15.049552","protocol_client":{"name":"Axis 360"},"protocol_message_type":{"name":"Inventory Destruction"}}]};
  // }
  saveRecord(payload){
    console.log('env---->', payload);
    // return this.http.post('/data', payload);
    return { "ok": "200" , "data" : [{}]}
  }

  refreshModel(){
    // method: 'GET',
    // url: 'api/refresh/{tenant}/{model}'
    return {status: 200, data: [{}]};
  }

  getFeatures(payload){
    return this.http.post('api/features', payload);
  }
  
}
