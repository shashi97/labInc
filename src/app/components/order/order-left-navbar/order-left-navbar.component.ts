import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';
import { OrderService } from '../shared';

@Component({
  selector: 'order-left-navbar',
  templateUrl: './Order-left-navbar.component.html',
  styleUrls: ['./Order-left-navbar.component.css']
})
export class OrderLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  folderName: string = '';
  id: number = 0;
  order: any;
  orderNo: string = '';
  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService,
    private orderService: OrderService) {

    this.folderName = 'order';
    this.localStorageService.setTopMenu(this.folderName);

    this.id = this.route.snapshot.params['id'] || 0;
    this.orderNo = this.route.snapshot.params['orderNumber'] || 0;
    // if (this.id) {
    //   this.orderService.getOrderViwDetail(this.id).then((result) => {
    //     this.order = result.data;
    //     if (this.order.OrderNo) {
    //       this.orderNo = this.order.OrderNo;
    //     }
    //   });
    // }
  }

  ngOnInit() {

    this.leftMenuItems = [
      {
        title: 'Order View', sref: 'order/' + this.id + '/'
          + this.orderNo + '/view', icon: 'users.svg', isActive: false, orderNo: ''
      },
      {
        title: 'Order Log', sref: 'order/orderlog' + '/'
        + this.orderNo + '/' + this.id, icon: 'users.svg', isActive: false, orderNo: this.orderNo
      },
      //   { title: 'Add Order', sref: 'order/add', icon: 'user-info.svg', isActive: false }
    ];
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);

  }

  openComponent(item) {
    // if (this.orderNo !== '') {
    this.routeService.openRoute(item.sref);
    //  }
  }
}
