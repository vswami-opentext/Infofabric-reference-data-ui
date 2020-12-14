import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MainServiceService } from './.../../../../services/main-service.service';
import { StoreService } from './.../../../../services/store.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  primaryButtonName:string ='Import';
  addModalTitle:string ='Import';
  errorMessage:string;
  typeErrorMessage:string;
  customImportType:string;
  importErrorData:any;
  importData ={};
  importResponseReceived:any;

  @Input() showAction:boolean = true;

  @Output()
  cancelEmit = new EventEmitter();

  constructor(private store:StoreService, private mainService: MainServiceService) { }

  ngOnInit(): void {
  }

  onUploadChange(event){
    let f =event.srcElement.files[0];
        let { name } = f;
        console.log(name.endsWith('.csv'));
        if (name.endsWith('.csv')) {
          console.log('validation passed');
        } else {
          console.log('-erorororr',event);
          this.errorMessage = 'Wrong File format, Please try uploading a .csv file';
        }

        console.log('cutom Type', this.importData['name']);
      this.customImportType = this.importData['name'];
      
      const reader = new FileReader();
      reader.onload = this.importRecords(event, this.importData['name']);
      // Read in the image file as a data URL.
      reader.readAsText(f);
  }

  importRecords(event, customType) {
    // this.isUploading = true;
    // this.$nextTick(async () => {
      const fileData = event.target.result;
      const payload = {
        tenant: this.store.activeTenant,
        model: this.store.activeModel['name'],
        type: this.customImportType === '' ? this.store.activeType['name'] : this.customImportType
      };
      try {
        console.log('constructed ingress payload', payload);
        let data = { data: fileData };
        console.log('data => ');
        console.log(data);
        // const resp = await mainSerive.uploadData(payload, data);
        const resp = this.mainService.uploadData(payload, data);
        if (resp['ok']) {
          this.importResponseReceived = true;
        }
        console.log('RESP', resp);
        if (!resp['data'] || resp['data'] === '') {
          this.importErrorData.status = 'error';
          this.importErrorData.message = 'Internal Error has occured, upload failed. Please verify the CSV';
        } else if (resp['data'].status === 'SUCCESS') {
          console.log('Success response');
          this.importErrorData.message = `The new Component ${this.customImportType} has been created.`;
          // const refResp = await this.refreshModel();
          const refResp = this.mainService.refreshModel();
          console.log('response received for refresh', refResp);
          if (refResp.status !== 200) {
            this.importErrorData.message = `${this.importErrorData.message}, but the model needs to be refreshed in the Query service`;
          }
          this.importErrorData.status = 'success';
        } else {
          this.importErrorData = resp['data'];
        }
        // this.isUploading = false;
        // this.closeModal('importModal');
      } catch (error) {
        console.error(error);
      }
    // });
  }

  onCancel(){
    this.showAction = false;
    this.cancelEmit.emit();
  }

}
