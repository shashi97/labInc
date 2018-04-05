import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../../core/shared/services';
import { RouteService } from './../../../../shared';
import { InsuranceModel } from '../shared/insurance.model';
import { InsuranceService } from '../shared';
import { Message } from 'primeng/primeng';
import { PatientService } from '../../shared/patient.service';
import { InsuranceEditMainComponent } from './insurance-edit-main/insurance-edit-main.component';

@Component({
  selector: 'app-patient-insurance-edit',
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.css']
})

export class InsuranceEditComponent implements OnInit {

  private insurance: InsuranceModel = new InsuranceModel();
  public insuranceNameObj;
  private insuranceCompanies: Array<any> = [];
  private insuranceTypes: Array<any> = [];
  private patientName: string = '';
  @ViewChild(InsuranceEditMainComponent) insuranceEditMainComponent: InsuranceEditMainComponent;
  public relations: Array<any> = [
    { label: 'Mother', value: 'Mother' },
    { label: 'Father', value: 'Father' },
    { label: 'Daughter', value: 'Daughter' },
    { label: 'Son', value: 'Son' }
  ];

  public errorMsg: Message[] = [];

  constructor(public breadcrumbsService: BreadcrumbsService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public insuranceService: InsuranceService,
    private patientService: PatientService) { }

  ngOnInit() {
    this.insurance.PatientId = this.route.snapshot.params['patientId'] === undefined ? 0 : this.route.snapshot.params['patientId'];
    this.insurance.Id = this.route.snapshot.params['id'] === undefined ? 0 : this.route.snapshot.params['id'];
    // this.insuranceEditMainComponent.getInsuranceType().then(res => {
    //   this.insuranceEditMainComponent.getInsuranceCompany().then(res1 => {
    //     this.getPatientDetails();
    //   })
    // });
    this.getPatientDetails();
  }



  public getInsuranceById(): void {
    this.insuranceService.getInsuranceById(Number(this.insurance.Id)).then(res => {
      this.insurance = res.data;
      this.insurance.ValidityOfPolicy = new Date(this.insurance.ValidityOfPolicy);
      if (this.insurance.StartDate) {
        this.insurance.StartDate = new Date(this.insurance.StartDate);
      }
    });
  }


  getPatientDetails() {
    this.patientService.getPatientNameByPatientId(this.insurance.PatientId).then((patient) => {
      this.patientName = patient.data.FirstName + ' ' + patient.data.LastName;
      if (this.insurance.Id > 0) {
        this.breadcrumbsService.breadcrumbs = this.patientName + ' / Insurance / Edit';
      } else {
        this.breadcrumbsService.breadcrumbs = this.patientName + ' / Insurance / New';
      }
    });
    this.getInsuranceById();
  }



  save() {
    this.insurance.isValid = true;
    if (this.insurance.InsuranceTypeId === 0 || this.insurance.InsuranceCompanyId === 0
      || this.insurance.PolicyId === '' || this.insurance.NameOfInsured === ''
      || this.insurance.RelationId === 0 || !this.insurance.ValidityOfPolicy

    ) {

      return;
    }
    this.insuranceService.saveInsurance(this.insurance).then(res => {
      this.cancel();
    });
  }

  cancel() {
    this.routeService.openRoute('patient/' + this.insurance.PatientId + '/insurance');
  }
}
