
import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientModel, PatientService } from './shared';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../shared';
import { PaginationEnum } from '../shared/enums';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',

})

export class PatientComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;

  public patients: Array<PatientModel> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;

  constructor(private patientService: PatientService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
    this.getPatients();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All Patients';
  }

  getPatients() {
    this.patientService.getPatients(this.paginationService.getParams()).then(result => {
      this.patients = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
    })
  }

  addPatient() {
    this.routeService.openRoute('patient/add');
  }

  editPatient(id) {
    this.routeService.openRoute('patient/' + id + '/view');
  }

  deletePatientById(patient) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + patient.FirstName + ' ' + patient.LastName + ' ?',
       icon: 'fa fa-trash',
      accept: () => {
        this.patientService.deletePatientById(patient.Id).then(result => {
          this.getPatients();
        })
      },
      reject: () => {
      }
    });
  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getPatients();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getPatients();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getPatients();
  }
}
