import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { InsuranceCompanyModel, InsuranceCompanyService } from '../shared';
import { Message } from 'primeng/primeng';
import { MasterService, CustomDDO } from '../../shared';
import { DataTable, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-insurance-company-gcode',
  templateUrl: './insurance-company-gcode.component.html',
  styleUrls: ['./insurance-company-gcode.component.css']
})

export class InsuranceCompanyGcodeComponent implements OnInit {

  public insuranceGcodeList: Array<InsuranceCompanyModel> = [];
  public totalRecords: number;
  constructor(public breadcrumbsService: BreadcrumbsService,
    private insuranceCompanyService: InsuranceCompanyService,
    private masterService: MasterService,
    private routeService: RouteService,
    public confirmationService: ConfirmationService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.getInsuranceCompanyGocdeList();
  }

  private getInsuranceCompanyGocdeList(): void {
    // this.insuranceCompanyService.getInsuranceCompanyGcodeList().then(res => {
    //   this.insuranceGcodeList = res.data.Data;
    //   this.totalRecords = res.data.TotalRecords;
    // })
  }

  addInsuranceGcode() {
    this.routeService.openRoute('insurance/gcCodes/add');
  }

  editInsuranceCompanyGcode(id) {
    this.routeService.openRoute('insurance/gcCodes/' + id + '/edit');
  }

  deleteInsuranceCompanyGcodeById(insurance) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + insurance.CompanyName + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.insuranceCompanyService.deleteInsuranceById(insurance.Id).then(result => {
          this.getInsuranceCompanyGocdeList();
        })
      },
      reject: () => {
      }
    });
  }

}
