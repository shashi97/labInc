import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService, PaginationService } from './../../../shared';
import { BillingCodeModel, TestingMenuService } from '../shared';
import { CustomDDO } from './../../shared/models/custom-ddo.model';
import { Message } from 'primeng/primeng';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../../core/paginator/paginator';
import { PaginationEnum } from '../../shared/enums';

@Component({
  selector: 'billing-code-mapping',
  templateUrl: './billing-code-mapping.component.html',
  styleUrls: ['./billing-code-mapping.component.css']
})

export class TestBillingCodeComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public errorMsg: Message[] = [];
  public biilingCode: Array<BillingCodeModel> = new Array<BillingCodeModel>();

  constructor(
    public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public testingMenuService: TestingMenuService
    ) {
    this.paginationService.setDefaultPage();
  }
  ngOnInit() {
    this.getBilingCode();
    this.breadcrumbsService.breadcrumbs = 'List of All Billing Code';
  }
  private getBilingCode() {
    this.testingMenuService.getBillingCode(this.paginationService.getParams()).then((result) => {
      this.biilingCode = result.data.Data; // temp data from Molecular API
      this.totalRecords = result.data.TotalRecords;
    });
  }
  deleteBillingCodeById(billingCode) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + billingCode.TestName + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.testingMenuService.deleteBillingCodeById(billingCode.Id).then(result => {
          this.getBilingCode();
        })
      },
      reject: () => {
      }
    });

  }
  public addBillingCode(): void {
    this.routeService.openRoute('testingMenu/testCodeMapping/add');
  }
  public editBillingCode(id): void {
    this.routeService.openRoute('testingMenu/testCodeMapping/' + id + '/edit');
  }
   /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getBilingCode();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getBilingCode();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getBilingCode();
  }

}
