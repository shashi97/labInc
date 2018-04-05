import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { BillingCodeModel, BillingCodeService } from './../shared';
import { CustomDDO } from './../../shared/models/custom-ddo.model';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'billing-code-edit',
  templateUrl: './billing-code-edit.component.html',
  styleUrls: ['./billing-code-edit.component.css']
})

export class BillingCodeEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public billingCode: BillingCodeModel = new BillingCodeModel();
  public tests: Array<any>;
  public CPTCodeSuggestion: Array<any>;
  public component: string = '';
  public testMenuType: number = 1;

  constructor(public breadcrumbsService: BreadcrumbsService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public billingCodeService: BillingCodeService) { }

  ngOnInit() {
    this.getDefaultParams();
    // this.getTestingMenuDDO();
  }

  getDefaultParams() {
    this.component = this.route.snapshot.url[0].path;
    this.breadcrumbsService.breadcrumbs = 'Individual Test / New';
    this.billingCode.Id = this.route.snapshot.params['id'] || 0;
    if (this.billingCode.Id > 0) {
      this.getBillingCodeById(this.billingCode.Id);
    }

    this.billingCode.BillingCodeTestTypeId = this.testMenuType;
    if (this.component === 'group') {
      this.testMenuType = 2;
      this.billingCode.BillingCodeTestTypeId = this.testMenuType;
      this.breadcrumbsService.breadcrumbs = 'Group Test / New';
    }
    if (this.billingCode.Id === 0) {
      this.getTests();
    }
  }

  private getBillingCodeById(billingId) {
    this.billingCodeService.getBillingCodeById(billingId).then((result) => {
      this.billingCode = result.data;
      this.getTests();
      
    });
  }

  public getTests() {
    if (this.billingCode.BillingCodeTestTypeId === 1) {
      this.getTestingMenuDDO();
    } else {
      this.getGroupTestDDO();
    }
  

  }

  private getTestingMenuDDO() {
    this.billingCodeService.getTestingFilteredMenuDDO(this.billingCode.Id).then((result) => {
      this.tests = result.data;
      this.tests.map((item) => {
        item.label = item.ItemName;
        item.value = item.Id;
      })

      let test = this.tests.filter((item) => {
        if (item.Id === this.billingCode.TestId) {
          this.breadcrumbsService.breadcrumbs = item.ItemName + ' / Edit';
        }
      })
      this.onTestSelect();
    });
  }

  private onTestSelect() {
    this.tests.filter((item) => {
      if (item.Id === this.billingCode.TestId) {
        this.billingCode.GCode = item.GCode;
        this.billingCode.CPTCode = item.CPTCode;
      }
    })
  }

  private getGroupTestDDO() {
    this.billingCodeService.getGroupTestFilteredDDO(this.billingCode.Id).then((result) => {
      this.tests = result.data;
      this.tests.map((item) => {
        item.label = item.GroupTestName;
        item.value = item.Id;
      })
      let test = this.tests.filter((item) => {
        if (item.Id === this.billingCode.TestId) {
          this.breadcrumbsService.breadcrumbs = item.GroupTestName + ' / Edit';
        }
      })
      this.onTestSelect();
    });
  }

  public save() {
    let test = this.tests.filter((item) => {
      return item.value === this.billingCode.TestId;
    })[0];

    if (test) { this.billingCode.TestName = test.label }

    this.billingCodeService.saveBillingCode(this.billingCode).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.cancel();
    });
  }

  public cancel(): void {
    if (this.testMenuType === 1) {
      this.routeService.openRoute('labtest/individual');
    } else {
      this.routeService.openRoute('labtest/group');
    }
  }

}
