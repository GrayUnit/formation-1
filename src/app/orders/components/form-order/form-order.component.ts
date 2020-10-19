import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/core/models/order';
import { DependencyValidator } from 'src/app/shared/validators/dependency-validator';
import { StateOrder } from '../../enums/state-order.enum';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss']
})
export class FormOrderComponent implements OnInit {
  public form:FormGroup;
  @Input() public order: Order=new Order();
  @Output() submitted:EventEmitter<Order>=new EventEmitter();
  public states=Object.values(StateOrder);
  constructor(private formB: FormBuilder) { }
  onSubmit():void {
    console.log("Submitation !!!!!");
    this.submitted.emit(this.form.value);
  }
  ngOnInit(): void {
    let o=this.order;
    this.form= this.formB.group({
      tjmHt: [o.tjmHt,Validators.pattern("[^A-Za-z]*")],
      nbJours: [o.nbJours],
      tva:[o.tva],
      state:[o.state],
      typePresta:[o.typePresta],
      client:[o.client, Validators.compose([Validators.required, Validators.minLength(3)])],
      comment:[o.comment],
      id:[o.id]
    },{validators:Validators.compose([DependencyValidator("client",["tjmHt","nbJours"])])});
  }

}
