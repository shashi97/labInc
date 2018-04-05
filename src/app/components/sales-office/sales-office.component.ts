import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesOfficeModel, SalesOfficeService, SalesOfficeLab } from './shared';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../shared';
import { LocalStorageService } from '../../core/shared/services/index';
import { PaginationEnum, UserTypeEnum, ImportFileEnum } from '../shared/enums';
import { SalesOfficeLeftNavbarComponent } from './sales-office-left-navbar/sales-office-left-navbar.component'

@Component({
  selector: 'app-sales-office',
  templateUrl: './sales-office.component.html',
})

export class SalesOfficeComponent implements OnInit {
  public importTitleName: string = 'Sales Offices';
  public importTableHeader = [{ "header": "Name" }, { "header": "Email" }, { "header": "Password" }, { "header": "Address" },
  { "header": "City" }, { "header": "State" }, { "header": "Zip" }, { "header": "Fax" },
  { "header": "Phone No" }];
  public importTableRow = [{
    col1: "A", col2: "B", col3: "C", col4: "D", col5: "E", col6: "F", col7: "G", col8: "H",
    col9: "I"
  }];
  public importFileType: number = ImportFileEnum.SalesOffice;

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  @ViewChild(SalesOfficeLeftNavbarComponent) salesOfficeLeftNavbarComponent: SalesOfficeLeftNavbarComponent;
  public salesOffices: Array<SalesOfficeModel> = [];
  public pageSize: number = PaginationEnum.PageSize;
  errorMessage: any;
  public totalRecords: number = 0;
  public userType: string;
  public LoggedTypeId: number;
  public showModal: boolean = false;
  public searchText: string = '';
  public errorMsg: any;
  public saleOffice: Array<SalesOfficeModel> = [];
  public selectedSaleOffice: Array<SalesOfficeLab> = [];
  constructor(private salesOfficeService: SalesOfficeService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService,
    private localStorageService: LocalStorageService) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    let user = this.localStorageService.getUserDetail();
    if (user.UserTypeId === UserTypeEnum.Lab) {
      this.LoggedTypeId = user.LinkedTableId;
      this.userType = 'lab';
    }
    if (user.UserTypeId === UserTypeEnum.InNetwork) {
      this.userType = 'inNetwork';
    }

    this.breadcrumbsService.breadcrumbs = 'List of All Sales Offices';
    this.getSalesOffices();
  }

  getSalesOffices() {
    this.salesOfficeService.getSalesOffices(this.paginationService.getParams()).then(result => {
      this.salesOffices = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
    })
  }

  addSalesOffice() {
    this.routeService.openRoute('salesOffice/add');
  }

  editSalesOffice(salesOfficeId) {
    this.routeService.openRoute('salesOffice/' + salesOfficeId + '/edit');
  }

  deleteSalesOfficeById(salesOffice) {
    if (this.userType === 'inNetwork') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete - ' + salesOffice.SalesOfficeName + ' ?',
        icon: 'fa fa-trash',
        accept: () => {
          this.salesOfficeService.deleteSalesOfficeById(salesOffice.Id).then(result => {
            this.getSalesOffices();
          })
        },
        reject: () => {
        }
      });
    }

    if (this.userType === 'lab') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to unlink this  Sales Office - ' + salesOffice.SalesOfficeName + ' ?',
        icon: 'fa fa-trash',
        accept: () => {
          this.salesOfficeService.deleteLinkingSalesOfficeById(salesOffice.Id).then(result => {
            this.getSalesOffices();
          })
        },
        reject: () => {
        }
      });
    }

  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getSalesOffices();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getSalesOffices();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getSalesOffices();
  }




  onSaleOfficeSearch() {
    this.salesOfficeService.searchSaleOffice(this.searchText).then((response) => {
      this.saleOffice = response.data;
      this.saleOffice.map(sale => {
        sale.IsSelected = false;
      })
      this.showModal = true;
    })
  }
  onSearchChange() {

  }
  saveSearchedTests() {
    let arr = this.saleOffice.filter((test) => {
      if (test.IsSelected === true) {
        return test;
      }
    });
    this.saveSaleOrder(arr);
  }

  saveSaleOrder(arr) {
    this.selectedSaleOffice = [];
    arr.map(res => {
      res.SalesOfficeId = res.Id;
      res.Id = 0;
      this.selectedSaleOffice.splice(this.selectedSaleOffice.length, -1, res);
    })

    this.salesOfficeService.linkSaleOffice(this.selectedSaleOffice).then((response) => {
      // this.getSaleOfficeList();
      this.searchText = '';
      this.showModal = false;
      this.getSalesOffices();
    })
  }
  cancel() {
    this.showModal = false;
    this.searchText = '';
  }
}
