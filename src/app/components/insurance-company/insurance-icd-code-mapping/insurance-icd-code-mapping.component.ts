import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from './../../../shared';
import { BreadcrumbsService } from './../../../core/shared/services';
import { Paginator } from './../../../core/paginator/paginator';
import { Message } from 'primeng/primeng';
import { PaginationEnum } from './../../shared/enums';
import { InsuranceCompanyTypeModel } from '../shared/insurance-company.model';
import { InsuranceCompanyService } from '../shared/insurance-company.service';
import { CPTCodesService } from '../../codes/shared/cptCodes.service';

@Component({
  selector: 'insurance-icd-cpt-code-mapping',
  templateUrl: './insurance-icd-code-mapping.component.html',
  styleUrls: ['./insurance-icd-code-mapping.component.css']
})

export class InsuranceIcdCodeMappingComponent implements OnInit {
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public id: number;
  public errorMsg: Message[] = [];
  private ErrorDiv = '';
  private errormsg = '';
  private cptcodesModel: any;
  public parent1: string = 'insurance';
  public insuranceCompanyTypes: Array<InsuranceCompanyTypeModel> = [];
  public insuranceCompanyType: InsuranceCompanyTypeModel = new InsuranceCompanyTypeModel();
  public insuranceCompanyId: number;

  constructor(
    // public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService,
    public insuranceCompanyService: InsuranceCompanyService,
    private codesService: CPTCodesService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'CPT/ICD Code Mapping';
    this.insuranceCompanyId = this.route.snapshot.params['insuranceCompanyId'] || 0;
    this.id = this.route.snapshot.params['id'] || 0;
    this.getCPTCodeById();
  }

  getCPTCodeById() {
    this.codesService.getCPTCodeById(Number(this.id)).then(result => {
      this.cptcodesModel = result.data;
      this.breadcrumbsService.breadcrumbs = this.cptcodesModel.Code + ' / ICD CODE Mapping';

    })
  }

}
