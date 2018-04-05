import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientEligibilityCriteriaModel, PatientEligibilityCriteriaService } from './shared';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../shared';
import { PaginationEnum } from '../shared/enums';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../core/shared/services/index';
import { LabService } from './../lab/shared/lab.service';


@Component({
  selector: 'app-patient-eligibility-criteria',
  templateUrl: './patient-eligibility-criteria.component.html',
})

export class PatientEligibilityCriteriaComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public patientEligibilityCriterias: Array<PatientEligibilityCriteriaModel> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  private insuranceCompanyId: number = 0;
  constructor(private patientEligibilityCriteriaService: PatientEligibilityCriteriaService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService,
    public route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private labService: LabService) {
    this.paginationService.setDefaultPage();

  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of Patient Eligibility Criterias';
    this.insuranceCompanyId = Number(this.route.snapshot.params['insuranceCompanyId']) || 0;
    this.getPatientEligibilityCriterias();


  }

  getPatientEligibilityCriterias() {
    this.patientEligibilityCriteriaService.getPatientEligibilityCriterias(this.paginationService.getParams())
    .then(result => {
      this.patientEligibilityCriterias = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
    })
  }

  addPatientEligibilityCriteria() {
    if (this.insuranceCompanyId > 0) {
      this.routeService.openRoute('insurance/' + this.insuranceCompanyId + '/utilizationManagement/add');
    } else {
      this.routeService.openRoute('utilizationManagement/eligibilityCriteria/add');
    }
  }

  editPatientEligibilityCriteria(PatientEligibilityCriteriaId) {
    if (this.insuranceCompanyId > 0) {
      this.routeService.openRoute('insurance/' + this.insuranceCompanyId + '/utilizationManagement/' + PatientEligibilityCriteriaId + '/edit');
    } else {
      this.routeService.openRoute('utilizationManagement/eligibilityCriteria/' + PatientEligibilityCriteriaId + '/edit');
    }
  }

  deletePatientEligibilityCriteriaById(PatientEligibilityCriteria) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + PatientEligibilityCriteria.PatientConditionName + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.patientEligibilityCriteriaService.deletePatientEligibilityCriteriaById(PatientEligibilityCriteria.Id).then(result => {
          this.getPatientEligibilityCriterias();
        })
      },
      reject: () => {
      }
    });

  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getPatientEligibilityCriterias();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getPatientEligibilityCriterias();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    // this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getPatientEligibilityCriterias();
  }
}
