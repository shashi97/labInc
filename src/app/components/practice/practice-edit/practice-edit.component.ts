import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { PracticeModel, PracticeService, NPIExists } from '../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO, MasterService } from '../../shared';
import { EmailValidateService } from '../../shared/services/email-validate.component';
import { LocalStorageService } from '../../../core/shared/services/index';
import { UserTypeEnum } from '../../../components/shared/enums/base.enum';
@Component({
  selector: 'app-practice-edit',
  templateUrl: './practice-edit.component.html',
  styleUrls: ['./practice-edit.component.css']
})

export class PracticeEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public practice: PracticeModel = new PracticeModel();
  public gender: Array<any> = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];
  public martialStatus: Array<any> = [{ label: 'Single', value: 'Single' }, { label: 'Married', value: 'Married' }];
  public relationshipList: Array<CustomDDO> = [];
  private practiceInsuranceCompanies: Array<any>;
  private isNPIexits: boolean = true;
  public npiExits: NPIExists = new NPIExists();
  public states: Array<CustomDDO> = [];
  public practiceTypes: Array<any> = [];
  public labs: Array<any> = [];
  public salesOffices: Array<any> = [];

  public user: any;
  public saleRepresentative: Array<any> = [];

  constructor(public breadcrumbsService: BreadcrumbsService,
    private practiceService: PracticeService,
    private masterService: MasterService,
    private localStorageService: LocalStorageService,
    private routeService: RouteService,
    public route: ActivatedRoute, private emailValidateService: EmailValidateService) { }

  ngOnInit() {
    this.getStateDDOs();
    this.getPracticeTypesDDO();
    this.getDefaultParams();
    this.user = this.localStorageService.getUserDetail();
    if (this.user.UserTypeId === UserTypeEnum.SalesOffice) {
      this.getLab();
      this.getSaleRepresentative();
    }
    if (this.user.UserTypeId === UserTypeEnum.Lab) {
      this.getSaleOffice();
    }
  }

  getLab() {
    this.practiceService.getLabDDOs().then(result => {
      this.labs = result.data;
      this.labs.map((item) => {
        item.label = item.LabName;
        item.value = item.LabId;
      })
    })
  }

  getSaleRepresentative() {
    this.practiceService.getSrDDOs(0).then(result => {
      this.saleRepresentative = result.data;
      this.saleRepresentative.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    })
  }
  getSaleOffice() {
    this.practiceService.getSODDOs().then(result => {
      this.salesOffices = result.data;
      this.salesOffices.map((item) => {
        item.label = item.SalesOfficeName;
        item.value = item.Id;
      })
    })
  }

  getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
    });
  }

  getDefaultParams() {

    this.practice.Id = this.route.snapshot.params['id'] || 0;
    if (this.practice.Id > 0) {
      this.getPracticeById(this.practice.Id);
      this.isNPIexits = false;

    } else {
      this.breadcrumbsService.breadcrumbs = 'Practice / New';
    }
  }

  private getPracticeById(practiceId) {
    this.practiceService.getPracticeById(practiceId).then((result) => {
      this.practice = result.data;
      this.breadcrumbsService.breadcrumbs = this.practice.Name + ' / Edit';
      this.onSalesOfficeSelect();
    });
  }
  private getPracticeTypesDDO() {
    this.practiceService.getPracticeTypesDDO().then((result) => {
      this.practiceTypes = result.data;
      this.practiceTypes.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    });
  }

  private onSalesOfficeSelect() {
    this.practiceService.getSrDDOs(this.practice.SalesOfficeId).then((result) => {
      this.saleRepresentative = result.data;
      this.saleRepresentative.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    });
  }

  public onBlurNPI() {
    if (this.practice.NPI.length === 10) {
      this.practiceService.findNPI(this.practice.NPI, this.practice.Id).then(res => {
        this.npiExits = res.data;
        if (this.npiExits.Flag === 1) {
          this.practice.Name = this.npiExits.Message;
        } else {
          this.practice.Name = '';
        }
      })
    }
  }

  // private getInsuranceDDO() {
  //   this.practiceService.getInsuranceDDO().then((result) => {
  //     this.practiceInsuranceCompanies = result.data;
  //     this.practiceInsuranceCompanies.map((item) =>{
  //       item.label = item.CompanyName;
  //       item.value = item.Id;
  //    })
  //   });
  // }
  showErrorMessage(message) {
    this.errorMsg.push({
      severity: 'error',
      detail: message
    });
  }
  public save(isValid) {
    let message = ''
    if (!isValid) {
      if (this.practice.Email !== '') {
        if (!this.emailValidateService.validateEmail(this.practice.Email)) {
          message = 'Email Id Not Valid';
          this.showErrorMessage(message);
          return
        }
      } else {
        message = 'Please Fill All Required Field';
        this.showErrorMessage(message);
        return
      }
    }
    if (this.practice.Id !== 0 && !this.practice.Password) {
      this.practice.Password = '';
    }
    if (this.practice.Id !== 0 && !this.practice.ConfirmPassword) {
      this.practice.ConfirmPassword = '';
    }

    // if (this.practice.Email === '') {
    //   this.errorMsg.push({
    //     severity: 'error',
    //     detail: 'Please Enter Email Id. '
    //   });
    //   return;
    // }
    if (this.user.UserTypeId == 4) {
      if (!this.practice.LabId) {
        this.errorMsg.push({
          severity: 'error',
          detail: 'Please Select Lab.'
        });
        return;
      }
      if (!this.practice.SalesRepresentativeId) {
        this.errorMsg.push({
          severity: 'error',
          detail: 'Please Select Sales Representative.'
        });
        return;
      }
    }
    if (this.practice.Latitude == null || this.practice.Longitude == null) {
      message = 'Please Fill All Required Field';
      this.showErrorMessage(message)
      return;
    }

    if (this.practice.Id === 0 && this.practice.Password === '') {
      this.errorMsg.push({
        severity: 'error',
        detail: 'Please Enter Password.'
      });
      return;
    }
    if (this.practice.Id === 0 && this.practice.ConfirmPassword === '') {
      this.errorMsg.push({
        severity: 'error',
        detail: 'Please Enter Confirm Password.'
      });
      return;
    }


    if (this.practice.Password !== this.practice.ConfirmPassword) {
      this.errorMsg.push({
        severity: 'error',
        detail: 'Password does not match the confirm password.'
      });
      return;
    }
    // if (this.practice.PracticeTypeId == null || this.practice.PracticeTypeId == 0) {
    //   this.errorMsg.push({
    //     severity: 'error',
    //     detail: 'Please Select Practice Type.'
    //   });
    //   return;
    // }

    // if (!this.emailValidateService.validateEmail(this.practice.Email)) {
    //   this.errorMsg.push({
    //     severity: 'error',
    //     summary: 'Warn Message', detail: 'Email Id Not Valid'
    //   });
    //   return;
    // }
    if (this.practice.NPI.length !== 10) {
      return;
    }
    this.practiceService.savePractice(this.practice).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.routeService.openRoute('practice');
    });
  }

  public cancel(): void {
    this.routeService.openRoute('practice');
  }
}
