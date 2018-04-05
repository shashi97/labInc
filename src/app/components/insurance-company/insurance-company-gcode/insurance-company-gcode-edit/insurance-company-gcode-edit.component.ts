import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../../core/shared/services';
import { RouteService } from './../../../../shared';
import { InsuranceCompanyModel, InsuranceCompanyService, InsuranceCompanyState } from '../../shared';
import { Message } from 'primeng/primeng';
import { MasterService, CustomDDO } from '../../../shared';
import { TestProfileService } from '../../../codes/test-profile/shared/test-profile.service'

@Component({
  selector: 'app-insurance-company-gcode-edit',
  templateUrl: './insurance-company-gcode-edit.component.html',
  styleUrls: ['./insurance-company-gcode-edit.component.css']
})

export class InsuranceCompanyGcodeEditComponent implements OnInit {

  public errorMessage: Message[] = [];

  public isSelect: boolean = false;
  private GCodeSuggestion: Array<any> = [];
  private insuranceStates: Array<InsuranceCompanyState> = [];
  public insurance: InsuranceCompanyModel = new InsuranceCompanyModel();
  public insuranceComapny: any;
  public totalRecords: number;
  public isStateShow: boolean = false;
  private testProfilesList: Array<any> = [];
  private utilizationProfileList: Array<any> = [];
  constructor(public breadcrumbsService: BreadcrumbsService,
    private insuranceCompanyService: InsuranceCompanyService,
    private masterService: MasterService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    private testProfileService: TestProfileService) {
    this.getTestProfileDDo();
    this.getUtilizationProfileDDO();
  }

  ngOnInit() {
    this.getDefaultParams();


  }

  getDefaultParams() {
    this.insurance.Id = this.route.snapshot.params['insuranceCompanyId'] || 0;
    this.getInsuranceById(this.insurance.Id);
  }

  private getTestProfileDDo() {
    this.testProfileService.getTestProfileDDO().then((testProfile) => {
      this.testProfilesList = testProfile.data;
      this.testProfilesList.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      });

    })
  }

  private getUtilizationProfileDDO(): void {
    this.insuranceCompanyService.getUtilizationProfileDDO().then(res => {
      this.utilizationProfileList = res.data;
      this.utilizationProfileList.map((item) => {
        item.label = item.Name,
          item.value = item.Id
      })
    })
  }

  // onGCodeAccept(GCode){
  //   if(GCode.IsAcceptGCode){
  //     GCode.TestProfileId=0;
  //   }
  // }

  private getInsuranceById(insuranceId) {
    this.insuranceCompanyService.getInsuranceById(insuranceId).then((result) => {
      this.insurance = result.data;

      this.onSelectCptCode();

      this.breadcrumbsService.breadcrumbs = this.insurance.CompanyName + ' / ' + this.insurance.CompanyCode + ' / Edit';
    });
  }

  private getInsuranceCompanyBySearch() {
    this.insuranceCompanyService.getInsuranceCompanyBySearch(this.insuranceComapny).then((result) => {
      this.GCodeSuggestion = result.data;
      if (this.GCodeSuggestion.length === 0) {
        this.errorMessage.push({
          severity: 'error',
          summary: 'Error Message', detail: 'Not a valid Insurance Company'
        });
        this.insuranceComapny = '';
      }
      if (this.GCodeSuggestion.length === 1) {
        this.insuranceComapny = this.GCodeSuggestion[0];
        this.GCodeSuggestion = [];
      }
    });
  }


  showErrorMessage(message) {
    this.errorMessage.push({
      severity: 'error',
      detail: message
    });
  }

  public save(isValid) {
    this.insuranceCompanyService.saveInsuranceState(this.insuranceStates).then(res => {
      this.routeService.openRoute('insurance/companies');
    });
  }

  public cancel(): void {
    this.routeService.openRoute('insurance/companies');
  }


  private onSelectCptCode() {
    this.isSelect = false;
    this.isStateShow = true;
    this.getStateDetail();
  }

  private getStateDetail() {
    this.insuranceCompanyService.getStatesByInsuranceId(this.insurance.Id).then((result) => {
      this.insuranceStates = result.data;
      this.totalRecords = this.insuranceStates.length;
    });
  }
}
