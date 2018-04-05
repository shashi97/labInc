import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BreadcrumbsService } from '../../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../../shared';
import { PaginationEnum } from '../../shared/enums';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})

export class DashboardMainComponent implements OnInit {

@Input() dashboard: any;
  constructor(public breadcrumbsService: BreadcrumbsService) { }

  ngOnInit() {

  }

}
