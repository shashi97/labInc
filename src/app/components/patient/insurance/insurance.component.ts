import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InsuranceService } from './shared';
import { BreadcrumbsService } from './../../../core/shared/services';
import { Paginator } from './../../../core/paginator/paginator';
import { RouteService, PaginationService } from './../../../shared';
import { ConfirmationService, DataTable, Message } from 'primeng/primeng';
import { InsuranceModel } from '../insurance/shared/insurance.model';
import { LocalStorageService } from '../../../core/shared/services/index';
import { PaginationEnum } from '../../shared/enums';
import { PatientService } from '../shared/patient.service';
// import { PatientModel } from './patient/shared/patient.model'

@Component({
  selector: 'app-patient-insurance',
  templateUrl: './insurance.component.html'
})

export class InsuranceComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;

  public insurances: Array<InsuranceModel> = [];
  private patientId: number = 0;

  constructor(
    public breadcrumbsService: BreadcrumbsService,
    private confirmationService: ConfirmationService,
    public routeService: RouteService,
    public route: ActivatedRoute,
    public insuranceService: InsuranceService,
    private localStorageService: LocalStorageService,
    public paginationService: PaginationService,
    private patientService: PatientService) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.patientId = Number(this.route.snapshot.params['patientId']);
    this.getPatientDetais()
    // this.breadcrumbsService.breadcrumbs = 'List of All Insurance of Patients';
  }

  getPatientDetais() {
    this.patientService.getPatientNameByPatientId(this.patientId).then((patient) => {
      this.breadcrumbsService.breadcrumbs = patient.data.FirstName + ' ' + patient.data.LastName + ' / List of All Insurance ';
      this.getInsuranceList();
    })
  }

  /*call to get List of all insurance array*/
  getInsuranceList(): void {
    this.insuranceService.getList(this.paginationService.getParams(),this.patientId).then(res => {
      this.insurances = res.data.Data;
      this.totalRecords = res.data.TotalRecords;
    });
  }

  addInsurance(): void {
    this.routeService.openRoute('patient/' + this.patientId + '/insurance/add');
  }

  cancel(): void {
    this.routeService.openRoute('patient');
  }

  /* edit the row of single row */
  private editPatientInsurance(id: number): void {
    this.routeService.openRoute('patient/' + this.patientId + '/insurance/' + id + '/edit');
  }

  /* delete the row of single row */
  private deletePatientInsurance(patientInsurance): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete Policy Id - ' + patientInsurance.PolicyId + ' ?',
      // message: 'Are you sure you want to Delete',
      accept: () => {
        this.insuranceService.deleteRoleById(patientInsurance.Id).then(res => {
          this.getInsuranceList();
        });
      },
      reject: () => { }
    });
  }

  /* call to page change of the grid */
  pageChanged(event): void {
    this.paginationService.setPageChange(event);
    this.getInsuranceList();
  }

  /* call to sorting the grid data */
  onSorting(event): void {
    this.paginationService.setSortExpression(event);
    this.getInsuranceList();
  }

  /* call to filter the grid data */
  onFiltering(event): void {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getInsuranceList();
  }
}
