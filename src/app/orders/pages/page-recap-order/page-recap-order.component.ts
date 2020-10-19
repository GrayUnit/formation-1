import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { Order } from 'src/app/core/models/order';
import { StateOrder } from '../../enums/state-order.enum';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-recap-order',
  templateUrl: './page-recap-order.component.html',
  styleUrls: ['./page-recap-order.component.scss']
})
export class PageRecapOrderComponent implements OnInit {

  public collectionOrders$: Observable<Order[]>;
  public colCollectionOrders$: Observable<[Order[], Order[]]>
  public tableHeaders:string[];
  public states=Object.values(StateOrder);
  private destroy$:Subject<Boolean>=new Subject();

  constructor(
    private orderService: OrdersService,
    private currentRoute: ActivatedRoute,
    private clientService: ClientsService
  ) { }

  ngOnInit(): void {
    this.tableHeaders= [
      "Type","Client","Nb. Jours","Tjm HT","Total HT","Total TTC","State","Actions"
    ];
    let id: number;
    // this.currentRoute.paramMap.subscribe(
    //   (param: ParamMap) => {
    //     id = parseInt(param.get("id"));
    //   }
    // )
    // let client: Client;
    // this.clientService.getItemById(id).subscribe(
    //   (client) => {
    //     client = client
    //   }
    // )
    this.collectionOrders$ = this.currentRoute.paramMap.pipe(
      switchMap((param: ParamMap) => {
        return this.clientService.getItemById(param.get("id")).pipe(
          switchMap((client) => {
            return this.orderService.getAllItemByClientName(client.name)
          })
        )
      })
    )



    // Utilisation du mergeMap dans le cas où l'on ne veut unsubscribe
    // sur les observables "intermédiaires" (par exemple avec une websocket)

    // this.collectionOrders$ = this.currentRoute.paramMap.pipe(
    //   mergeMap((param: ParamMap) => {
    //     return this.clientService.getItemById(param.get("id")).pipe(
    //       mergeMap((client) => {
    //         return this.orderService.getItemByClientName(client.name)
    //       })
    //     )
    //   })
    // )
  }

  public changeState(item:Order,event):void {
    this.orderService.changeState(item,event.target.value).pipe(takeUntil(this.destroy$)).subscribe(result=>{
       item.state = result.state;
    },err=>{
        event.target.value=item.state;
    });
  }

}
