import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

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

  @Input() showAction:boolean = true;

  @Output()
  cancelEmit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onCancel(){
    this.showAction = false;
    this.cancelEmit.emit();
  }

}
