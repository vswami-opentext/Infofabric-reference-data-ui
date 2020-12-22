import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  @Input()
  showAction:any;

  @Input()
  title:any;

  @Input()
  primaryButton:any;

  @Input()
  size:any;

  @Input()
  disabledPrimary:any;

  @Output()
  cancelEvent = new EventEmitter();

  @Output()
  onAction = new EventEmitter();
  

  constructor() { }

  ngOnInit(): void {
  }

  onCancelClick(){
    console.log('Cancelling.....');
    this.cancelEvent.emit();
  }

  onSaveClick(){
    console.log('Saving.....');
    this.onAction.emit()
  }

}
