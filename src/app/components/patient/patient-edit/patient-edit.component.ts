import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { PatientModel, PatientGuarantorInfo, PatientService } from '../shared';
import { MasterService, CustomDDO } from '../../shared';
import { Message } from 'primeng/primeng';
import { InsuranceModel } from '../../patient/insurance/shared/insurance.model';
import { EmailValidateService } from '../../shared/services/email-validate.component'

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})

export class PatientEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public insuranceNameObj;
  public patient: PatientModel = new PatientModel();
  public type: string;
  public insurance: InsuranceModel = new InsuranceModel();
  // public gender: Array<any> = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];
  // public martialStatus: Array<any> = [
  //   { label: 'Single', value: 1 },
  //   { label: 'Married', value: 2 },
  //   { label: 'Divorsed', value: 3 },
  //   { label: 'Separated', value: 4 }
  // ];
  public states: Array<CustomDDO> = [];
  public relationshipList: Array<CustomDDO> = [];
  constructor(public breadcrumbsService: BreadcrumbsService,
    private patientService: PatientService,
    private masterService: MasterService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    private emailValidateService: EmailValidateService) { }


  ngOnInit() {
    this.getDefaultParams();
  }

  getDefaultParams() {

    this.patient.Id = this.route.snapshot.params['id'] === undefined ? 0 : Number(this.route.snapshot.params['id']);
    this.type = this.route.snapshot.params['type'];
    if (this.patient.Id === 0) {
      this.breadcrumbsService.breadcrumbs = 'Patient / New';
    }
    if (this.patient.Id) {
      this.getPatientById(this.patient.Id);
    }
  }

  private getPatientById(roleId) {
    this.patient = new PatientModel();
    this.patientService.getPatientById(roleId).then((result) => {
      this.patient = result.data;
      if (this.patient.PatientGuarantorInfoData === null) {
        this.patient.PatientGuarantorInfoData = new PatientGuarantorInfo();
      }
      this.breadcrumbsService.breadcrumbs = this.patient.FirstName + ' ' + this.patient.LastName + ' / Edit';
      this.patient.DateOfBirth = this.patient.DateOfBirth ? new Date(this.patient.DateOfBirth) : '';
      this.patient.PatientGuarantorInfoData.DateOfBirth = this.patient.PatientGuarantorInfoData.DateOfBirth ?
        new Date(this.patient.PatientGuarantorInfoData.DateOfBirth) : '';
    });
  }
  showErrorMessage(message) {
    this.errorMsg.push({
      severity: 'error',
      detail: message
    });
  }

  public save() {
    this.patient.isValid = true;
    this.insurance.isValid = true;
    if (this.patient.FirstName === '' || this.patient.LastName === '' || this.patient.SSN === ''
      || this.patient.MedicalRecordNo === '' || this.patient.Gender === '' || this.patient.Address1 === ''
    ) {
      this.showErrorMessage('Please Fill All Required Field');
      return;
    }
    if (this.patient.Id === 0 && (this.insurance.InsuranceTypeId === 0 || this.insurance.InsuranceCompanyId === 0
      || this.insurance.PolicyId === '' || this.insurance.NameOfInsured === ''
      || !this.insurance.ValidityOfPolicy || this.insurance.RelationId === 0)
    ) {
      this.showErrorMessage('Please Fill All Required Field');
      return;
    }
    if (!this.emailValidateService.validateEmail(this.patient.Email) && this.patient.Email !== '') {
      this.errorMsg.push({
        severity: 'error',
        summary: 'Warn Message', detail: 'Email Id Not Valid.'
      });
      return;
    }
    if (!this.emailValidateService.validateEmail(this.patient.PatientGuarantorInfoData.Email)
      && this.patient.PatientGuarantorInfoData.Email !== '') {
      this.errorMsg.push({
        severity: 'error',
        summary: 'Warn Message', detail: 'Email Id Not Valid.'
      });
      return;
    }
    this.patient.PatientGuarantorInfoData.PatientId = this.patient.Id;
    this.patient.PatientInsurances = [];
    this.patient.PatientInsurances.splice(this.patient.PatientInsurances.length, -1, this.insurance);

    this.patientService.savePatient(this.patient).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      if (this.type === 'order') {
        this.routeService.openRoute('order/add/' + res.data.Id);
      } else {
        this.routeService.openRoute('patient');
      }
    });
  }

  public cancel(): void {
    if (this.patient.Id > 0) {
      this.routeService.openRoute('patient/' + this.patient.Id + '/view');
    } else {
      this.routeService.openRoute('patient');
    }
    if (this.type === 'order') {
      this.routeService.openRoute('order/add');
    }
  }
}
