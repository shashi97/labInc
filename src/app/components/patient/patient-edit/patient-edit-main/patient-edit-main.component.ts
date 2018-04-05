import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../../core/shared/services';
import { RouteService } from './../../../../shared';
import { PatientModel, PatientService } from '../../shared';
import { MasterService, CustomDDO } from '../../../shared';
import { Message } from 'primeng/primeng';



@Component({
  selector: 'app-patient-edit-main',
  templateUrl: './patient-edit-main.component.html',
  styleUrls: ['./patient-edit-main.component.css']
})

export class PatientEditMainComponent implements OnInit {

  @Input() patient: PatientModel;
  @Input() labelWidth: boolean;
  @Input() isPatientErr: boolean = false;
  public errorMsg: Message[] = [];
  public currentYear: number;
  // public patient: PatientModel = new PatientModel();
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

  constructor(public breadcrumbsService: BreadcrumbsService,
    private patientService: PatientService,
    private masterService: MasterService,
    private routeService: RouteService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.getStateDDOs();
    this.getRelationshipList();
    let year = new Date();
    this.currentYear = year.getFullYear();

  }

  getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
    })
  }
  save(val) {

  }
  getRelationshipList() {
    this.patientService.getGuarantorRelation().then(result => {
      let results: any = result.data;
      results.map((item) => {
        let obj = { label: item.Name, value: item.Id };
        this.relationshipList.push(obj);
      });
    });
  }

  myStyles() {
    return {
      'padding-right': this.labelWidth === true ? '1%' : ''
    }
  }

}
