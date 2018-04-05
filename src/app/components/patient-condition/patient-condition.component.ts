import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from '../../shared';
import { BreadcrumbsService } from '../../core/shared/services';
import { Paginator } from '../../core/paginator/paginator';
import { Message } from 'primeng/primeng';
import { PaginationEnum } from '../shared/enums';
import { PatientConditionModel } from './shared/patient-condition.model';
import { PatientConditionService } from './shared/patient-condition.service';

@Component({
  selector: 'patient-condition',
  templateUrl: './patient-condition.component.html',
  styleUrls: ['./patient-condition.component.css']
})

export class PatientConditionComponent implements OnInit {
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public errorMsg: Message[] = [];
  private ErrorDiv = '';
  private errormsg = '';
  public patientConditions: Array<PatientConditionModel> = [];
  public patientCondition: PatientConditionModel = new PatientConditionModel();


  constructor(
    // public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService,
    public patientConditionService: PatientConditionService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of all Patient Conditions';
    this.getPatientCondition();
  }


  private deletePatientCondition(PatientCondition) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + PatientCondition.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.patientConditionService.deletePatientConditionById(PatientCondition.Id).then(result => {
          this.getPatientCondition();
          this.errorMsg.push({ severity: 'success', summary: '', detail: 'Record deleted successfully' });
        })
      }
    });
  }

  public getPatientCondition() {

    this.patientConditionService.getPatientCondition(this.paginationService.getParams()).then(result => {
      this.patientConditions = result.data.Data;
      // this.prescribedMedicines =
      // [{ Id: 2, DrugName: "messi", isedit: false },
      // { Id: 3, DrugName: "sam", isedit: false }, { Id: 4, DrugName: "neymar", isedit: false }]
      this.totalRecords = result.data.TotalRecords;
    })
  }
  public addPatientCondition() {
    this.routeService.openRoute('utilizationManagement/patientCondition/add');
  }

  public editPatientCondition(patientConditionId) {
    this.routeService.openRoute('utilizationManagement/patientCondition/' + patientConditionId + '/edit');
  }

  public savePatientCondition(PracticeItem) {
    if (PracticeItem.Name === '') {
      this.ErrorDiv = 'red';
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Patient Condition Name can not be blank' });
      return;
    }
    // this.prescribedMedicines = [...this.prescribedMedicines, PrescribedItem];
    this.patientConditionService.savePatientCondition(PracticeItem).then(result => {
      this.getPatientCondition();
    })
  }

  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getPatientCondition();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getPatientCondition();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getPatientCondition();
  }

}
