import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-add-order',
  templateUrl: './page-add-order.component.html',
  styleUrls: ['./page-add-order.component.scss']
})
export class PageAddOrderComponent implements OnInit {

  @ViewChild('confirmAddModal') private confirmAddModal: TemplateRef<any>;
  private currentActiveModal: NgbModalRef;
  public modalValues: Order;

  constructor(private orderService:OrdersService,
      private router:Router,
      private currentRoute:ActivatedRoute,
      private modalService: NgbModal,
  ) { }
  public addOrder(item:Order) {
    this.orderService.addItem(item).subscribe(
      (result)=> {
        this.dismissModal();
        this.router.navigate(['../',{relativeTo:this.currentRoute}]);
      }
    )
  }
  ngOnInit(): void {
  }

  public openAddModal(values: any) {
    this.modalValues = values;
    this.currentActiveModal = this.modalService.open(this.confirmAddModal);
  }

  public dismissModal() {
    this.currentActiveModal.dismiss();
  }
}
