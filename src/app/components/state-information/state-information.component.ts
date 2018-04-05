import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SeletedStates } from './index';
import { RouteService, PaginationService } from '../../shared';
import { MasterService, CustomDDO } from '../shared';
@Component({
  selector: 'state-information',
  templateUrl: './state-information.component.html',
  styleUrls: ['./state-information.component.css']
})
export class StateInformationComponent implements OnInit {
  @Output() onStateChange: EventEmitter<any> = new EventEmitter();
  @Input() InsuranceStateLevel;
  @Input() InsuranceCompanyStates;
  public locationState: number = 0;
  public states: Array<CustomDDO> = [];
  public selectedLocation: string = '0';
  public insuranceCompanyTypeDDOs: Array<CustomDDO> = [];
  public multiStates: Array<any> = [];
  public multiSelectStates: Array<any> = [];
  public seletedStates: SeletedStates = new SeletedStates();
  public filteredStatesMultiple: Array<any> = [];
  constructor(
    private masterService: MasterService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.getStateDDOs();
    this.selectedLocation = this.InsuranceStateLevel || 0;
    this.seletedStates.InsuranceStateType = parseInt(this.selectedLocation, 10);
  }

  statesSelection() {
    if (this.InsuranceCompanyStates && this.selectedLocation == '0') {
      this.locationState = this.InsuranceCompanyStates[0];
    }
    if (this.selectedLocation == '1') {
      this.InsuranceCompanyStates.forEach(element => {
        this.states.forEach(item => {
          if (element == item.value) {
            this.multiStates.push(item);
          }
        });
      });
    }
    if (this.selectedLocation == '3') {
      this.multiSelectStates = this.states;
      if (this.InsuranceCompanyStates.length > 0) {
        this.multiSelectStates.forEach(element => {
          let index = 0;
          this.InsuranceCompanyStates.forEach(item => {
            if (element.Id === item) {
              index++;
            }
          });
          if (index === 0) {
            this.multiStates.splice(this.multiStates.length, 0, element)
          }
        });
      }
    }

  }

  filterState(query, states: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < states.length; i++) {
      let state = states[i];
      if (state.Name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(state);
      }
    }
    return filtered;
  }
  filterStateMultiple(event) {
    let query = event.query;
    this.filteredStatesMultiple = this.filterState(query, this.states);
  }
  selectLocation(item) {
    if (item === '0') {
      this.locationState = this.seletedStates[0].StateId;
    } else if (item === '1') {
      let states: Array<any> = [];
      this.states.forEach(state => {
        this.seletedStates.InsuranceCompanyStates.forEach(insuranceState => {
          if (state.value === insuranceState.StateId) {
            states.push(state);
          }
        });
      });
      this.multiStates = states;
    }
  }
  afterSelectState(selectedState) {
    if (selectedState) {
      this.multiStates = this.multiStates.filter(item => item.Id !== selectedState.Id)
    }
    this.seletedStates.InsuranceCompanyStates = this.multiStates;
    if (this.seletedStates.InsuranceStateType == 3) {
      this.multiSelectStates = [];
      this.multiSelectStates = this.states;
      this.seletedStates.InsuranceCompanyStates.forEach(element => {
        this.multiSelectStates = this.multiSelectStates.filter(item => item.Id !== element.Id);
      });
    }
    let refinedStateList: Array<any> = [];
    if (this.seletedStates.InsuranceStateType == 1) {
      this.multiSelectStates = this.seletedStates.InsuranceCompanyStates;
    }
    this.multiSelectStates.forEach(element => {
      refinedStateList.push(element.Id);
    });
    this.seletedStates.InsuranceCompanyStates = refinedStateList;
    this.onStateChange.emit(this.seletedStates);
  }
  onChangeLocation(value) {
    this.selectedLocation = value;
    this.multiStates = [];
    this.seletedStates = new SeletedStates();
    this.seletedStates.InsuranceStateType = value;
    this.onStateChange.emit(this.seletedStates);
  }

  getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
      this.companyTypeDDOs();
      this.statesSelection();
    })
  }
  onStateSelect() {
    this.seletedStates.InsuranceStateType = parseInt(this.selectedLocation, 10);
    let locationState: any[] = [];
    // let obj = {
    //   StateId: ''
    // }
    // locationState.splice(0, 0, obj)
    locationState[0] = this.locationState;
    this.seletedStates.InsuranceCompanyStates = locationState;
    this.onStateChange.emit(this.seletedStates);
  }
  companyTypeDDOs() {
    this.masterService.companyTypeDDOs().then((result) => {
      this.insuranceCompanyTypeDDOs = Array<CustomDDO>();
      this.insuranceCompanyTypeDDOs = result;
    });
  }
}
