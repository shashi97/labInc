import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { BreadcrumbsService } from './../../../../../core/shared/services';
import { RouteService, PaginationService } from './../../../../../shared';
import { InsuranceModel } from '../../shared/insurance.model';
import { InsuranceService } from '../../shared';
import { Message } from 'primeng/primeng';
import { PatientService } from '../../../shared/patient.service';
import { CustomDDO } from '../../../../shared';


@Component({
  selector: 'app-patient-insurance-edit-main',
  templateUrl: './insurance-edit-main.component.html',
  styleUrls: ['./insurance-edit-main.component.css']
})

export class InsuranceEditMainComponent implements OnInit, OnChanges {

  @Input() insurance: InsuranceModel;
  @Input() labelWidth: boolean;
  @Input() isInsuranceErr: boolean = false;
  private insuranceCompanies: Array<any> = [];
  insuranceTypes: Array<any> = [];
  private patientName: string = '';
  public currentYear: number;
  public insurances: Array<InsuranceModel> = [];
  public relations: Array<CustomDDO> = [];
  @Input() insuranceNameObj;
  isConfirm: boolean = false;
  public errorMsg: Message[] = [];
  public insuranceTypeName: string = '';
  public insuranceSuggestions: Array<any> = [];

  constructor(public breadcrumbsService: BreadcrumbsService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public insuranceService: InsuranceService,
    private paginationService: PaginationService,
    private patientService: PatientService,
    private confirmationService: ConfirmationService) {
    this.getInsuranceType();
  }

  ngOnInit() {
    this.getRelationshipList();

    // this.getInsuranceCompany();

    let year = new Date();
    this.currentYear = year.getFullYear() + 10;

  }
  ngOnChanges() {
    if (this.insurance.InsuranceCompanyId > 0) {
      this.getInsuranceCompanyById();
    }
  }

  public getInsuranceType() {
    this.insuranceService.getInsuranceType().then(res => {
      this.insuranceTypes = [];
      res.data.map((item) => {
        // let obj = { label: item.Name, value: item.Id };
        this.insuranceTypes.splice(this.insuranceTypes.length, -1, { label: item.Name, value: item.Id });
        // this.insuranceTypes.push(obj);
      });
    });
  }

  // public getInsuranceCompany() {
  //   let promise = new Promise((resolve, reject) => {
  //     this.insuranceService.getInsuranceCompany().then(res => {
  //       let results: any = res.data;
  //       this.insuranceCompanies = new Array<any>();
  //       results.map((item) => {
  //         let obj = { label: item.CompanyName, value: item.Id };
  //         this.insuranceCompanies.push(obj);
  //       });
  //       resolve(true);
  //     });
  //   });
  //   return promise;
  // }

  public getInsuranceCompanyById() {
    let promise = new Promise((resolve, reject) => {
      this.insuranceService.getInsuranceCompanyById(this.insurance.InsuranceCompanyId).then(res => {
        this.insuranceNameObj = res.data;
        // this.insuranceCompanies = new Array<any>();
        // results.map((item) => {
        //   let obj = { label: item.CompanyName, value: item.Id };
        //   this.insuranceCompanies.push(obj);
        // });
        resolve(true);
      });
    });
    return promise;
  }
  public getInsuranceBySearch(): void {
    if (this.insuranceNameObj.length > 2) {
      this.patientService.getInsuranceBySearch(this.insuranceNameObj).then(res => {
        this.insuranceSuggestions = res.data;
        if (this.insuranceSuggestions.length === 0) {
          this.errorMsg.push({
            severity: 'error',
            summary: 'Error Message', detail: 'Not a valid Insurance Company'
          });
          this.insuranceNameObj = '';

        }
        if (this.insuranceSuggestions.length === 1) {
          this.insuranceNameObj = this.insuranceSuggestions[0];
        }
      });
    }
  }

  onInsuranceSelect() {
    this.insurance.InsuranceCompanyId = this.insuranceNameObj.Id;
  }

  getRelationshipList() {
    this.patientService.getGuarantorRelation().then(result => {
      let results: any = result.data;
      results.map((item) => {
        if (item.Name !== 'Parent') {
          let obj = { label: item.Name, value: item.Id };
          this.relations.push(obj);
        }
      });
    });
  }

  onIsActive() {

    let insuranceType = this.insuranceTypes.filter(res => {
      return res.value === this.insurance.InsuranceTypeId;
    })
    if (insuranceType.length > 0) {
      this.insuranceTypeName = insuranceType[0].label;
    }
    if (this.insurance.IsActive) {
      this.insuranceService.checkActiveInsuranceExist(this.insurance.Id, this.insurance.PatientId,
        this.insurance.InsuranceTypeId).then(result => {
          if (result.data) {
            this.confirmationService.confirm({
              message: 'An Insurance type of ' + this.insuranceTypeName + ' already exists. Do you want to continue it ? ',
              header: 'Confirmation',
              icon: 'fa fa-question-circle',
              accept: () => {
                this.insurance.IsActive = true;
              },
              reject: () => {
                this.insurance.IsActive = false;
              }
            });
          }
        })
    }
    // if (this.insurance.IsActive) {
    //   let index = 0;
    //   let insuranceIndex;
    //   let insurance = [];
    //   this.insurances.map(ins => {
    //     index++;
    //     if (ins.IsActive === true && this.insurance.InsuranceTypeId === ins.InsuranceTypeId) {
    //       insuranceIndex = index;
    //       insurance.push(ins);
    //     }
    //   });

    //   if (insurance.length > 0) {
    //     this.isConfirm = true;

    //   }

    // }

  }
}
