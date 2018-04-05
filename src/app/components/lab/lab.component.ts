import { Message } from 'primeng/primeng';

import { Component, OnInit, ViewChild } from '@angular/core';
import { LabModel, LabService } from './shared';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../shared';
import { PaginationEnum,ImportFileEnum } from '../shared/enums';
import { LocalStorageService } from '../../core/shared/services/index';
@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
})

export class LabComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;

  public importTitleName: string = 'Network Laboratories';
  public importTableHeader = [{ "header": "Name" },{ "header": "Complexity" },{ "header": "Latitude" },{ "header": "Longitude" },
  { "header": "Email" },{ "header": "Password" },{ "header": "States" },{ "header": "Address" },
  { "header": "City" },{ "header": "State Name" },{ "header": "Zip" },{ "header": "Fax" },{ "header": "Phone" }];
  public importTableRow = [{ col1: "A", col2: "B", col3: "C", col4: "D", col5: "E", col6: "F", col7: "G", col8: "H",
   col9: "I",col10: "J",col11: "K",col12: "L",col13: "M"},
   { col1: "A", col2: "B", col3: "C", col4: "D", col5: "E", col6: "F", col7: "ALL", col8: "H",
   col9: "I",col10: "J",col11: "K",col12: "L",col13: "M"},
   { col1: "A", col2: "B", col3: "C", col4: "D", col5: "E", col6: "F", col7: "ALL Except- G,G", col8: "H",
   col9: "I",col10: "J",col11: "K",col12: "L",col13: "M"},
   { col1: "A", col2: "B", col3: "C", col4: "D", col5: "E", col6: "F", col7: "G,G", col8: "H",
   col9: "I",col10: "J",col11: "K",col12: "L",col13: "M"}];
  public importFileType: number = ImportFileEnum.Laboratory;
  public errorMessages: Message[] = [];
  public labs: Array<LabModel> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public salesLogin: boolean =  false;
  constructor(private labService: LabService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    private localStorageService: LocalStorageService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
    let user = this.localStorageService.getUserDetail();
    if (user.UserTypeId == 4 || user.UserTypeId == 5) {
      this.salesLogin = true;
    }
    this.getLabs();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All Network Laboratories';
  }

  

  getLabs() {
    this.labService.getLabs(this.paginationService.getParams()).then(result => {
      this.labs = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
    })
  }

  addLab() {
    this.routeService.openRoute('lab/add');
  }

  editLab(labId) {
    this.routeService.openRoute('lab/' + labId + '/edit');
  }

  deleteLabById(lab) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + lab.Name + ' ?',
       icon: 'fa fa-trash',
      accept: () => {
        this.labService.deleteLabById(lab.Id).then(result => {
          this.getLabs();
        })
      },
      reject: () => {
      }
    });

  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getLabs();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getLabs();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getLabs();
  }

  onFilteringEve(event, field, match) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getLabs();
  }
}
