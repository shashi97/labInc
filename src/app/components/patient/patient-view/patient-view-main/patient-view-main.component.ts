import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../../core/shared/services';
import { RouteService } from './../../../../shared';
import { PatientModel, PatientGuarantorInfo, PatientService } from '../../shared';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-patient-view-main',
  templateUrl: './patient-view-main.component.html',
  styleUrls: ['./patient-view-main.component.css']
})

export class PatientViewMainComponent implements OnInit, OnChanges {

  public errorMsg: Message[] = [];
  @Input() patient: PatientModel;
  @Input() errorShow: boolean = false;
  martialStatusName: String;
  // @Input() patientId: number;
  public gender: Array<any> = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];
  public martialStatus: Array<any> = [
    { label: 'Single', value: 1 },
    { label: 'Married', value: 2 },
    { label: 'Divorsed', value: 3 },
    { label: 'Separated', value: 4 }
  ];
  constructor(public breadcrumbsService: BreadcrumbsService,
    private patientService: PatientService,
    private routeService: RouteService,
    public route: ActivatedRoute) { }


  ngOnInit() {


    // this.getDefaultParams();
  }
  ngOnChanges() {
    // let martialStatus = this.martialStatus.filter(res => {
    //   return res.value === this.patient.MaritalStatus;
    // })[0]
    // this.martialStatusName = martialStatus.label;
  }

  // getDefaultParams() {

  //   this.patient.Id = this.patientId;
  //   if (this.patient.Id) {
  //     this.getPatientById(this.patient.Id);
  //   } else {
  //     this.getPatientById(0);
  //   }
  // }

  // private getPatientById(patientId) {
  //   this.patientService.getPatientById(patientId).then((result) => {
  //     this.patient = result.data;
  //     if (this.patient.PatientGuarantorInfoData === null) {
  //       this.patient.PatientGuarantorInfoData = new PatientGuarantorInfo();
  //     }
  //     this.breadcrumbsService.breadcrumbs = this.patient.FirstName + ' ' + this.patient.LastName + ' / View';
  //   });
  // }
}
