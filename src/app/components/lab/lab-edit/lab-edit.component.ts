import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { LabModel, LabService, LabStates } from '../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO, MasterService } from './../../shared';
import { EmailValidateService } from '../../shared/services/email-validate.component'


@Component({
  selector: 'app-lab-edit',
  templateUrl: './lab-edit.component.html',
  styleUrls: ['./lab-edit.component.css']
})

export class LabEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public lab: LabModel = new LabModel();
  public states: Array<CustomDDO> = [];
  public gender: Array<any> = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];
  public martialStatus: Array<any> = [{ label: 'Single', value: 'Single' }, { label: 'Married', value: 'Married' }];
  private emailPattern = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
  private LabInsuranceCompanies: Array<any>;
  LabComplexities: Array<any>;
  public InsuranceStateLevel;
  public LabStateLevel;
  public InsuranceCompanyStates;
  private labStates: Array<any> = [];
  public filteredStatesMultiple: Array<any> = [];
  public multiStates: Array<any> = [];

  constructor(public breadcrumbsService: BreadcrumbsService,
    private LabService: LabService,
    private routeService: RouteService,
    private masterService: MasterService,
    public route: ActivatedRoute, private emailValidateService: EmailValidateService) {
  }

  ngOnInit() {
    this.getStateDDOs();
    this.getInsuranceDDO();
    this.getLabComplexities();
  }

  getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
      this.getDefaultParams();
    });
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Add Lab';
    this.lab.Id = this.route.snapshot.params['labId'] || 0;
    // this.lab.Id = this.route.snapshot.params['id'] || 0;
    if (this.lab.Id > 0) {
      this.getLabById(this.lab.Id);
    } else {
      this.breadcrumbsService.breadcrumbs = 'Lab / New';
    }
  }

  public fileChangeEvent(fileInput: any) {
    let FR = new FileReader();
    FR.onload = (e) => {
      this.lab.Icon = fileInput.target.files[0].name;
      this.lab.Icon = (e.target as any).result;
    };
    FR.readAsDataURL(fileInput.target.files[0]);
  }

  private getLabById(labId) {
    this.LabService.getLabById(labId).then((result) => {
      this.lab = result.data;
      this.LabStateLevel = this.lab.LabLicenseStateLevel;
      this.labStates = this.lab.StateIds;
      this.breadcrumbsService.breadcrumbs = this.lab.Name + ' / Edit';
    });
  }

  private filterStateMultiple(event) {
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

  private getInsuranceDDO() {
    this.LabService.getInsuranceDDO().then((result) => {
      this.LabInsuranceCompanies = result.data;
      this.LabInsuranceCompanies.map((item) => {
        item.label = item.CompanyName;
        item.value = item.Id;
      })
    });
  }

  public getLabComplexities(): void {
    this.LabService.getLabComplexityDDO().then(res => {
      this.LabComplexities = res.data;
      this.LabComplexities.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    });
  }
  showErrorMessage(message) {
    this.errorMsg.push({
      severity: 'error',
      detail: message
    });
  }

  public save(isValid) {
    let message = ''
    if (!isValid) {
      if (this.lab.Email !== '') {
        if (!this.emailValidateService.validateEmail(this.lab.Email)) {
          message = 'Email Id Not Valid';
          this.showErrorMessage(message)
          return
        }
      } else {
        message = 'Please Fill All Required Field';
        this.showErrorMessage(message);
        return
      }
    }
    if (this.lab.Id !== 0 && !this.lab.Password) {
      this.lab.Password = '';
    }
    if (this.lab.Id !== 0 && !this.lab.ConfirmPassword) {
      this.lab.ConfirmPassword = '';
    }

    if (this.lab.Id === 0 && (this.lab.Password === '' || this.lab.ConfirmPassword === '')) {
      message = 'Please Enter Password And Confirm'
      this.showErrorMessage(message);
      return;
    }

    if (this.lab.Id === 0 && (this.lab.Password.length < 4 || this.lab.ConfirmPassword.length < 4)) {
      message = 'Password Length Should be Minimum 4 letters'
      this.showErrorMessage(message);
      return;
    }

    if (this.lab.Password !== this.lab.ConfirmPassword) {
      message = 'Password And Confirm Password Should Be Same.'
      this.showErrorMessage(message);
      return;
    }
    if (this.lab.Latitude == null || this.lab.Longitude == null) {
      message = 'Please Fill All Required Field';
      this.showErrorMessage(message)
      return;
    }

    if (this.lab.LabLicenseStateLevel == 3 && (this.lab.StateIds.length == this.states.length || this.lab.StateIds.length == 0)) {
      message = 'Please Select National Lab Location Because You Have Not Seleted Any Except States';
      this.showErrorMessage(message);
      return
    }
    if (this.lab.LabLicenseStateLevel == 1 && this.lab.StateIds.length == 0) {
      message = 'Please Select Multi State Lab Location';
      this.showErrorMessage(message);
      return
    }
    if (this.lab.LabLicenseStateLevel == 0 && (!this.lab.StateIds || this.lab.StateIds.length == 0)) {
      message = 'Please Select Lab Operating Licensed State';
      this.showErrorMessage(message);
      return
    }
    this.LabService.saveLab(this.lab).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.routeService.openRoute('lab');
    });
  }

  public cancel(): void {
    this.routeService.openRoute('lab');
  }
  onStateChange(value) {
    this.lab.LabLicenseStateLevel = value.InsuranceStateType;
    this.lab.StateIds = value.InsuranceCompanyStates;
  }
}
