import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from './../../../shared';
import { BreadcrumbsService } from './../../../core/shared/services';
import { Paginator } from './../../../core/paginator/paginator';
import { Message } from 'primeng/primeng';
import { PaginationEnum } from './../../shared/enums';
import { InsuranceCompanyTypeModel } from '../shared/insurance-company.model';
import { InsuranceCompanyService } from '../shared/insurance-company.service';

@Component({
  selector: 'insurance-company-type',
  templateUrl: './insurance-company-type.component.html',
  styleUrls: ['./insurance-company-type.component.css']
})

export class InsuranceCompanyTypeComponent implements OnInit {
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public errorMsg: Message[] = [];
  private ErrorDiv = '';
  private errormsg = '';
  public insuranceCompanyTypes: Array<InsuranceCompanyTypeModel> = [];
  public insuranceCompanyType: InsuranceCompanyTypeModel = new InsuranceCompanyTypeModel();


  constructor(
    // public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService,
    public insuranceCompanyService: InsuranceCompanyService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'Insurance Company Type';
    this.getInsuranceCompanyType();
  }


  private deleteInsuranceCompanyType(insuranceCompanyType) {
    console.log(insuranceCompanyType);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + insuranceCompanyType.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.insuranceCompanyService.deleteInsuranceCompanyTypeById(insuranceCompanyType.Id).then(result => {
          this.getInsuranceCompanyType();
          this.errorMsg.push({ severity: 'success', summary: '', detail: 'Record deleted successfully' });
        })
      }
    });
  }

  public getInsuranceCompanyType() {

    this.insuranceCompanyService.getInsurancesCompanyType(this.paginationService.getParams()).then(result => {
      this.insuranceCompanyTypes = result.data.Data;
      // this.prescribedMedicines =
    // [{ Id: 2, DrugName: "messi", isedit: false },
    // { Id: 3, DrugName: "sam", isedit: false }, { Id: 4, DrugName: "neymar", isedit: false }]
      this.totalRecords = result.data.TotalRecords;
      this.insuranceCompanyTypes.forEach(element => {
        element.isedit = false;
        return element;
      });
    })
  }
  public addInsuranceCompanyType() {
    this.ErrorDiv = '';
    this.errormsg = '';
    this.errorMsg = [];
    this.insuranceCompanyTypes.forEach(element => {
      if (element.Id === 0) {
        if (element.Name !== '') {
          this.errormsg = 'Save Insurance Company Type';
          this.errorMsg.push({
            severity: 'error', summary: 'Warn Message',
            detail: 'Sorry you can not add multiple new Prescribed Medicine, Please save first'
          });
          return;
        }
        this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Insurance Company Type Name can not be blank' });
        this.errormsg = 'Insurance Company Type can not blank';
        this.ErrorDiv = 'red';
        return;
      }
    })
    if (this.errormsg !== 'Insurance Company Type can not blank' && this.errormsg !== 'Save Insurance Company Type') {
      this.insuranceCompanyType = new InsuranceCompanyTypeModel();

      this.insuranceCompanyTypes = [this.insuranceCompanyType,...this.insuranceCompanyTypes];
      // this.prescribedMedicines.splice(0, 0, this.prescribedMedicine);
    }
  }

  public savePrescribedMedicine(PrescribedItem) {
    if (PrescribedItem.Name === '') {
      this.ErrorDiv = 'red';
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Insurance Company Type Name can not be blank' });
      return;
    }
    // this.prescribedMedicines = [...this.prescribedMedicines, PrescribedItem];
    this.insuranceCompanyService.saveInsuranceCompanyType(PrescribedItem).then(result => {
      this.getInsuranceCompanyType();
    })
  }

  // public addCompoundProfile(): void {
  //   this.routeService.openRoute('compoundProfile/add');
  // }
  public editCompoundProfile(id): void {
    this.routeService.openRoute('compoundProfile/' + id + '/edit');
  }
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getInsuranceCompanyType();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getInsuranceCompanyType();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getInsuranceCompanyType();
  }

}
