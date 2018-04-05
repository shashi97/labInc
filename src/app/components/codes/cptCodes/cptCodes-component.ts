import { Component, OnInit, OnChanges, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { Message } from 'primeng/primeng';
import { CustomDDO } from './../../shared/models/custom-ddo.model';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../../shared';
import { PaginationEnum,ImportFileEnum } from '../../shared/enums';
import { CPTCodesModel } from './shared/cptCodes.model';
import { CPTCodesService } from './../shared/cptCodes.service'


@Component({
  selector: 'app-cptcodes',
  templateUrl: './cptCodes-component.html'
})

export class CPTCodesComponent implements OnInit, OnChanges {
  public importTitleName: string = 'CPT Codes';
  public importTableHeader = [{ "header": "CPT Code" }, { "header": "CPT Description" },{ "header": "Type Of Test" }];
  public importTableRow = [{ col1: "A", col2: "B", col3: "Qualitative Test/Quantitative Test"}];
  public importFileType: number = ImportFileEnum.CPTCode;
  public errorMessages: Message[] = [];
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public showDialog: boolean = false;
  private showIcdCodeMapping: boolean = false;
  public dialogTitle: string = 'Import CPT Codes';
  public cptCodes: Array<CPTCodesModel> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public columnTitle = 'CPT';
  @Input() insuranceCompanyId: number = 0;
  @Input() parent: string = 'cpt';
  constructor(private cptCodesService: CPTCodesService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
  }


  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All CPT Codes';
    this.getCPTCodes();
  }
  ngOnChanges() {
    if (this.insuranceCompanyId !== 0) {
      this.getCPTCodes();
    }
  }

  getCPTCodes() {
    this.cptCodesService.getCPTCodes(this.paginationService.getParams(), Number(this.insuranceCompanyId), this.parent).then(result => {
      this.cptCodes = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
    })
  }

  editCPTCode(id) {
    this.routeService.openRoute('codes/cpt/' + id + '/edit');
  }

  deleteCPTCode(cptCode) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + cptCode.Code + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.cptCodesService.deleteCptCodesById(cptCode.Id).then(result => {
          this.getCPTCodes();
        })
      },
    });
  }

  importCodes(isShowDialog) {
    this.showDialog = isShowDialog;
    if (!this.showDialog) {
      this.getCPTCodes();
    }
  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getCPTCodes();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getCPTCodes();
  }

  /* call to filter the grid data */
  onFiltering(event, cptCode) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getCPTCodes();
  }
  icdCodeMapping(cptCode) {
    if (this.parent === 'cpt') {
      this.routeService.openRoute('codes/icdCodeMapping/' + cptCode.Id);
      // this.showIcdCodeMapping = true;
    }

    if (this.parent === 'insurance') {
        this.routeService.openRoute('insurance/icdCodeMapping/' + cptCode.Id + '/' + this.insuranceCompanyId);
    }
  }
  addCptCode() {
    this.routeService.openRoute('insurance/' + this.insuranceCompanyId + '/icdCodeMapping' );
  }
  icdCodeMappingForInsurance(cptCode) {
    this.routeService.openRoute('insurance/icdCodeMapping/' + cptCode.Id + '/' + this.insuranceCompanyId);
  }
}
