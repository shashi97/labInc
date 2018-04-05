
import { Component, OnInit, ViewChild } from '@angular/core';
import { LabContract, LabContractService } from '../shared';
import { BreadcrumbsService } from '../../../core/shared/services';
import { DataTable, ConfirmationService, Message } from 'primeng/primeng';
import { Paginator } from '../../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../../shared';
import { PaginationEnum } from '../../shared/enums';
import { LabService, LabModel } from '../../lab';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-lab',
  templateUrl: './contract-lab.component.html',
})

export class ContractLabComponent implements OnInit {

  public labContract: LabContract = new LabContract();
  public searchLab: string = '';
  public showDialog: boolean = false;
  public labs: Array<LabModel> = new Array<LabModel>();
  public lab: LabModel = new LabModel();
  errorMessages: Message[] = [];
  public labContractId = 0;
  public contractLabId = 0;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;

  constructor(private labContractService: LabContractService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public labService: LabService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService,
    public route: ActivatedRoute) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.getDefaultParams();
  }

  getDefaultParams() {
    this.labContractId = this.route.snapshot.params['labContractId'] || 0;
    this.contractLabId = this.route.snapshot.params['contractLabId'] || 0;
    if (this.labContractId > 0) {
      this.getLabDetail(this.contractLabId);
    } else {
      this.breadcrumbsService.breadcrumbs = 'Lab Contract / New';

    }
  }

  getLabDetail(contractLabId) {
    this.labService.getLogo(contractLabId).then(result => {
      this.lab = result.data;
      // this.totalRecords = result.data.TotalRecords;
      this.breadcrumbsService.breadcrumbs = 'Lab Contract / ' + this.lab.Name + ' -' + this.lab.City;
      this.onLabSelect(contractLabId);
    });
  }

  onLabSelect(contractLabId) {
    this.labContractService.getLabTest(this.labContractId, contractLabId).then(result => {
      this.labContract = result.data;
      if (this.labContract.LabToLabContractTests.length === 0) {
        this.errorMessages.push({
          severity: 'error',
          summary: 'Error Message', detail: this.lab.Name + ' does not perform any test, so please add test first.'
        });
      }
      this.showDialog = false;
    });
  }

  searchLabQuery() {
    this.labContractService.searchLab(this.searchLab).then(result => {
      this.labs = result.data;
      this.showDialog = true;
    });
  }

  save() {
    if (this.labContract.LabToLabContractTests.length === 0) {
      this.errorMessages.push({
        severity: 'error',
        summary: 'Error Message', detail: 'Lab Contract can not be blank, so please select a lab first'
      });
      return;
    }
    let data = {
      Id: this.labContractId,
      LabId: 0,
      ContractLabId: this.lab.Id,
      ContractLabName: this.labContract.ContractLabName,
      LabToLabContractTests: this.labContract.LabToLabContractTests
    }
    this.labContractService.saveLabContract(data).then(result => {
      this.cancel();
    });
  }

  cancel() {
    this.routeService.openRoute('labContract');
  }
}
