import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { BreadcrumbsService } from '../../../../core/shared/services';
import { RouteService } from '../../../../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO } from '../../../shared/models/custom-ddo.model';
import { IcdCodeModel, ICD10CodeModel } from '../shared/cptCodes.model';
import { CPTCodesModel } from '../shared/cptCodes.model';
import { CPTCodesService } from '../../shared/cptCodes.service';
import { BillingCodeService } from './../../../billing-code/shared';

@Component({
  selector: 'app-icdCode-mapping',
  templateUrl: './icdCode-mapping.component.html',
  styleUrls: ['./icdCode-mapping.component.css']
})

export class ICDCodeMappingComponent implements OnInit {
  private cptCodeId: number;
  private showIcdCodeMapping: boolean = false;
  private icdCodes: Array<IcdCodeModel> = [];
  private searchText: string = '';
  private insuranceCompanyId: number;
  private CPTCodeSuggestion: Array<any> = [];
  private isCptCodeSelected: boolean = false;
  private totalRecords: number;
  private totalCptCode: number;
  private cptcodesModel: any;
  private ICD10CodeIds: Array<number> = [];
  private showErrorMessage: boolean = false;
  private isError: boolean = false;
  @Input() parent: string = 'icd';
  public cptCode: any;
  errorMessage: Array<any> = [];
  cptIcdCodeMapping: Array<ICD10CodeModel> = [];
  constructor(private codesService: CPTCodesService, private breadcrumbsService: BreadcrumbsService,
    public confirmationService: ConfirmationService,
    private route: ActivatedRoute, private routeService: RouteService,
    private billingCodeService: BillingCodeService) { }
  ngOnInit() {

    this.cptCodeId = this.route.snapshot.params['id'] || 0;
    this.insuranceCompanyId = this.route.snapshot.params['insuranceCompanyId'] || 0;
    this.breadcrumbsService.breadcrumbs = 'CPT/ICD Code Mapping';
    // this.parent = this.route.snapshot.params['parent'] ;
    this.setBreadCum();
    this.getIcdCodeOnCptLabId();
    this.getcptCodeBasedOnId();
  }

  public setBreadCum() {
    // if (this.parent === 'icd') {
    this.getCPTCodeById();
    // }
  }
  getCPTCodeById() {
    if (Number(this.cptCodeId) !== 0) {
      this.codesService.getCPTCodeById(Number(this.cptCodeId)).then(result => {
        this.cptcodesModel = result.data;
        this.breadcrumbsService.breadcrumbs = this.cptcodesModel.Code + ' / ICD CODE Mapping';

      })
    } else {

    }
  }
  public getIcdCodeOnCptLabId() {
    this.icdCodes = [];
    this.codesService.getIcdCodesOncptCodeId(Number(this.cptCodeId)).then(res => {
      this.icdCodes = res.data;
      this.totalRecords = res.data.length;
    })
  }

  public getcptCodeBasedOnId() {
    this.isCptCodeSelected = false;
    if (this.parent === 'insurance' && Number(this.cptCodeId) !== 0) {
      this.codesService.getCPTCodeById(this.cptCodeId).then(res => {
        console.log(res);
        this.isCptCodeSelected = true;
        this.cptCode = res.data;

      })
    }
  }
  private addIcdCode() {
    this.showIcdCodeMapping = true;
  }

  private getIcdCodeMapping(cptCode, parent) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + cptCode.ICD10Code + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        if (parent === 'icd') {
          this.codesService.deleteIcdCodeMappingById(cptCode.Id).then(result => {
            this.getIcdCodeOnCptLabId();
          })
        }
        if (parent === 'insurance') {
          let index = this.icdCodes.findIndex(res => {
            return res.Id === cptCode.Id;
          })
          this.icdCodes.splice(index, 1);
          this.icdCodes = [...this.icdCodes]
        }
      },
      reject: () => {
      }
    });
  }

  cancel() {
    if (this.parent === 'icd') {
      this.routeService.openRoute('codes/cpt');
    }
    if (this.parent === 'insurance') {
      this.routeService.openRoute('insurance/' + this.insuranceCompanyId + '/cpt');
    }

  }


  onIcdCodeMappingSearch() {
    this.codesService.searchICDCodeMapping(this.searchText, this.cptCodeId).then((response) => {
      this.cptIcdCodeMapping = response.data.Data;
      this.totalCptCode = response.data.Data.length !== 0 ? this.cptIcdCodeMapping.length : 0;
      this.totalRecords = response.data.TotalRecords;
      this.cptIcdCodeMapping.map(cpt => {
        cpt.isChecked = false;
      })
      // this.totalInsuranceCompaniesRecords = response.data.TotalRecords;
      this.showIcdCodeMapping = true;


    });
  }

  private getCPTCodeBySearch() {
    this.isError = false;
    this.codesService.getCPTCodeBySearch(this.cptCode).then((result) => {
      this.CPTCodeSuggestion = result.data;
      if (this.CPTCodeSuggestion.length === 0) {
        this.errorMessage.push({
          severity: 'error',
          summary: 'Error Message', detail: 'Not a valid CPT Code'
        });
        this.cptCode = '';
      }
      if (this.CPTCodeSuggestion.length === 1) {
        this.cptCode = this.CPTCodeSuggestion[0];
        this.CPTCodeSuggestion = [];
      }
    });
  }

  private onSelectCptCode(): void {
    this.cptCodeId = this.cptCode.Id;
    this.getIcdCodeOnCptLabId();
  }

  private onIcd10CodeChange(icd) {
    icd.map(res => {
      res.ICD10Code = res.Code
      let index = this.icdCodes.findIndex(icdCode => {
        return icdCode.Id === res.Id;
      })
      if (index === -1) {
        this.icdCodes = [...this.icdCodes, res];
      }
    })
    // this.icdCodes = [...this.icdCodes, icd];
    this.totalRecords = this.icdCodes.length;
  }

  private save() {
    this.ICD10CodeIds = [];
    let cptCodeICDCodeMapping;
    this.isError = this.cptCode ? false : true;
    this.cptIcdCodeMapping.map(res => {

      this.ICD10CodeIds.splice(this.ICD10CodeIds.length, -1, res.Id);

    })
    cptCodeICDCodeMapping = {
      ICD10CodeIds: this.ICD10CodeIds,
      CPTCodeId: this.cptCodeId,
      InsuranceCompanyId: this.insuranceCompanyId
    }
    this.showErrorMessage = false;
    if (!this.isError) {
      this.codesService.saveIcdCodeMapping(cptCodeICDCodeMapping).then(response => {
        this.getCPTCodeById();

      })
    }
  }
}
