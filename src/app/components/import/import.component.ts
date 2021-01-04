import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { MainServiceService } from './.../../../../services/main-service.service';
import { StoreService } from './.../../../../services/store.service';
import { NotificationProperties, NotificationService } from 'tgocp-ng/dist';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportComponent implements OnInit {

  primaryButtonName:string ='Import';
  addModalTitle:string ='Import';
  errorMessage:string;
  typeErrorMessage:string;
  customImportType:string;
  importErrorData:any;
  importData ={name:''};
  importResponseReceived:any;
  prop = new NotificationProperties();
  changeDetection: ChangeDetectionStrategy.OnPush

  @Input() showAction:boolean = true;
  @Output() cancelEmit = new EventEmitter();

  constructor(private store:StoreService, private mainService: MainServiceService, private notification: NotificationService) { }

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
          // this.errorMessage = 'Wrong File format, Please try uploading a .csv file';
          this.prop.type ='error';
          this.prop.title ='Wrong File format, Please try uploading a .csv file';
          this.notification.show(this.prop);
        }

        console.log('cutom Type', this.importData['name']);
      this.customImportType = this.importData['name'];
      
      const reader = new FileReader();
      // to be added this below method uncomment
      this.importRecords(event, this.importData['name']);
      reader.onloadend = function(e){
        // you can perform an action with readed data here
        console.log('-plain text-->',reader.result);
      }
      console.log('reader.readAsText(f)-plain text-->', reader.readAsText(f));
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
          // this.importErrorData.status = 'error';
          // this.importErrorData.message = 'Internal Error has occured, upload failed. Please verify the CSV';
          this.prop.type ='error';
          this.prop.title ='Internal Error has occured, upload failed. Please verify the CSV';
          this.notification.show(this.prop);
        } else if (resp['data'].status === 'SUCCESS') {
          console.log('Success response');
          this.importErrorData.message = `The new Component ${this.customImportType} has been created.`;
          this.prop.type ='success';
          this.prop.title =`The new Component ${this.customImportType} has been created.`;
          
          // const refResp = await this.refreshModel();
          const refResp = this.mainService.refreshModel();
          console.log('response received for refresh', refResp);
          if (refResp.status !== 200) {
            this.prop.title = `${this.prop.title}, but the model needs to be refreshed in the Query service`;
          }
          this.importErrorData.status = 'success';
          this.notification.show(this.prop);
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
