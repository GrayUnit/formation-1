import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order } from 'src/app/core/models/order';
import { StateOrder } from '../../enums/state-order.enum';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-order',
  templateUrl: './page-list-order.component.html',
  styleUrls: ['./page-list-order.component.scss']
})
export class PageListOrderComponent implements OnInit {
  //public orderList: Order[];
  public collectionOrders$: Observable<Order[]>;
  public tableHeaders:string[];
  public states=Object.values(StateOrder);
  private destroy$:Subject<Boolean>=new Subject();
  constructor(
    private orderService:OrdersService,
    private renderer: Renderer2
  ) { }


  public changeState(item:Order,event):void {
    this.orderService.changeState(item,event.target.value).pipe(takeUntil(this.destroy$)).subscribe(result=>{
       item.state=result.state;
    },err=>{
        event.target.value=item.state;
    });
  }
  public testButton() {

    alert("Click sur le bouton");

  }
  ngOnInit(): void {

    this.tableHeaders= [
      "Type","Client","Nb. Jours","Tjm HT","Total HT","Total TTC","State","Actions"
    ];
    this.orderService.refresh$.next(true);
    /*this.orderService.collection.subscribe(
        (datas) => {
          console.log(datas);
          if (this.tableHeaders == null) this.tableHeaders=Object.getOwnPropertyNames(datas[0]);
          this.orderList=datas;

        },(err) =>{
          console.log("Erreur orders");
          console.log(err);
        }

    );*/
    this.collectionOrders$=this.orderService.collection;
  }

  public deleteOrder(item:Order) {
    this.orderService.deleteItem(item).subscribe(
        (result)=> {
            this.orderService.refresh$.next(true);
        }
    );
  }

  @ViewChild('abcd', {static: true}) private abcd: ElementRef;
  public onClick() {
    const li = this.renderer.createElement('li');
    const text = this.renderer.createText('Cliquer pour ajouter');
    this.renderer.appendChild(li, text);
    this.renderer.appendChild(this.abcd.nativeElement, li);
  }
}
