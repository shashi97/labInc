import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from './../../shared';
import { Paginator } from '../../core/paginator/paginator';
import { BillingCodeModel, BillingCodeService } from './shared/index';
import { Message } from 'primeng/primeng';
import { PaginationEnum } from '../shared/enums';

@Component({
  selector: 'billing-code',
  templateUrl: './billing-code.component.html',
  styleUrls: ['./billing-code.component.css']
})

export class BillingCodeComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public errorMsg: Message[] = [];
  public biilingCode: Array<BillingCodeModel> = new Array<BillingCodeModel>();
  public component: string = '';
  public btnName: string = 'Add Individual Test';
  public recordName:string = 'Tests';
  public testMenuType: number = 1;

  constructor(
    public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public biilingCodeService: BillingCodeService) {
    this.paginationService.setDefaultPage();
  }


  ngOnInit() {
    this.component = this.route.snapshot.url[0].path;
    if (this.component === 'group') {
      this.testMenuType = 2;
      this.btnName = 'Add Group Test';
      this.recordName = 'Group Tests';
    } else if (this.component === 'testingmenu') {
      this.testMenuType = 0;
    }
    this.getBiilingCode();
    this.breadcrumbsService.breadcrumbs = 'List of All Testing Menu';
  }


  private getBiilingCode() {
    this.biilingCodeService.getBillingCode(this.paginationService.getParams(), this.testMenuType).then((result) => {
      this.biilingCode = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
    });
  }


  deleteBillingCodeById(billingCode) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + billingCode.TestName + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.biilingCodeService.deleteBillingCodeById(billingCode.Id).then(result => {
          this.getBiilingCode();
        })
      },
      reject: () => {
      }
    });

  }


  public addBillingCode(): void {
    if (this.testMenuType === 1) {
      this.routeService.openRoute('labtest/individual/add');
    } else {
      this.routeService.openRoute('labtest/group/add');
    }

  }


  public editBillingCode(id): void {
    if (this.testMenuType === 1) {
      this.routeService.openRoute('labtest/individual/' + id + '/edit');
    } else {
      this.routeService.openRoute('labtest/group/' + id + '/edit');
    }
  }


  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getBiilingCode();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getBiilingCode();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getBiilingCode();
  }

}
