import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { PatientModel, PatientGuarantorInfo, PatientService } from '../shared';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})

export class PatientViewComponent implements OnInit {

  public errorMsg: Message[] = [];
  public patient: PatientModel = new PatientModel();
  public martialStatusName: string;
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
    this.getDefaultParams();
  }

  getDefaultParams() {

    this.patient.Id = this.route.snapshot.params['id'];
    if (this.patient.Id === 0) {
      this.breadcrumbsService.breadcrumbs = 'Patient / New';
    }
    if (this.patient.Id) {
      this.getPatientById(this.patient.Id);
    } else {
      this.getPatientById(0);
    }
  }

  private getPatientById(patientId) {
    this.patient = new PatientModel();
    this.patientService.getPatientById(patientId).then((result) => {
      this.patient = result.data;
      if (this.patient.PatientGuarantorInfoData === null) {
        this.patient.PatientGuarantorInfoData = new PatientGuarantorInfo();
      }
      this.breadcrumbsService.breadcrumbs = this.patient.FirstName + ' ' + this.patient.LastName + ' / View';
    });
  }

  editPatient() {
    this.routeService.openRoute('patient/' + this.patient.Id + '/edit');
  }

  public cancel(): void {
    this.routeService.openRoute('patient');
  }
}
