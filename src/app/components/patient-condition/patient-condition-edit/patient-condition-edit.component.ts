import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { PatientConditionModel, PatientConditionService } from '../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO, MasterService } from './../../shared';
import { EmailValidateService } from '../../shared/services/email-validate.component'
import { LabService } from '../../lab/shared/lab.service';
import { LocalStorageService } from '../../../core/shared/services/index';


@Component({
  selector: 'patient-condition-edit',
  templateUrl: './patient-condition-edit.component.html',
  styleUrls: ['./patient-condition-edit.component.css']
})

export class PatientConditionEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public patientCondition: PatientConditionModel = new PatientConditionModel();
  public type: string;
  public selectedICDCodes;
  public selectedPracticeTypes;
  public practiceTypeSuggestion: Array<any> = [];
  public ICDCodeSuggestion: Array<any> = [];
  constructor(public breadcrumbsService: BreadcrumbsService,
    private patientConditionService: PatientConditionService,
    private routeService: RouteService,
    private masterService: MasterService,
    public route: ActivatedRoute,
    private emailValidateService: EmailValidateService,
    private localStorageService: LocalStorageService,
    private labService: LabService) {

  }

  ngOnInit() {
    this.getDefaultParams();
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Add Patient Condition';
    this.patientCondition.Id = Number(this.route.snapshot.params['patientConditionId']) || 0;
    this.type = this.route.snapshot.params['type'] || '';
    if (this.patientCondition.Id > 0) {
      this.getPatientConditionById(this.patientCondition.Id);
    }

  }

  // public getPracticeType() {
  //   this.patientConditionService.getPracticeType().then(result => {
  //     this.practiceTypes = result.data.Data;
  //   })
  // }

  afterSelectICD(selectedICD) {
    let filteredIcd = this.patientCondition.ICDCodes.filter((val) => {
      return val.Id === selectedICD.Id;
    });
    if (filteredIcd.length === 2) {
      let index = this.patientCondition.ICDCodes.indexOf(filteredIcd[1]);
      this.patientCondition.ICDCodes.splice(index, 1);
    }
  }
  afterSelectPratcticeType(selectedPraticeType) {
    let filteredPraticeType = this.patientCondition.PracticeTypes.filter((val) => {
      return val.Id === selectedPraticeType.Id;
    });
    if (filteredPraticeType.length === 2) {
      let index = this.patientCondition.PracticeTypes.indexOf(filteredPraticeType[1]);
      this.patientCondition.PracticeTypes.splice(index, 1);
    }
  }

  private getICDCodeOnSerach(event) {
    let query = event.query;
    if (query.length > 1) {
      this.patientConditionService.getICDCodeBySearch(query).then((code) => {
        this.ICDCodeSuggestion = code.data;
        if (this.ICDCodeSuggestion.length === 0) {
          this.showErrorMessage('ICD code not valid');
        }
      })
    }
  }
  private getPracticeTypeOnSerach(event) {
    let query = event.query;
    this.patientConditionService.getPracticeTypeOnSerach(query).then((res) => {
      this.practiceTypeSuggestion = res.data;
      if (this.practiceTypeSuggestion.length === 0) {
        this.showErrorMessage('Practice Type not valid');
      }
    })
  }

  private getPatientConditionById(patientConditionId) {
    this.patientConditionService.getPatientConditionById(patientConditionId).then((result) => {
      this.patientCondition = result.data;
      this.breadcrumbsService.breadcrumbs = this.patientCondition.Name + ' /Edit';
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
    if (!isValid) {
      message = 'Please Fill All Required Field';
      this.showErrorMessage(message);
      return
    }
    if (this.patientCondition.PracticeTypes.length === 0) {
      this.showErrorMessage('Please select Practice Type');
      return;
    }
    if (this.patientCondition.ICDCodes.length === 0) {
      this.showErrorMessage('Please select ICD code');
      return;
    }
    this.patientConditionService.savePatientCondition(this.patientCondition).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.routeService.openRoute('utilizationManagement/patientCondition');
    });
  }

  public cancel(): void {
    this.routeService.openRoute('utilizationManagement/patientCondition');
  }

}
