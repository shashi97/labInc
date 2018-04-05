import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from '../../../shared';
import { BreadcrumbsService } from '../../../core/shared/services';
import { Paginator } from '../../../core/paginator/paginator';
import { Message } from 'primeng/primeng';
import { PaginationEnum } from '../../shared/enums';
import { TradingPartnerModel, TradingPartnerService ,TradingPartnerImportModel} from './index';

@Component({
  selector: 'trading-partner',
  templateUrl: './trading-partner.component.html',
  styleUrls: ['./trading-partner.component.css']
})

export class TradingPartnerComponent implements OnInit {
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public totalImportedRecords: number = 0;
  public errorMsg: Message[] = [];
  private ErrorDiv = '';
  private errormsg = '';
  public tradingPartners: Array<TradingPartnerModel> = [];
  public importTradingPartners: Array<TradingPartnerImportModel> = [];
  public tradingPartner: TradingPartnerModel = new TradingPartnerModel();
  public insuranceNameObj;
  public insuranceSuggestions = [];
  public display: boolean = false;
  public tradingPartnerObj;
  public tradingPartnerSuggestions = [];

  constructor(
    // public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService,
    public tradingPartnerService: TradingPartnerService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'Trading Partners';
    this.getTradingPartner();
  }


  private deleteTradingPartner(tradingPartner) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Unlink Trading Partner - ' + tradingPartner.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.tradingPartnerService.deleteTradingPartnerById(tradingPartner.InsuranceCompanyId).then(result => {
          this.getTradingPartner();
          this.errorMsg.push({ severity: 'success', summary: '', detail: 'Record Unlinked successfully' });
        })
      }
    });
  }

  public getInsuranceBySearch(): void {
    if (this.insuranceNameObj.length > 2) {
      this.tradingPartnerService.getInsuranceBySearch(this.insuranceNameObj).then(res => {
        this.insuranceSuggestions = res.data;
        if (this.insuranceSuggestions.length === 0) {
          this.errorMsg.push({
            severity: 'error',
            summary: 'Error Message', detail: 'Not a valid Insurance Company'
          });
          this.insuranceNameObj = '';

        }
        if (this.insuranceSuggestions.length == 1) {
          this.insuranceNameObj = this.insuranceSuggestions[0];
        }
      });
    }
  }

  public getTradingPartnerBySearch(): void {
    if (this.tradingPartnerObj.length > 1) {
      this.tradingPartnerService.getTradingPartnerBySearch(this.tradingPartnerObj).then(res => {
        this.tradingPartnerSuggestions = res.data;
        if (this.tradingPartnerSuggestions.length === 0) {
          this.errorMsg.push({
            severity: 'error',
            summary: 'Error Message', detail: 'Not a valid Trading Partner'
          });
          this.tradingPartnerObj = '';

        }
        if (this.tradingPartnerSuggestions.length == 1) {
          this.tradingPartnerObj = this.tradingPartnerSuggestions[0];
        }
      });
    }
  }

  public getTradingPartner() {
    this.tradingPartnerService.getTradingPartner(this.paginationService.getParams()).then(result => {
      this.tradingPartners = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
      this.tradingPartners.forEach(element => {
        element.isedit = false;
        return element;
      });
      this.insuranceNameObj = {};
      this.tradingPartnerObj = {};
    })
  }

  getImportTradingPartner() {
    this.tradingPartnerService.getImportTradingPartner().then(result => {
      this.importTradingPartners = result.data;
      this.importTradingPartners.forEach(element => {
        return element.IsSelected = true;
      });
      this.display = true;
      this.totalImportedRecords = this.importTradingPartners.length;
    })
  }
  public addTradingPartner() {
    this.ErrorDiv = '';
    this.errormsg = '';
    this.errorMsg = [];
    this.tradingPartners.forEach(element => {
      if (element.TradingPartnerId === 0) {
        if (element.Name !== '') {
          this.errormsg = 'Save Trading Partner';
          this.errorMsg.push({
            severity: 'error', summary: 'Warn Message',
            detail: 'Sorry you can not add multiple new Patient Condition, Please save first'
          });
          return;
        }
        this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Trading Partner can not be blank' });
        this.errormsg = 'Trading Partner can not blank';
        this.ErrorDiv = 'red';
        return;
      }
    })
    if (this.errormsg !== 'Trading Partner can not blank' && this.errormsg !== 'Save Trading Partner') {
      this.tradingPartner = new TradingPartnerModel();

      this.tradingPartners = [ this.tradingPartner,...this.tradingPartners];
      // this.prescribedMedicines.splice(0, 0, this.prescribedMedicine);
    }
  }

  public editTradingPartner(item) {
    let count = 0;
    this.tradingPartners.forEach(practice => {
      if (practice.isedit) {
        count++;
      }
    })
    if (count === 0) {
      item.isedit = true;
    } else {
      this.errorMsg.push({ severity: 'error', summary: '', detail: 'Please save or cancel the opened Item.' });
    }

  }
  private cancel() {
    this.display = false;
  }


  saveImportedTradingPartners() {   
    this.tradingPartnerService.saveImportedTradingPartners(this.importTradingPartners).then(result => {
      this.display = false;     
      this.getTradingPartner();
    })
  }


  public saveTradingPartner(tradingPartner) {
    this.tradingPartner.Id = this.tradingPartnerObj.Id;
    this.tradingPartner.InsuranceCompanyId = this.insuranceNameObj.Id;
    if (!this.tradingPartner.Id) {
      this.ErrorDiv = 'red';
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Trading Partner can not be blank' });
      return;
    }
    if (!this.tradingPartner.InsuranceCompanyId) {
      this.ErrorDiv = 'red';
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Insurance Company can not be blank' });
      return;
    }
    // this.prescribedMedicines = [...this.prescribedMedicines, PrescribedItem];
    this.tradingPartnerService.saveTradingPartner(this.tradingPartner).then(result => {
      this.insuranceNameObj = {};
      this.tradingPartnerObj = {};
      this.getTradingPartner();
    })
  }

  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getTradingPartner();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getTradingPartner();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getTradingPartner();
  }

}
