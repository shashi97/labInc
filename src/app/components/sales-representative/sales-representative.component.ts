import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesRepresentativeModel, SalesRepresentativeService } from './shared';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../shared';
import { PaginationEnum } from '../shared/enums';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sales-representative',
  templateUrl: './sales-Representative.component.html',
})

export class SalesRepresentativeComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public salesRepresentatives: Array<SalesRepresentativeModel> = [];
  public salesRepresentative: SalesRepresentativeModel = new SalesRepresentativeModel();
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public salesOfficeId: number;
  constructor(private salesRepresentativeService: SalesRepresentativeService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public route: ActivatedRoute,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
    this.getSalesRepresentatives();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All Sales Representatives';
    this.salesOfficeId = this.route.snapshot.params['salesOfficeId'] || 0;
    if (this.salesOfficeId > 0) {
      this.breadcrumbsService.breadcrumbs = 'List of Sales Representatives';
      this.getSalesRepresentatives();
    }
  }

  getSalesRepresentatives() {
    this.salesRepresentativeService.getSalesRepresentatives(this.paginationService.getParams(), this.salesOfficeId).then(result => {
      this.salesRepresentatives = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
    })
  }

  addSalesRepresentative() {
    this.routeService.openRoute('salesRepresentative/add');
  }

  editSalesRepresentative(salesRepresentativeId) {
    this.routeService.openRoute('salesRepresentative/' + salesRepresentativeId + '/edit');
  }

  deleteSalesRepresentativeById(salesRepresentative) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + salesRepresentative.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.salesRepresentativeService.deleteSalesRepresentativeById(salesRepresentative.Id).then(result => {
          this.getSalesRepresentatives();
        })
      },
      reject: () => {
      }
    });

  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getSalesRepresentatives();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getSalesRepresentatives();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getSalesRepresentatives();
  }
}
