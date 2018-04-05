import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { Message, ConfirmationService } from 'primeng/primeng';
import { FeeSchedule, FeeScheduleService, StateModel } from './shared';
import { LabService } from '../shared';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fee-schedule',
  templateUrl: './fee-schedule.component.html',
  styleUrls: ['./fee-schedule.component.css']
})

export class FeeScheduleComponent implements OnInit {
  private highlightedDiv: number;
  private datePipe = new DatePipe('en-US');
  public message: Message[] = [];
  public showStatePopup: boolean = false;
  public feeSchedules: Array<FeeSchedule> = new Array<FeeSchedule>();
  private labInsuranceId: number = 0;
  private labInsuranceStates: Array<any> = [];
  private states: Array<StateModel> = [];
  private stateIndex: number = 0;
  public currentYear:number;
  constructor(public breadcrumbsService: BreadcrumbsService,
    private routeService: RouteService,
    private labService: LabService,
    private feeScheduleService: FeeScheduleService,
    private confirmationService: ConfirmationService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.getDefaultParams();
  }

  getDefaultParams(): void {
    this.breadcrumbsService.breadcrumbs = 'Insurance Contract / Fee Schedule';
    this.labInsuranceId = this.route.snapshot.params['labInsuranceId'];
    var year = new Date();
    this.currentYear= year.getFullYear() + 10;
    this.breadcrumbData();
    this.getStateListBasedOnInsurance();
  }

  getStateListBasedOnInsurance(): void {
    this.feeScheduleService.getStatesBasedOnInsurnace(this.labInsuranceId).then(res => {
      this.labInsuranceStates = res.data;
      if (this.labInsuranceStates.length !== 0) {
        this.getFeeScheduleById(this.labInsuranceStates[this.stateIndex].Id);
        this.highlightedDiv = this.stateIndex;
      } else {
        this.feeSchedules = new Array<FeeSchedule>();
      }
    })

  }

  breadcrumbData(): void {
    this.labService.breadcrumbData(this.labInsuranceId).then((res) => {
      let obj: any = res.data;
      this.breadcrumbsService.breadcrumbs = 'Insurance Contract / ' + obj.CompanyName + ' / Fee Schedule';
    });
  }

  getFeeScheduleById(Id: number): void {
    this.feeScheduleService.getFeeScheduleById(Id).then((res) => {
      this.feeSchedules = res.data;
      this.feeSchedules.forEach(fee => {
        fee.LabInsuranceStateId = Id;
        fee.LabInsuranceId = this.labInsuranceId;
        fee.EffectiveDate = this.datePipe.transform(fee.EffectiveDate, 'MM/dd/yyyy');
        fee.ExpirationDate = this.datePipe.transform(fee.ExpirationDate, 'MM/dd/yyyy');
      });
    });
  }

  save(): void {
    // this.feeSchedules.forEach(element => {
    //   return this.datePipe.transform(element.EffectiveDate, 'MM/dd/yyyy') &&
    // });
    this.feeScheduleService.saveFeeSchedule(this.feeSchedules).then((res) => {

      this.message.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.getStateListBasedOnInsurance();
      // this.routeService.openRoute('lab/labinsurance');
    });
  }

  cancel(): void {
    this.routeService.openRoute('lab/labinsurance');
  }

  onSelectState(newValue: number, state: StateModel): void {
  //  if (this.highlightedDiv === newValue) {
  //    this.highlightedDiv = 0;
 //   } else {
      this.highlightedDiv = newValue;
 //   }
    this.stateIndex = newValue;
    this.getFeeScheduleById(state.Id);
  }

  addState(): void {
    // this.feeScheduleService.getStateList().then(res => {
    //   this.states = res.data;
    // })


    this.feeScheduleService.getStates(this.labInsuranceId).then(res => {
      this.states = res.data;
      this.showStatePopup = true;
    })

  }

  saveState(): void {
    let states = [];
    this.states.map(res => {
      if (res.isChecked) {
        states.splice(states.length, -1, { Id: 0, LabInsuranceId: this.labInsuranceId, StateId: res.StateId })
      }
    });

    this.feeScheduleService.saveSelectedState(states).then((res) => {
      this.showStatePopup = false;
      this.getStateListBasedOnInsurance();
    });

  }

  deleteStateById(state, e): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + state.State + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.feeScheduleService.deleteStatesById(state.Id).then(result => {
          this.stateIndex = 0;
          this.getStateListBasedOnInsurance();
        })
      },
    });
    if (!e) { e = window.event };
    e.cancelBubble = true;
    if (e.stopPropagation) { e.stopPropagation() };
  }

}
