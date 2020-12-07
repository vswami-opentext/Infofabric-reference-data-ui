import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  primaryButtonName:string ='Export';
  addModalTitle:string ='Export';

  @Input()
  showAction:boolean = true;

  @Output()
  cancelEmit = new EventEmitter();

  formatList:any = [{name: 'xlsx'}]

  constructor() { }

  ngOnInit(): void {
  }

  onCancel(){
    this.showAction = false;
    this.cancelEmit.emit();
  }

}
