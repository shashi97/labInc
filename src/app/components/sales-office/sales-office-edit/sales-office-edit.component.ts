import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { SalesOfficeModel, SalesOfficeService } from '../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO, MasterService } from './../../shared';
import { LocalStorageService } from '../../../core/shared/services/index';
import { PaginationEnum, UserTypeEnum } from '../../shared/enums';
import { EmailValidateService } from '../../shared/services/email-validate.component'


@Component({
  selector: 'app-sales-office-edit',
  templateUrl: './sales-office-edit.component.html',
  styleUrls: ['./sales-office-edit.component.css']
})

export class SalesOfficeEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public salesOffice: SalesOfficeModel = new SalesOfficeModel();
  public states: Array<CustomDDO> = [];
  public salesOffices: Array<SalesOfficeModel> = [];
  public type: string;
  public userType: string = '';
  public SalesOfficeName: any;
  public isSalesOfficeFind: boolean = false;
  public salesOfficeSuggestions: Array<any> = [];
  public saleOfficeId: number = 0;
  public gender: Array<any> = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];
  public martialStatus: Array<any> = [{ label: 'Single', value: 'Single' }, { label: 'Married', value: 'Married' }];
  private emailPattern = '[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'

  constructor(public breadcrumbsService: BreadcrumbsService,
    private salesOfficeService: SalesOfficeService,
    private routeService: RouteService,
    private masterService: MasterService,
    private localStorageService: LocalStorageService,
    public route: ActivatedRoute, private emailValidateService: EmailValidateService) {

  }

  ngOnInit() {
    let user = this.localStorageService.getUserDetail();
    if (user.UserTypeId === UserTypeEnum.Lab) {
      this.userType = 'lab';
    }
    if (user.UserTypeId === UserTypeEnum.InNetwork) {
      this.userType = 'inNetwork';
    }
    this.getStateDDOs();

  }

  getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
      this.getAllSalesOffice();

    });
  }

  getAllSalesOffice() {
    this.salesOfficeService.getSalesOfficeDDO().then(res => {
      this.salesOffices = res.data.Data;
      this.getDefaultParams();
    })
  }

  private getSalesOfficeSearch() {

    this.salesOfficeService.searchSaleOffice(this.salesOffice.SalesOfficeName).then((result) => {
      // this.salesOfficeSuggestions = result.data;
      this.salesOfficeSuggestions = [];
      result.data.map(res => {
        this.salesOfficeSuggestions.splice(this.salesOfficeSuggestions.length, 0, res.SalesOfficeName);
      })
    });
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Add Sales Office';
    this.salesOffice.Id = this.route.snapshot.params['salesOfficeId'] || 0;
    this.saleOfficeId = this.salesOffice.Id;
    this.type = this.route.snapshot.params['type'] || '';
    // this.salesOffice.Id = this.route.snapshot.params['id'] || 0;
    if (this.salesOffice.Id > 0) {
      this.getSalesOfficeById(this.salesOffice.Id);
    } else {
      this.breadcrumbsService.breadcrumbs = 'Sales Office / New';
    }
  }



  onSaleOfficeSelect(e) {
    this.salesOfficeService.getSalesOfficeByName(e).then(result => {
      this.salesOffice = result.data;

      this.makeDisableField();
    })
  }

  private getSalesOfficeById(salesOfficeId) {
    this.salesOfficeService.getSalesOfficeById(salesOfficeId).then((result) => {
      this.salesOffice = result.data;
      this.breadcrumbsService.breadcrumbs = this.salesOffice.SalesOfficeName + ' / Edit';
       this.makeDisableField();

    });
  }


  makeDisableField() {
    if (this.userType === 'lab') {
      this.isSalesOfficeFind = true;
    }
    if (this.userType === 'inNetwork') {
      this.isSalesOfficeFind = false;
    }
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
      if (this.salesOffice.Email !== '') {
        if (!this.emailValidateService.validateEmail(this.salesOffice.Email)) {
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
    if (this.salesOffice.Id !== 0 && !this.salesOffice.Password) {
      this.salesOffice.Password = '';
    }
    if (this.salesOffice.Id !== 0 && !this.salesOffice.ConfirmPassword) {
      this.salesOffice.ConfirmPassword = '';
    }

    if (this.salesOffice.Id === 0 && (this.salesOffice.Password === '' || this.salesOffice.ConfirmPassword === '')) {
      message = 'Please Enter Password And Confirm'
      this.showErrorMessage(message);
      return;
    }

    if (this.salesOffice.Id === 0 && (this.salesOffice.Password.length < 4 || this.salesOffice.ConfirmPassword.length < 4)) {
      message = 'Password Length Should be Minimum 4 letters'
      this.showErrorMessage(message);
      return;
    }

    if (this.salesOffice.Password !== this.salesOffice.ConfirmPassword) {
      message = 'Password And Confirm Password Should Be Same.'
      this.showErrorMessage(message);
      return;
    }


    this.salesOfficeService.saveSalesOffice(this.salesOffice).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      if (this.type === 'lab') {
        this.routeService.openRoute('salesOffice/lab');
      }
      if (this.type === '') {
        this.routeService.openRoute('salesOffice');
      }
    });
  }

  public cancel(): void {
    if (this.type === 'lab') {
      this.routeService.openRoute('salesOffice/lab');
    }
    if (this.type === '') {
      this.routeService.openRoute('salesOffice');
    }
  }
}
