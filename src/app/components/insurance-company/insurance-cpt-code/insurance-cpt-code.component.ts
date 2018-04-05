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

@Component({
  selector: 'insurance-cpt-code',
  templateUrl: './insurance-cpt-code.component.html',
  styleUrls: ['./insurance-cpt-code.component.css']
})

export class InsuranceCptCodeComponent implements OnInit {
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public errorMsg: Message[] = [];
  private ErrorDiv = '';
  private errormsg = '';
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
    public insuranceCompanyService: InsuranceCompanyService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All CPT Codes';
    this.insuranceCompanyId = this.route.snapshot.params['insuranceCompanyId'] || 0;
  }

}
