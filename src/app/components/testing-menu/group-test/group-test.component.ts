
import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupTest, GroupTestService } from './shared';
import { BreadcrumbsService } from '../../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../../shared';
import { PaginationEnum } from '../../shared/enums';



@Component({
  selector: 'app-group-test',
  templateUrl: './group-test.component.html',

})

export class GroupTestComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;

  public groupTests: Array<GroupTest> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;

  constructor(private groupTestService: GroupTestService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
    this.getGroupTests();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All Group Tests';
  }

  getGroupTests(): void {
    this.groupTestService.getGroupTests(this.paginationService.getParams()).then(result => {
      this.groupTests = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
    })
  }

  addGroupTest(): void {
    this.routeService.openRoute('testingMenu/groupTest/add');
  }

  editGroupTest(id: number): void {
    this.routeService.openRoute('testingMenu/groupTest/' + id + '/edit');
  }

  deleteGroupTestById(groupTest): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + groupTest.GroupTestName + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.groupTestService.deleteGroupTestById(groupTest.Id).then(result => {
          this.getGroupTests();
        })
      },
      reject: () => {
      }
    });

  }

  /* call to page change of the grid */
  pageChanged(event): void {
    this.paginationService.setPageChange(event);
    this.getGroupTests();
  }

  /* call to sorting the grid data */
  onSorting(event): void {
    this.paginationService.setSortExpression(event);
    this.getGroupTests();
  }

  /* call to filter the grid data */
  onFiltering(event): void {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getGroupTests();
  }
}
