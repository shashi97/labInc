import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { InsuranceCompanyModel, InsuranceCompanyService, InsuranceCompanyStates } from '../shared';
import { Message } from 'primeng/primeng';
import { MasterService, CustomDDO } from '../../shared';
import { EmailValidateService } from '../../shared/services/email-validate.component'

@Component({
  selector: 'app-insurance-company-edit',
  templateUrl: './insurance-company-edit.component.html',
  styleUrls: ['./insurance-company-edit.component.css']
})

export class InsuranceCompanyEditComponent implements OnInit {

  public errorMessage: Message[] = [];
  public insurance: InsuranceCompanyModel = new InsuranceCompanyModel();
  public insuranceCompanyTypeDDOs: Array<CustomDDO> = [];
  public states: Array<CustomDDO> = [];
  public selectedLocation: string = '0';
  public filteredStatesMultiple: Array<any> = [];
  public multiStates: Array<any> = [];
  public tradingPartnerDDOs: Array<any> = [];
  public locationState: number = 0;
  public InsuranceStateLevel: number;
  public InsuranceCompanyStates;


  constructor(public breadcrumbsService: BreadcrumbsService,
    private insuranceCompanyService: InsuranceCompanyService,
    private masterService: MasterService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    private emailValidateService: EmailValidateService) { }

  ngOnInit() {
    this.getStateDDOs();
    this.getTradingPartnerDDOs();
  }

  getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
      this.companyTypeDDOs();
    })
  }

  companyTypeDDOs() {
    this.masterService.companyTypeDDOs().then((result) => {
      this.insuranceCompanyTypeDDOs = new Array<CustomDDO>();
      this.insuranceCompanyTypeDDOs = result;
      this.getDefaultParams();
    });
  }
  getTradingPartnerDDOs() {
    this.insuranceCompanyService.getTradingPartnerDDOs().then((result) => {
      this.tradingPartnerDDOs = result.data;
      this.tradingPartnerDDOs.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    });
  }

  getDefaultParams() {
    this.insurance.Id = this.route.snapshot.params['id'] || 0;
    if (this.insurance.Id === 0) {
      this.breadcrumbsService.breadcrumbs = ' Insurance Company / New';
    }
    if (this.insurance.Id) {
      this.getInsuranceById(this.insurance.Id);
    }
  }

  private getInsuranceById(insuranceId) {
    this.insuranceCompanyService.getInsuranceById(insuranceId).then((result) => {
      this.insurance = result.data;
      this.InsuranceStateLevel = this.insurance.InsuranceStateLevel;
      this.InsuranceCompanyStates = this.insurance.StateIds;
      this.selectedLocation = this.insurance.InsuranceStateLevel.toString();
      // this.selectLocation(this.selectedLocation);
      this.breadcrumbsService.breadcrumbs = this.insurance.CompanyName + ' / ' + this.insurance.CompanyCode  + ' / Edit';
    });
  }

  // selectLocation(item) {
  //   if (item === '0') {
  //     this.locationState = this.insurance.InsuranceCompanyStates[0].StateId;
  //   } else if (item === '1') {
  //     let states: Array<any> = [];
  //     this.states.forEach(state => {
  //       this.insurance.InsuranceCompanyStates.forEach(insuranceState => {
  //         if (state.value === insuranceState.StateId) {
  //           states.push(state);
  //         }
  //       });
  //     });
  //     this.multiStates = states;
  //   }
  // }

  private onChangeLocation(value) {
    this.selectedLocation = value;
  }

  filterStateMultiple(event) {
    let query = event.query;
    // this.countryService.getCountries().then(states => {
    this.filteredStatesMultiple = this.filterState(query, this.states);
    // });
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

  showErrorMessage(message) {
    this.errorMessage.push({
      severity: 'error',
      detail: message
    });
  }

  public save(isValid) {
    let message = ''
    if (isValid) {
      if (this.insurance.Email && this.insurance.Email !== '') {
        if (!this.emailValidateService.validateEmail(this.insurance.Email)) {
          message = 'Email Id Not Valid';
          this.showErrorMessage(message);
          return

        }
      }
    } else {
      message = 'Please Fill All Required Field';
      this.showErrorMessage(message);
      return
    }


    if (this.insurance.InsuranceStateLevel == 3 &&
      (this.insurance.StateIds.length == this.states.length || this.insurance.StateIds.length == 0)) {
      message = 'Please Select National Insurance Location Because You Have Not Seleted Any Except States';
      this.showErrorMessage(message);
      return
    }
    if (this.insurance.InsuranceStateLevel == 1 && this.insurance.StateIds.length == 0) {
      message = 'Please Select Multi State Insurance Location';
      this.showErrorMessage(message);
      return
    }
    if (this.insurance.InsuranceStateLevel == 0 && (!this.insurance.StateIds || this.insurance.StateIds.length == 0)) {
      message = 'Please Select Insurance Company Licensed State';
      this.showErrorMessage(message);
      return
    }
    this.insuranceCompanyService.saveInsurance(this.insurance).then((res) => {
      this.cancel();
    });
  }

  public cancel(): void {
    this.routeService.openRoute('insurance/companies');
  }
  onStateChange(value) {
    this.insurance.InsuranceStateLevel = value.InsuranceStateType;
    this.insurance.StateIds = value.InsuranceCompanyStates;
  }
}
