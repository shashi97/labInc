import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService, PaginationService } from '../../shared';
import { PaginationEnum } from '../shared/enums';
import { DashboardModel } from './shared/dashboard.model';
import { DatePipe } from '@angular/common';
import { OrderService } from '../order';
import { LocalStorageService } from '../../core/shared/services/index';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  private dashboard: DashboardModel = new DashboardModel();
  private toDate: string = '';
  private fromDate: string = '';
  private datePipe = new DatePipe('en-US');
  public range: Array<any> = [
    { id: 1, name: 'This Week', value: 'week', isActive: false },
    { id: 2, name: 'This Month', value: 'month', isActive: false },
    { id: 3, name: 'This Year', value: 'year', isActive: false },
    { id: 4, name: 'Custom Range', value: 'custom', isActive: false },
  ];
  private rangeDetail: any;
  public currentYear:number;
  constructor(public breadcrumbsService: BreadcrumbsService,
    public orderService: OrderService,
    public routeService: RouteService,
    private router: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.changeTopMenu(this.range[0], 0);
    var year = new Date();
    this.currentYear = year.getFullYear() + 10;
  }

  changeTopMenu(rangeType, index) {
    let date = new Date();
    rangeType.isActive = true;
    this.range.map((item, index1) => {
      if (index !== index1) {
        item.isActive = false;
      }
    })
    this.rangeDetail = rangeType;

    if (rangeType.id === 1) {
      let today = new Date()
      let day = today.getDay() || 7; // Get current day number, converting Sun. to 7
      if (day !== 1) {                // Only manipulate the date if it isn't Mon.
        today.setHours(-24 * (day - 1));   // Set the hours to day number minus 1
      }                               //   multiplied by negative 24                         //   multiplied by negative 24
      this.toDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
      this.fromDate = this.datePipe.transform(today, 'MM/dd/yyyy');
    }

    if (rangeType.id === 2) {
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      this.toDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
      this.fromDate = this.datePipe.transform(firstDay, 'MM/dd/yyyy');
    }

    if (rangeType.id === 3) {
      let firstDay = new Date(new Date().getFullYear(), 0, 1);
      this.toDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
      this.fromDate = this.datePipe.transform(firstDay, 'MM/dd/yyyy');
    }

    let obj = {
      FromDate: this.fromDate,
      ToDate: this.toDate
    }

    if (rangeType.id !== 4) {
      this.orderService.getLabdashboard(obj).then(result => {
        this.dashboard = result.data;
      });
    }
  }

  getCustomDate() {
    this.toDate = this.datePipe.transform(this.toDate, 'MM/dd/yyyy');
    this.fromDate = this.datePipe.transform(this.fromDate, 'MM/dd/yyyy');

    let obj = {
      FromDate: this.fromDate,
      ToDate: this.toDate
    }

    this.orderService.getLabdashboard(obj).then(result => {
      this.dashboard = result.data;
    });
  }

  private routePage(selectedItem) {
    this.router.navigate(['/' + this.localStorageService.getModuleName() + '/order'],
      {
        queryParams: {
          NetworkType: selectedItem, DateTypeSelect: 4,
          FromDate: this.fromDate, ToDate: this.toDate
        }
      });
  }

}
