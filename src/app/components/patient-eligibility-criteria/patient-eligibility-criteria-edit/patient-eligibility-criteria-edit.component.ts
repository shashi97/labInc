import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { PatientEligibilityCriteriaModel, PatientEligibilityCriteriaService } from '../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO, MasterService } from './../../shared';
import { EmailValidateService } from '../../shared/services/email-validate.component'
import { LabService } from '../../lab/shared/lab.service';
import { LocalStorageService } from '../../../core/shared/services/index';


@Component({
  selector: 'patient-eligibility-criteria-edit',
  templateUrl: './patient-eligibility-criteria-edit.component.html',
  styleUrls: ['./patient-eligibility-criteria-edit.component.css']
})

export class PatientEligibilityCriteriaEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public patientEligibilityCriteria: PatientEligibilityCriteriaModel = new PatientEligibilityCriteriaModel();
  public states: Array<CustomDDO> = [];
  public type: string;
  public PatientConditionDDOs: Array<any> = [];
  public RiskGroupDDOs: Array<any> = [];
  public FrequencyTypeDDOs: Array<any> = [];
  private labName: string = '';
  private insuranceCompanyId: number = 0
  constructor(public breadcrumbsService: BreadcrumbsService,
    private patientEligibilityCriteriaService: PatientEligibilityCriteriaService,
    private routeService: RouteService,
    private masterService: MasterService,
    public route: ActivatedRoute,
    private emailValidateService: EmailValidateService,
    private localStorageService: LocalStorageService,
    private labService: LabService) {

  }

  ngOnInit() {
    this.getPatientConditionDDOs();
    this.getRiskGroupDDOs();
    this.getFrequencyTypeDDOs();
    this.getDefaultParams();
  }

  getPatientConditionDDOs() {
    this.patientEligibilityCriteriaService.getPatientConditionDDOs().then(result => {
      this.PatientConditionDDOs = result.data;
      this.PatientConditionDDOs.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    });
  }
  getRiskGroupDDOs() {
    this.patientEligibilityCriteriaService.getRiskGroupDDOs().then(result => {
      this.RiskGroupDDOs = result.data;
      this.RiskGroupDDOs.map((item) => {
        item.label = item.RiskGroupName;
        item.value = item.Id;
      })
    });
  }
  getFrequencyTypeDDOs() {
    this.patientEligibilityCriteriaService.getFrequencyTypeDDOs().then(result => {
      this.FrequencyTypeDDOs = result.data;
      this.FrequencyTypeDDOs.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    });
  }



  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Add Eligibility Criteria';
    this.patientEligibilityCriteria.Id = Number(this.route.snapshot.params['PatientEligibilityCriteriaId']) || 0;
    this.insuranceCompanyId = Number(this.route.snapshot.params['insuranceCompanyId']) || 0;
    this.type = this.route.snapshot.params['type'] || '';
    if (this.patientEligibilityCriteria.Id > 0) {
      this.getPatientEligibilityCriteriaById(this.patientEligibilityCriteria.Id);
    }

  }


  private getPatientEligibilityCriteriaById(PatientEligibilityCriteriaId) {
    this.patientEligibilityCriteriaService.getPatientEligibilityCriteriaById(PatientEligibilityCriteriaId).then((result) => {
      this.patientEligibilityCriteria = result.data;
    });
  }


  showErrorMessage(message) {
    this.errorMsg.push({
      severity: 'error',
      detail: message
    });
  }
  public save(isValid) {
    let message = ''
    if (!isValid || this.patientEligibilityCriteria.PatientConditionId == 0 || this.patientEligibilityCriteria.RiskGroupId == 0
     || !this.patientEligibilityCriteria.Name ) {
      message = 'Please Fill All Required Field';
      this.showErrorMessage(message);
      return
    }
    if (this.insuranceCompanyId > 0) {
      this.patientEligibilityCriteria.InsuranceCompanyId = this.insuranceCompanyId;
    }
    this.patientEligibilityCriteriaService.savePatientEligibilityCriteria(this.patientEligibilityCriteria).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      if (this.insuranceCompanyId > 0) {
        this.routeService.openRoute('insurance/' + this.insuranceCompanyId + '/utilizationManagement');
      } else {
        this.routeService.openRoute('utilizationManagement/eligibilityCriteria');
      }
    });
  }

  public cancel(): void {
    if (this.insuranceCompanyId > 0) {
      this.routeService.openRoute('insurance/' + this.insuranceCompanyId + '/utilizationManagement');
    } else {
      this.routeService.openRoute('utilizationManagement/eligibilityCriteria');
    }
  }

}
