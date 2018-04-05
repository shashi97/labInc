
import { Component, OnInit, ViewChild } from '@angular/core';
import { PracticeModel, PracticeService } from './shared';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../shared';
import { PaginationEnum } from '../shared/enums';
import { LocalStorageService } from '../../core/shared/services/index';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-Practice',
  templateUrl: './Practice.component.html',

})

export class PracticeComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public errorMessage: Message[] = [];
  public Practices: Array<PracticeModel> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public salesRepLogin: boolean = false;
  constructor(private PracticeService: PracticeService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    private localStorageService: LocalStorageService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
    this.getPractices();
    let user = this.localStorageService.getUserDetail();
    if (user.UserTypeId == 5) {
      this.salesRepLogin = true;
    }
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All Practices';
  }

  getPractices() {
    this.PracticeService.getPractices(this.paginationService.getParams()).then(result => {
      this.Practices = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
    })
  }

  addPractice() {
    this.routeService.openRoute('practice/add');
  }



  editPractice(id) {

    this.routeService.openRoute('practice/' + id + '/edit');
  }

  deletePracticeById(practice) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + practice.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.PracticeService.deletePracticeById(practice.Id).then(result => {
          this.getPractices();
        })
      },
      reject: () => {
      }
    });

  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getPractices();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getPractices();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getPractices();
  }
}
