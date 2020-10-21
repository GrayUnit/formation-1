import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer-m',
  templateUrl: './footer-m.component.html',
  styleUrls: ['./footer-m.component.scss']
})
export class FooterMComponent implements OnInit {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
