import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientService} from '../../../modules/client/shared/services/client.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
})
export class ModalWindowComponent implements OnInit {
  @Input() isAddModal: boolean;
  @Input() isAccountModal: boolean;
  @Input() selectedClient;
  @Input() edited: boolean;
  @Output() isModalAction = new EventEmitter();
  @Output() isDeleteConfed = new EventEmitter();
  @Input() deleteConf: boolean;
  isConfirmDelete = false;

  constructor() {

  }

  ngOnInit() {

  }
  toggleModalAdd($event) {
    this.isAddModal = $event;
    this.isModalAction.emit($event);
  }
  toggleModalAccount($event) {
    this.isAccountModal = $event;
    this.isModalAction.emit($event);
  }

  closeConfirmDelete() {
    this.isDeleteConfed.emit(false);
  }

  confDelete() {
    this.isDeleteConfed.emit('confirmed');

    setTimeout( () => {
      this.isDeleteConfed.emit(false);
     }, 100)
  }
}
