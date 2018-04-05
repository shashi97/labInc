
import { Component, OnInit, ViewChild } from '@angular/core';
import { LabContract, LabContractService } from './shared';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../shared';
import { PaginationEnum } from '../shared/enums';



@Component({
  selector: 'app-lab-contract',
  templateUrl: './lab-contract.component.html',

})

export class LabContractComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;

  public labContracts: Array<LabContract> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;

  constructor(private labContractService: LabContractService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
    this.getLabContracts();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All Referral Contracts';
  }

  getLabContracts() {
    this.labContractService.getLabContracts(this.paginationService.getParams()).then(result => {
      this.labContracts = result.data;
      this.totalRecords = result.data.length;
    })
  }

  addLabContract() {
    this.routeService.openRoute('labContract/contractLab');
  }

  editLabContract(labContract) {
    this.routeService.openRoute('labContract/' + labContract.Id + '/contractLab/' + labContract.ContractLabId);
  }

  deleteLabContractById(labContract) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + labContract.ContractLabName + ' ?',
       icon: 'fa fa-trash',
      accept: () => {
        this.labContractService.deleteLabContractById(labContract.Id).then(result => {
          this.getLabContracts();
        })
      },
      reject: () => {
      }
    });

  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getLabContracts();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getLabContracts();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getLabContracts();
  }
}
