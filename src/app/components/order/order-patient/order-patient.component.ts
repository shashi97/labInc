import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { PatientModel, PatientService } from '../../patient/shared';
import { MasterService, CustomDDO } from '../../shared';
import { Message } from 'primeng/primeng';



@Component({
  selector: 'app-order-patient-edit',
  templateUrl: './order-patient.component.html',
  styleUrls: ['./order-patient.component.css']
})

export class OrderPatientEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public patient: PatientModel = new PatientModel();
  public type: string;
  public gender: Array<any> = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];
  public martialStatus: Array<any> = [
    { label: 'Single', value: 1 },
    { label: 'Married', value: 2 },
    { label: 'Divorsed', value: 3 },
    { label: 'Separated', value: 4 }
  ];
  public states: Array<CustomDDO> = [];
  public relationshipList: Array<CustomDDO> = [];
  public currentYear:number;
  constructor(public breadcrumbsService: BreadcrumbsService,
    private patientService: PatientService,
    private masterService: MasterService,
    private routeService: RouteService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.getDefaultParams();
    this.getStateDDOs();
    let year = new Date();
    this.currentYear = year.getFullYear();
  }

  getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
    })
  }

  getRelationshipList() {
    this.patientService.getRelationshipList().then(result => {
      let results = result.data.Data;
      results.map((item) => {
        let obj = { label: item.relationship, value: item.id };
        this.relationshipList.push(obj);
      });
    });
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Add Patient';
    this.patient.Id = this.route.snapshot.params['id'] === undefined ? 0 : Number(this.route.snapshot.params['id']);
    this.type = this.route.snapshot.params['type'];
    if (this.patient.Id) {
      this.getPatientById(this.patient.Id);
    }
  }

  private getPatientById(roleId) {
    this.patientService.getPatientById(roleId).then((result) => {
      this.patient = result.data;
      this.breadcrumbsService.breadcrumbs = this.patient.FirstName;
      this.patient.DateOfBirth = new Date(this.patient.DateOfBirth);
      this.patient.PatientGuarantorInfoData.DateOfBirth = new Date(this.patient.PatientGuarantorInfoData.DateOfBirth);
    });
  }

  public save() {
    this.patient.PatientGuarantorInfoData.PatientId = this.patient.Id;
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
