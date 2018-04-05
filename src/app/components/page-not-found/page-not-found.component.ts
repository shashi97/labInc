import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService, PaginationService } from './../../shared';
import { Message } from 'primeng/primeng';
import { PaginationEnum, UserTypeEnum } from '../shared/enums';
import { BreadcrumbsService } from '../../core/shared/services';
import { LocalStorageService } from '../../core/shared/services/index';

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html'
})

export class PageNotFoundComponent implements OnInit {

  constructor(
    public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'Page Not Found';
  }

  goToPage() {
    let user = this.localStorageService.getUserDetail();
    if (user.UserTypeId === UserTypeEnum.Lab) {
      this.routeService.openRoute('order/lab');
    } else {
      this.routeService.openRoute('order');
    }
  }

}
