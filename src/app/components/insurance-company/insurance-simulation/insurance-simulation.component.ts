import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { MasterService, CustomDDO } from '../../shared';
// import { OrderService } from '../shared';
// import { OrderModel, OrderTest, ProcessingLabDetail, NeoOrder, OrderSimulation } from '../shared/order.model';
import { Message, SelectItem } from 'primeng/primeng';
import { LocalStorageService } from '../../../core/shared/services/index';
import { LabService } from '../../lab/shared/lab.service';
import { SeletedStates, InsuranceSimulation, InsuranceSimulationDTO } from './shared/insurance-simulation.model';
import { InsuranceCompanyService } from '../shared/insurance-company.service';

@Component({
  selector: 'app-insurance-simulation',
  templateUrl: './insurance-simulation.component.html',
  styleUrls: ['./insurance-simulation.component.css']
})
export class InsuranceSimulationComponent implements OnInit {

  public multiStates: Array<any> = [];
  public insuranceSimulation = new InsuranceSimulation();
  public insuranceSimulationDTO = new InsuranceSimulationDTO();
  public filteredStatesMultiple: Array<any> = [];
  public filteredInsuranceMultiple: Array<any> = [];
  public states: Array<any> = [];
  public stateLength: number;
  public name: string;
  public insuranceStates: Array<any> = [];
  public insuranceCompanies: Array<any> = [];
  public multiSelectStates: Array<any> = [];
  public multiInsuranceCompany: Array<any> = [];
  public seletedStates: SeletedStates = new SeletedStates();
  public showState: boolean = false;
  public statePopupHeading: string = '';
  public insuranceFilter: string = '';
  public labFilter: string = '';
  constructor(
    private masterService: MasterService,
    public routeService: RouteService,
    private insuranceCompanyService: InsuranceCompanyService
  ) {
    this.getInsuranceCompanyDDO();
  }
  ngOnInit() {
    this.getStateDDOs();
  }


  filterStateMultiple(event) {
    let query = event.query;
    this.filteredStatesMultiple = this.filterState(query, this.states);
  }

  filterInsuranceCompanyMultiple(event) {
    let query = event.query;
    this.filteredInsuranceMultiple = this.filterInsurance(query, this.insuranceCompanies);
  }




  getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
    })
  }

  getInsuranceCompanyDDO() {
    this.insuranceCompanyService.getInsuranceCompany().then(res => {
      this.insuranceCompanies = res.data;
    });
  }

  removeState(state) {

    let index = this.multiStates.indexOf(state);
    if (index > -1) {
      this.multiStates.splice(index, 1);
      this.getInsuranceDetail();
    }
  }

  removeInsuranceCompany(insurance) {

    let index = this.multiInsuranceCompany.indexOf(insurance);
    if (index > -1) {
      this.multiInsuranceCompany.splice(index, 1);
      this.getInsuranceDetail();
    }
  }
  filterState(query, states: any[]): any[] {
    let filtered: any[] = [];

    states.map(state => {
      if (state.Name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(state);
      }
    })

    return filtered;
  }

  filterInsurance(query, insurances: any[]): any[] {
    let filtered: any[] = [];
    insurances.map(inssurance => {
      if (inssurance.CompanyName.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(inssurance);
      }
    })
    return filtered;
  }

  getInsuranceDetail() {
    this.makeInsuranceModelBlank();
    this.multiStates.map(res => {
      this.insuranceSimulation.States.splice(this.insuranceSimulation.States.length, -1, res.Id)
    })
    this.multiInsuranceCompany.map(insurance => {
      this.insuranceSimulation.InsuranceCompanyCodes.splice(this.insuranceSimulation.InsuranceCompanyCodes.length, -1,
        insurance.CompanyCode);
    })
    this.insuranceCompanyService.getInsuranceSimulation(this.insuranceSimulation)
      .then(insuranceSimulation => {
        this.insuranceSimulationDTO = insuranceSimulation.data;

      })
  }

  generateState(lab) {
    this.showState = true;
    this.insuranceStates = [];
    this.name = lab.Name;
    if (lab.States.length > 0) {
      let insuranceState;
      lab.States.map(stateId => {
        this.states.map(state => {
          if (state.Id === stateId) {
            this.insuranceStates.push(state);
          }
        })
      })
      this.stateLength = this.insuranceStates.length; 
    }
  }

  makeInsuranceModelBlank() {
    this.insuranceSimulationDTO = new InsuranceSimulationDTO();
    this.insuranceSimulation.States = [];
    this.insuranceSimulation.InsuranceCompanyCodes = [];
  }

  private cancel() {
    this.routeService.openRoute('order');
  }

  private showStateDetailBasedOnLab(lab, simulationType) {
    this.statePopupHeading = (simulationType === 'insurance') ? 'Insurance Company Name States For Insurance : '
    : 'Lab Operating Licensed States For Lab : ';
    this.generateState(lab);
  }
}



