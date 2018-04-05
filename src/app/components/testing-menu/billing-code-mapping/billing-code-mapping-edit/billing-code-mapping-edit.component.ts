import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../../core/shared/services';
import { RouteService } from './../../../../shared';
import { BillingCodeService } from './../../../billing-code/shared';
import { BillingCodeModel, TestingMenuService } from '../../shared';
import { CustomDDO } from './../../../shared/models/custom-ddo.model';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'testing-billing-code-edit',
  templateUrl: './billing-code-mapping-edit.component.html',
  styleUrls: ['./billing-code-mapping-edit.component.css']
})

export class TestBillingCodeEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public billingCode: BillingCodeModel = new BillingCodeModel();
  public tests: Array<any>;
  public CPTCodeSuggestion: Array<any>;
  public ICDCodeSuggestion: Array<any>;
  public selectedICDCodes: Array<any>;
  private listOfICDCOdes: Array<any>;


  constructor(public breadcrumbsService: BreadcrumbsService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public billingCodeService: BillingCodeService,
    public testingMenuService: TestingMenuService) { }

  ngOnInit() {
    this.getDefaultParams();
    // this.getTestingMenuDDO();
  }

  getDefaultParams() {
    this.billingCode.Id = this.route.snapshot.params['id'] || 0;
    if (this.billingCode.Id > 0) {
      this.getBillingCodeById(this.billingCode.Id);
    } else {
      this.breadcrumbsService.breadcrumbs = 'Billing Code / New';
      this.billingCode.BillingCodeTestTypeId = 1;
      this.getTests();
    }
  }

  private getBillingCodeById(billingId) {
    this.testingMenuService.getBillingCodeById(billingId).then((result) => {
      this.billingCode = result.data;
      this.selectedICDCodes = this.billingCode.ICD10Codes.map((code) => {
        return code.Code;
      })
      this.breadcrumbsService.breadcrumbs = this.billingCode.TestName + ' / Edit';
      this.getTests();
    });
  }

  private getCPTCodeBySearch() {
    this.billingCodeService.getCPTCodeBySearch(this.billingCode.CPTCode).then((result) => {
      this.CPTCodeSuggestion = result.data;
      if (this.CPTCodeSuggestion.length === 0) {
        this.errorMsg.push({
          severity: 'error',
          summary: 'Error Message', detail: 'Not a valid CPT Code'
        });
        this.billingCode.CPTCode = '';
      }
      if (this.CPTCodeSuggestion.length === 1) {
        this.billingCode.CPTCode = this.CPTCodeSuggestion[0];
        this.CPTCodeSuggestion = [];
      }
    });
  }

  private getICDCodeOnSerach(event) {
    let query = event.query;
    this.billingCodeService.getICDCodeBySearch(query).then((code) => {
      {
        this.ICDCodeSuggestion = code.data
        // this.ICDCodeSuggestion = this.listOfICDCOdes.map((code) => {
        //   return code.Code;
        // })
        if (this.ICDCodeSuggestion.length === 0) {
          this.errorMsg.push({
            severity: 'error',
            summary: 'Error Message', detail: 'Not a valid ICD Code'
          });
          this.selectedICDCodes = [];
        }
      }
    })
  }

  public afterICDCodeSelect(selectedICD) {
    let filteredIcd = this.billingCode.ICD10Codes.filter((val) => {
      return val.Id === selectedICD.Id;
    });
    if (filteredIcd.length === 2) {
      let index = this.billingCode.ICD10Codes.indexOf(filteredIcd[1]);
      this.billingCode.ICD10Codes.splice(index, 1);
    }

  }

  public getTests() {
    if (Number(this.billingCode.BillingCodeTestTypeId) === 1) {
      this.getTestingMenuDDO();
    } else {
      this.getGroupTestDDO();
    }
  }

  private getTestingMenuDDO() {
    this.billingCodeService.getFilteredTestingMenuDDO(this.billingCode.Id ).then((result) => {
      this.tests = result.data;
      this.tests.map((item) => {
        item.label = item.ItemName;
        item.value = item.Id;
      })
      let test = this.tests.filter((item) => {
        if (item.Id === this.billingCode.TestId) {
          this.breadcrumbsService.breadcrumbs = item.ItemName + ' / Edit';
        }
      });
    });
  }

  private getGroupTestDDO() {
    this.billingCodeService.getFilteredGroupTestDDO(this.billingCode.Id ).then((result) => {
      this.tests = result.data;
      this.tests.map((item) => {
        item.label = item.GroupTestName;
        item.value = item.Id;
      })
      let test = this.tests.filter((item) => {
        if (item.Id === this.billingCode.TestId) {
          this.breadcrumbsService.breadcrumbs = item.GroupTestName + ' / Edit';
        }
      });
    });


  }

  public save() {

    // if (this.billingCode.CPTCode === '') {
    //   this.errorMsg.push({
    //     severity: 'error',
    //     summary: 'Error Message', detail: 'CPT Code can not blank'
    //   });
    //   return;
    // }
   
    this.testingMenuService.saveBillingCode(this.billingCode).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.cancel();
    });
  }
  //   getCPTCodes (){
  //   this.CPTCodesService.getCPTCodesForCompound().then(result =>{
  //    this.CPTCodesModel = result.data.Data;
  //    this.CPTCodesModel.map((item) =>{
  //       item.label = item.GeneName;
  //       item.value = item.Id;
  //    })
  //   })
  // }

  public cancel(): void {
    this.routeService.openRoute('testingMenu/testCodeMapping');
  }

}
