import { Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() title: string = "Title Modal";
  @Input() modalIsOpen: boolean = false;
  @Output() dismissed: EventEmitter<any> = new EventEmitter();
  @Output() getModal: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalRef') private modalRef: TemplateRef<any>;
  private currentActiveModal: NgbModalRef;
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.modalIsOpen == true) {
      this.currentActiveModal = this.modalService.open(this.modalRef);
      this.getModal.emit(this.currentActiveModal);
    } else {
      if(this.currentActiveModal) {
        this.currentActiveModal.dismiss();
      }
    }
  }

  public dismissModal() {
    this.dismissed.emit();
  }

}
