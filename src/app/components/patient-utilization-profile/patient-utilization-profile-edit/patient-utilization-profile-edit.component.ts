import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { BillingCodeService } from './../../billing-code/shared';
import { CustomDDO } from './../../shared/models/custom-ddo.model';
import { Message } from 'primeng/primeng';
import { CPTCodesService } from '../../codes/shared/cptCodes.service';
import { ICDCodesService } from '../../codes/shared/icdCodes.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import {
  PatientEligibilityCriteriaModel, PatientUtilizationModel,
  UtilizationProfilePatientCriteriaModel
} from '../shared/patient-utilization-profile.model';
import { PatientUtilizationService } from '../shared/patient-utilization-profile.service';

@Component({
  selector: 'test-patient-utilization-profile-edit',
  templateUrl: './patient-utilization-profile-edit.component.html',
  // styleUrls: ['./test-profile-edit.component.css']
})

export class PatientUtilizationProfileEditComponent implements OnInit {

  public errorMessages: Message[] = [];
  public selectedCPTCodes: Array<any> = [];
  public CPTCodeList: Array<any> = [];
  public CPTCodeSuggestion: Array<any> = [];
  public cptIcdData: Array<any> = [];
  public selectedICDCodes: Array<any> = [];
  public ICDCodeList: Array<any> = [];
  public ICDCodeSuggestion: Array<any> = [];
  public gridData: Array<any> = [];
  public patientCriteria: any;
  public patientUtilization: PatientUtilizationModel = new PatientUtilizationModel();
  public isEdit: boolean = false;
  public isPatientUtilizationIsEmpty: boolean = false;
  private rowIndex: number = 0;
  private showEligibilityCriteria: boolean = false;
  private patientEligibilityExists: boolean = false;
  private showCriteria: boolean = true;
  private patientEligibilityCriterias: Array<any> = [];
  private frequencyTypes: Array<any> = [];
  private frequencyType: Array<any> = [];
  private patientEligibilities: Array<any> = [];
  private demo: Array<any> = [];
  private id: number;
  constructor(
    private cptcodesService: CPTCodesService,
    private icdCodesService: ICDCodesService,
    private route: ActivatedRoute, private routeService: RouteService,
    private breadcrumbsService: BreadcrumbsService,
    private confirmationService: ConfirmationService,
    private patientUtilizationService: PatientUtilizationService) {

  }
  ngOnInit() {
    this.id = this.route.snapshot.params['patientUtilizationId'];
    this.patientEligibilityCriteriaDDO();
    this.patientFrequencyTypeDDO();
    this.getPatientUtilizationProfile();
  }


  getPatientUtilizationProfile() {

    if (this.id) {
      this.patientUtilization.Id = this.id;
      this.patientUtilizationService.getUtilizationProfileById(this.patientUtilization.Id).then((utilization) => {
        this.patientUtilization.Id = utilization.data.Id;
        this.patientUtilization.Name = utilization.data.Name;
        const groupedObj = utilization.data.UtilizationProfilePatientCriterias.reduce((prev, cur) => {
          if (!prev[cur['PatientEligibilityCriteriaId']]) {
            prev[cur['PatientEligibilityCriteriaId']] = [cur];
          } else {
            prev[cur['PatientEligibilityCriteriaId']].push(cur);
          }
          return prev;
        }, {});
        if (Object.keys(groupedObj).length > 0) {
          Object.keys(groupedObj).map(res => {
            this.patientUtilization.UtilizationProfilePatientCriterias
              .splice(this.patientUtilization.UtilizationProfilePatientCriterias.length, -1,
              {
                frequencyTypes: groupedObj[res],
                patientCriteriaName: groupedObj[res][groupedObj[res].length - 1].PatientEligibilityCriteriaName,
                IsDeleted: false
              }
              )
          })

        }
        this.breadcrumbsService.breadcrumbs = this.patientUtilization.Name + ' / Edit';
      });

    } else {
      this.breadcrumbsService.breadcrumbs = 'Add Patient Utilization';
    }

  }


  save() {
    this.isPatientUtilizationIsEmpty = false;
    let UtilizationProfilePatientCriterias = [];
    if (!this.patientUtilization.Name) {
      this.isPatientUtilizationIsEmpty = true;
      return;
    }
    if (this.showEligibilityCriteria && !this.showCriteria) {
      return;
    }
    this.patientUtilization.UtilizationProfilePatientCriterias.map(res1 => {
      res1.frequencyTypes.map(res => {
        UtilizationProfilePatientCriterias.splice(UtilizationProfilePatientCriterias.length, -1,
          {
            Id: res.Id,
            IsDeleted: res.IsDeleted,
            UtilizationProfileId: res.UtilizationProfileId ? Number(res.UtilizationProfileId) : 0,
            PatientEligibilityCriteriaId: res.PatientEligibilityCriteriaId,
            FrequencyTypeId: res.FrequencyTypeId, FrequencyNumber: res.FrequencyNumber ? Number(res.FrequencyNumber) : null
          })
      })
    })
    let patientUtilization = {
      Id: this.patientUtilization.Id,
      Name: this.patientUtilization.Name,
      UtilizationProfilePatientCriterias: UtilizationProfilePatientCriterias
    }
    this.patientUtilizationService.savePatientUtilization(patientUtilization).then(res => {
      this.routeService.openRoute('utilizationManagement/patientUtilizationProfile');
    })
  }

  cancel() {
    this.routeService.openRoute('utilizationManagement/patientUtilizationProfile');
  }





  public patientEligibilityCriteriaDDO(): void {
    this.patientUtilizationService.getPatientEligibilityCriteriaDDO().then(res => {
      res.data.map(eligibility => {
        this.patientEligibilityCriterias.splice(this.patientEligibilityCriterias.length, -1, {
          label: eligibility.Name, value: eligibility.Id
        })
      });
    })

  }
  public patientFrequencyTypeDDO(): void {
    this.patientUtilizationService.getFrequencyTypeDDO().then(res => {
      this.frequencyTypes = res.data;

    })
  }

  public onPatientEligibilityCriteria(criteria): void {
    this.patientCriteria = criteria;

  }

  public onAdd(): void {
    let findEligibility = [];
    this.frequencyType = [];
    this.showCriteria = true;
    if (this.patientCriteria) {
      this.frequencyTypes.map(frequency => {
        this.frequencyType.splice(this.frequencyTypes.length, -1, {
          FrequencyTypeName: frequency.Name,
          FrequencyTypeId: frequency.Id,
          IsDeleted: false,
          FrequencyNumber: null, PatientEligibilityCriteriaId: this.patientCriteria.value, UtilizationProfileId: 0, Id: 0
        })
      });

    }
    this.showEligibilityCriteria = this.patientUtilization.PatientUtilizationNameId ? false : true;
    if (this.patientUtilization.UtilizationProfilePatientCriterias.length !== 0) {
      findEligibility = this.patientUtilization.UtilizationProfilePatientCriterias.filter(res => {
        return res.patientCriteriaName === this.patientCriteria.label && res.IsDeleted === false
      })
    }
    this.showCriteria = !this.showEligibilityCriteria && findEligibility.length === 0 ? true : false;
    if (!this.showEligibilityCriteria && this.showCriteria) {
      this.patientUtilization.UtilizationProfilePatientCriterias.splice(
        0, -1, {
          frequencyTypes: this.frequencyType,
          patientCriteriaName: this.patientCriteria.label,
          IsDeleted: false
        });

      this.patientUtilization.PatientUtilizationNameId = 0;
    }
  }

  public deletePatientEligibility(patientEligibility): void {
    patientEligibility.IsDeleted = true;
    patientEligibility.frequencyTypes.map(res => {
      res.IsDeleted = true;
    })

  }


}
