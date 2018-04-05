import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { OrderService } from '../shared';
import { OrderModel, OrderTest, ProcessingLabDetail, NeoOrder } from '../shared/order.model';
import { Message } from 'primeng/primeng';
import { LocalStorageService } from '../../../core/shared/services/index';
import { LabService } from '../../lab/shared/lab.service';
@Component({
  selector: 'app-order-log',
  templateUrl: './order-log.component.html',
  styleUrls: ['./order-log.component.css']
})
export class OrderLogComponent implements OnInit {
  orderLog: NeoOrder = new NeoOrder();
  orderNumber: string;
  constructor(public breadcrumbsService: BreadcrumbsService,
    private orderService: OrderService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private labService: LabService) { }
  ngOnInit() {
    this.getDefaultParams();
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Order / Order-log';
    this.orderNumber = this.route.snapshot.params['orderNumber'];
    this.getOrderLog();
  }

  public getOrderLog() {
    this.orderService.getOrderLogs(this.orderNumber).then(res => {
      let orderLog = res.data;
      this.orderLog.OrderLogs = orderLog.OrderLogs.map((val) => {
        val.Text = val.Text.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        return val;
      })
    })
  }
  public cancel(): void {

    this.routeService.openRoute('order');

  }


}
