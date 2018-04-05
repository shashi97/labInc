import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { Message } from 'primeng/primeng';
import { CustomDDO } from './../../shared/models/custom-ddo.model';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../../shared';
import { PaginationEnum,ImportFileEnum } from '../../shared/enums';
import { ICDCodesModel } from './shared/icdCodes.model';
import { ICDCodesService } from '../shared/icdCodes.service'

@Component({
  selector: 'app-icdcodes',
  templateUrl: './icdCodes.component.html'
})

export class ICDCodesComponent implements OnInit {
  public importTitleName: string = 'ICD Codes';
  public importTableHeader = [{ "header": "ICD Code" }, { "header": "ICD Description" }];
  public importTableRow = [{ col1: "A", col2: "B"}];
  public importFileType: number = ImportFileEnum.ICD10Code;

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;

  public icdCodes: Array<ICDCodesModel> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public showDialog: boolean = false;
  public dialogTitle: string = 'Import ICD Codes';
  public columnTitle = 'ICD';
  public tableHeadingFileFormate: Array<string> = ['ICD Code', 'ICD Description'];
  public tableBodyFileFormate: Array<string> = ['A', 'B'];

  constructor(private icdCodesService: ICDCodesService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
    this.getICD10Codes();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All ICD Codes';
  }

  getICD10Codes() {
    this.icdCodesService.getICDCodes(this.paginationService.getParams()).then(result => {
      this.icdCodes = result.data.Data; // temp data from Molecular API
      this.totalRecords = result.data.TotalRecords;
    })
  }

  importCodes(isShowDialog) {
    this.showDialog = isShowDialog;
    if (!this.showDialog) {
      this.getICD10Codes();
    }
  }

  editICDCode(id) {
    this.routeService.openRoute('codes/icd/' + id + '/edit');
  }

  deleteICDCode(icd) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + icd.Code + ' ?',
       icon: 'fa fa-trash',
      accept: () => {
          this.icdCodesService.deleteICDCodeById(icd.Id).then(result => {
          this.getICD10Codes();
        })
      },
    });
  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getICD10Codes();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getICD10Codes();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getICD10Codes();
  }


}
