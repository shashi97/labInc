import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { SalesRepresentativeModel, SalesRepresentativeService } from '../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO, MasterService } from './../../shared';
import { EmailValidateService } from '../../shared/services/email-validate.component'
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'app-sales-representative-edit',
  templateUrl: './sales-representative-edit.component.html',
  styleUrls: ['./sales-representative-edit.component.css']
})

export class SalesRepresentativeEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public salesRepresentative: SalesRepresentativeModel = new SalesRepresentativeModel();
  public states: Array<CustomDDO> = [];
  public gender: Array<any> = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];
  public martialStatus: Array<any> = [{ label: 'Single', value: 'Single' }, { label: 'Married', value: 'Married' }];
  private emailPattern = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

  constructor(public breadcrumbsService: BreadcrumbsService,
    private salesRepresentativeService: SalesRepresentativeService,
    private routeService: RouteService,
    private masterService: MasterService,
    private localStorageService: LocalStorageService,
    public route: ActivatedRoute, private emailValidateService: EmailValidateService) {

  }

  ngOnInit() {
    this.getDefaultParams();
    this.getStateDDOs();
  }

  getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
    });
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Add Sales Representative';
    this.salesRepresentative.Id = this.route.snapshot.params['salesRepresentativeId'] || 0;
    // this.salesRepresentative.Id = this.route.snapshot.params['id'] || 0;
    if (this.salesRepresentative.Id > 0) {
      this.getSalesRepresentativeById(this.salesRepresentative.Id);
    } else {
      this.breadcrumbsService.breadcrumbs = 'Sales Representative / New';
    }
  }

  // public fileChangeEvent(fileInput: any) {
  //   let FR = new FileReader();
  //   FR.onload = (e) => {
  //     this.salesRepresentative.Icon = fileInput.target.files[0].name;
  //     this.salesRepresentative.Icon = (e.target as any).result;
  //   };
  //   FR.readAsDataURL(fileInput.target.files[0]);
  // }

  private getSalesRepresentativeById(salesRepresentativeId) {
    this.salesRepresentativeService.getSalesRepresentativeById(salesRepresentativeId).then((result) => {
      this.salesRepresentative = result.data;
      this.breadcrumbsService.breadcrumbs = this.salesRepresentative.Name + ' / Edit';
    });
  }

  // private getInsuranceDDO() {
  //   this.salesRepresentativeService.getInsuranceDDO().then((result) => {
  //     this.salesRepresentativeInsuranceCompanies = result.data;
  //     this.salesRepresentativeInsuranceCompanies.map((item) => {
  //       item.salesRepresentativeel = item.CompanyName;
  //       item.value = item.Id;
  //     })
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
      if (this.salesRepresentative.Email !== '') {
        if (!this.emailValidateService.validateEmail(this.salesRepresentative.Email)) {
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
    if (this.salesRepresentative.Id !== 0 && !this.salesRepresentative.Password) {
      this.salesRepresentative.Password = '';
    }
    if (this.salesRepresentative.Id !== 0 && !this.salesRepresentative.ConfirmPassword) {
      this.salesRepresentative.ConfirmPassword = '';
    }

    if (this.salesRepresentative.Id === 0 && (this.salesRepresentative.Password === '' || this.salesRepresentative.ConfirmPassword === '')) {
      message = 'Please Enter Password And Confirm'
      this.showErrorMessage(message);
      return;
    }

    if (this.salesRepresentative.Id === 0 && (this.salesRepresentative.Password.length < 4 || this.salesRepresentative.ConfirmPassword.length < 4)) {
      message = 'Password Length Should be Minimum 4 letters'
      this.showErrorMessage(message);
      return;
    }

    if (this.salesRepresentative.Password !== this.salesRepresentative.ConfirmPassword) {
      message = 'Password And Confirm Password Should Be Same.'
      this.showErrorMessage(message);
      return;
    }
    // let user = this.localStorageService.getUserDetail();
    // if (user.UserTypeId == 4) {
    //   this.salesRepresentative.SalesOfficeId = user.LinkedTableId;
    // }

    this.salesRepresentativeService.saveSalesRepresentative(this.salesRepresentative).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.routeService.openRoute('salesRepresentative');
    });
  }

  public cancel(): void {
    this.routeService.openRoute('salesRepresentative');
  }
}
