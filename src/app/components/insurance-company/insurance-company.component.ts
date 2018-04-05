
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InsuranceCompanyModel, FileUploadModel, InsuranceCompanyService } from './shared';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../shared';
import { PaginationEnum ,ImportFileEnum } from '../shared/enums';
import { Message } from 'primeng/primeng';
import { ApiUrl } from '../../shared/api.service';

@Component({
  selector: 'app-insurance-company',
  templateUrl: './insurance-company.component.html',

})

export class InsuranceCompanyComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public FileUpload: FileUploadModel = new FileUploadModel();
  public errorMessages: Message[] = [];

  public importTitleName: string = 'Insurance Companies';
  public importTableHeader = [{ "header": "Insurance Company Name" }, { "header": "Insurance Code" },
  { "header": "Payer ID" },{ "header": "State(s)" },{ "header": "Insurance Company Type" }];
  public importTableRow = [{ col1: "A", col2: "B", col3: "C", col4: "D", col5: "E" },
  { col1: "A", col2: "B", col3: "C", col4: "ALL", col5: "E" },{  col1: "A", col2: "B", col3: "C", col4: "ALL Except- D,D", col5: "E" },
  {  col1: "A", col2: "B", col3: "C", col4: "D,D", col5: "E"}];
  public importFileType: number = ImportFileEnum.Insurance;

  public insurances: Array<InsuranceCompanyModel> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  @ViewChild('fileInput') myFileInput: ElementRef;
  constructor(private insuranceService: InsuranceCompanyService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
    this.getInsurances();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All Insurance Company';
  }

  getInsurances() {
    this.insuranceService.getInsurances(this.paginationService.getParams()).then(result => {
      this.insurances = result.data.Data; // temp data from Molecular API
      this.totalRecords = result.data.TotalRecords;
    })
  }

  addInsurance() {
    this.routeService.openRoute('insurance/add');
  }

  editInsurance(id) {
    this.routeService.openRoute('insurance/' + id + '/edit');
  }

  deleteInsuranceById(insurance) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + insurance.CompanyName + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.insuranceService.deleteInsuranceById(insurance.Id).then(result => {
          this.getInsurances();
        })
      },
      reject: () => {
      }
    });
  }
  

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getInsurances();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getInsurances();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getInsurances();
  }
  editInsuranceGcode(insuranceCompanyId) {
    this.routeService.openRoute('insurance/' + insuranceCompanyId + '/gcCodes');
   }
}
