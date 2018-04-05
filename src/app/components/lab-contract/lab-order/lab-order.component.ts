import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { BreadcrumbsService } from '../../../core/shared/services';
import { ApiUrl } from '../../../shared/api.service';
import { Http, ResponseContentType } from '@angular/http';
import * as FileSaver from 'file-saver';
import { OrderModel, OrderFilter, OrderDTOModel } from '../../order/shared/order.model'
import { DatePipe } from '@angular/common';
import { OrderService } from '../../order/shared/order.service';
import { LocalStorageService } from '../../../core/shared/services/index';
import { RouteService, PaginationService } from '../../../shared';
import { LabService, LabModel } from '../../lab';

@Component({
  selector: 'lab-order',
  templateUrl: './lab-order.component.html',
  // styleUrls: ['./lab-order.component.css']
  providers: [OrderService]

})

export class LabOrderComponent implements OnInit {
  orderFilter: OrderFilter = new OrderFilter();
  private datePipe = new DatePipe('en-US');
  public Orders: Array<OrderDTOModel> = [];
  labContractId
  contractLabId
  public totalRecords:number =0;
  public currentYear:number;
  constructor(private orderService: OrderService, private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private breadcrumbsService: BreadcrumbsService, private routeService: RouteService,
    private labService: LabService) {

  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = this.breadcrumbsService.breadcrumbs;
    this.labContractId = this.route.snapshot.params['labContractId'] || 0;
    this.contractLabId = this.route.snapshot.params['contractLabId'] || 0;
    this.orderFilter.NetworkType = -1;
    this.getLabDetail()
    var year = new Date();
    this.currentYear= year.getFullYear() + 10;
  }

  getLabDetail() {
    this.labService.getLogo(this.contractLabId).then(result => {
      this.breadcrumbsService.breadcrumbs = 'Lab Contract / ' + result.data.Name + ' -' + result.data.City;
    });
  }


  public selectSearchDate() {
    let date = new Date();
    if (this.orderFilter.DateTypeSelect == 1) {
      this.orderFilter.ToDate = this.datePipe.transform(date, 'MM/dd/yyyy');
      this.orderFilter.FromDate = this.orderFilter.ToDate;
    }
    if (this.orderFilter.DateTypeSelect == 2) {
      this.orderFilter.ToDate = this.datePipe.transform(date, 'MM/dd/yyyy');
      let yesterdayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
      this.orderFilter.FromDate = this.datePipe.transform(yesterdayDate, 'MM/dd/yyyy');
    }
    if (this.orderFilter.DateTypeSelect == 3) {
      let today = date
      let day = today.getDay() || 7; // Get current day number, converting Sun. to 7
      if (day !== 1) {                // Only manipulate the date if it isn't Mon.
        today.setHours(-24 * (day - 1));   // Set the hours to day number minus 1
      }                               //   multiplied by negative 24
      this.orderFilter.ToDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
      // let lastWeekDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
      this.orderFilter.FromDate = this.datePipe.transform(today, 'MM/dd/yyyy');
    }
    if (this.orderFilter.DateTypeSelect == 4) {
      this.orderFilter.ToDate = '';
      this.orderFilter.FromDate = '';
    }
  }


  public searchOrderByFilterObject() {
    let user = this.localStorageService.getUserDetail();
    if (this.orderFilter.DateTypeSelect == 4) {
      this.orderFilter.ToDate = this.datePipe.transform(this.orderFilter.ToDate, 'MM/dd/yyyy');
      this.orderFilter.FromDate = this.datePipe.transform(this.orderFilter.FromDate, 'MM/dd/yyyy');
    }
    this.orderFilter.BillingLabId = this.contractLabId;
    this.orderFilter.ProcessingLabId = user.LabId;
    if (this.orderFilter.NetworkType == -2) {
      this.orderFilter.BillingLabId = user.LabId;
      this.orderFilter.ProcessingLabId = this.contractLabId;
    }
    this.orderService.getOrderBySearchFilter(this.orderFilter).then(res => {
      this.Orders = res.data;
      this.totalRecords = res.data.length;
    })
  }
  private viewOrder(id: number) {
    this.routeService.openRoute('labContract/' + this.labContractId + '/laborder/' + this.contractLabId + '/order/' + id + '/view');
  }
  public pdfView(orderId): void {
    this.orderService.getPdfLink(orderId).then(res => {
      let link = res.data;
      window.open(link);
    });
  }
}
