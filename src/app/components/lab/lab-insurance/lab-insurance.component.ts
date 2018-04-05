import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Message, ConfirmationService, DataTable } from 'primeng/primeng';
import { InsuranceCompanySearchModel } from '../insurance-company-search/shared/insurance-search.model';
import { LabInsuranceService } from '../shared/lab-insurance.service';
import { LabInsuranceModel } from './shared/lab-insurance.model';
import { RouteService, PaginationService } from './../../../shared';
import { Paginator } from '../../../core/paginator/paginator';
import { BreadcrumbsService } from '../../../core/shared/services';
import { PaginationEnum } from '../../shared/enums';


@Component({
  selector: 'lab-insurance',
  templateUrl: './lab-insurance.component.html',
})
export class LabInsuranceComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public searchText: string = '';
  public showModal: boolean = false;
  public insuranceCompanies: Array<InsuranceCompanySearchModel> = [];
  public labInsuranceList: Array<LabInsuranceModel> = [];
  public selectedLabInsurance: Array<LabInsuranceModel> = [];
  public messages: Array<Message> = [];
  private selectedInsuranceCompany: Array<InsuranceCompanySearchModel> = [];
  private labInsuranceModel: LabInsuranceModel = new LabInsuranceModel();
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public totalInsuranceCompaniesRecords: number = 0;

  constructor(private confirmationService: ConfirmationService,
    private labInsuranceService: LabInsuranceService,
    public paginationService: PaginationService,
    public breadcrumbsService: BreadcrumbsService,
    private routeService: RouteService) {
    this.paginationService.setDefaultPage();
    this.getLabInsuranceList();

  }
  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All Insurance Contracts';
    this.getLabInsuranceList();
  }

  onInsuranceCompanySearch() {
    this.labInsuranceService.searchInsuranceCompany(this.searchText).then((response) => {
      this.insuranceCompanies = response.data.Data;
      this.totalInsuranceCompaniesRecords = response.data.TotalRecords;
      this.showModal = true;
    })
  }

  getLabInsuranceList() {
    this.labInsuranceService.getLabInsuranceList(this.paginationService.getParams()).then((response) => {
      this.labInsuranceList = response.data.Data;
      this.totalRecords = response.data.TotalRecords;
    })
  }

  onInsuranceComapnySelect(data) {
    this.selectedInsuranceCompany = data;
  }

  cancel() {
    this.showModal = false;
    this.searchText = '';
  }

  saveSearchedTests() {
    let arr = this.insuranceCompanies.filter((test) => {
      if (test.IsSelected === true) {
        return test;
      }
    });
    this.selectedLabInsurance = [];
    arr.forEach((test) => {
      let object = new LabInsuranceModel();
      object.CompanyCode = test.CompanyCode;
      object.CompanyName = test.CompanyName;
      object.Id = 0
      object.InsuranceCompanyId = test.Id;
      object.LabId = 0;
      this.selectedLabInsurance = [...this.selectedLabInsurance, object]
    });
    this.saveLabInsurance();
  }

  saveLabInsurance() {
    this.labInsuranceService.saveLabInsurance(this.selectedLabInsurance).then((response) => {
      this.getLabInsuranceList();
      this.searchText = '';
      this.showModal = false;
    })
  }

  deletelabInsurance(labInsurance) {
    let index = this.labInsuranceList.indexOf(labInsurance);
    if (labInsurance.Id > 0) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete - ' + labInsurance.CompanyName + ' ?',
        icon: 'fa fa-trash',
        accept: () => {
          this.labInsuranceService.deleteLabInsuranceById(labInsurance.Id).then((response) => {
            if (response) {
              this.messages.push({ severity: 'success', summary: '', detail: 'Record deleted Successfully' });
              this.getLabInsuranceList();
            }
          })
        }
      });
    } else {
      this.labInsuranceList.splice(index, 1);
      this.labInsuranceList = [...this.labInsuranceList]
    }
  }

  openFeeSchedule(id) {
    this.routeService.openRoute('lab/' + id + '/feeSchedule');
  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getLabInsuranceList();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getLabInsuranceList();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getLabInsuranceList();
  }

  onFilteringInsurance(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.onInsuranceCompanySearch();
  }
}


