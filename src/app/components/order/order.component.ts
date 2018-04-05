import { Component, OnInit, ViewChild, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OrderService } from './shared';
import { BreadcrumbsService } from './../../core/shared/services';
import { Paginator } from './../../core/paginator/paginator';
import { RouteService, PaginationService } from './../../shared';
import { ConfirmationService, DataTable, Message } from 'primeng/primeng';
import { OrderModel, OrderFilter, OrderDTOModel, CustomDDO } from '../order/shared/order.model';
import { LocalStorageService } from '../../core/shared/services/index';
import { PaginationEnum } from '../shared/enums';
import { InsuranceCompanyModel } from '../insurance-company/shared';
import { CPTCodesModel } from '../codes/cptCodes/shared/cptCodes.model';
import { LabModel, LabService } from '../lab/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './Order.component.html',
  styleUrls: ['./Order.component.css']
})
export class OrderComponent implements OnInit {
  cols: any[];
  private datePipe = new DatePipe('en-US');
  // = this.route.snapshot.params['id'];
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public patientId: number;
  public salesOfficeLogin: boolean = false;
  public user;
  public insuranceNameObj;
  public testNameObj;
  public orderFilter: OrderFilter = new OrderFilter();
  public Order: Array<OrderModel> = [];
  public Orders: Array<OrderDTOModel> = [];
  public billingLab = [];
  public errorMsg: Message[] = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public insuranceSuggestions = [];
  public testSuggestions = [];
  public OrderStatusDDO = [];
  public PracticeDDO = [];
  public orderSearchModel;
  public isParamObjBlank: boolean = true;
  public customDDO: CustomDDO = new CustomDDO();
  public currentYear: number;
  constructor(
    public breadcrumbsService: BreadcrumbsService,
    private confirmationService: ConfirmationService,
    public routeService: RouteService,
    private router: Router,
    public route: ActivatedRoute,
    public orderService: OrderService,
    private localStorageService: LocalStorageService,
    public paginationService: PaginationService,
    public labService: LabService) {
    this.paginationService.setDefaultPage();
  }
  ngOnInit() {
    this.user = this.localStorageService.getUserDetail();
    if (this.user.UserTypeId == 1) {
      this.orderFilter.NetworkType = 1;
    }
    if (this.user.UserTypeId == 2) {
      this.orderFilter.NetworkType = 2;
    }
    if (this.user.UserTypeId == 3) {
      this.orderFilter.NetworkType = 5;
    }
    if (this.user.UserTypeId == 4 || this.user.UserTypeId == 5) {
      this.orderFilter.NetworkType = 5;
      this.salesOfficeLogin = true;
    }

    var year = new Date();
    this.currentYear = year.getFullYear() + 10;
    this.patientId = this.route.snapshot.params['id'];
    this.getOrderList();
    this.getLabDDO();
    this.getOrderStatusDDO();
    this.selectSearchDate();
    this.getPracticeDDO();
    this.breadcrumbsService.breadcrumbs = 'Dashboard / Search Orders';
    this.orderSearchModel = this.route.snapshot.queryParams;
    this.isParamObjBlank = this.isEmptyObject(this.orderSearchModel);
    if (!this.isParamObjBlank) {
      this.orderFilter.NetworkType = this.orderSearchModel.NetworkType;
      this.orderFilter.DateTypeSelect = this.orderSearchModel.DateTypeSelect;
      this.orderFilter.FromDate = this.orderSearchModel.FromDate;
      this.orderFilter.ToDate = this.orderSearchModel.ToDate;
      this.orderFilter.PreferredLabId = this.orderSearchModel.PreferredLabId;
      this.insuranceNameObj = this.orderSearchModel.insuranceName;
      this.orderFilter.InsuranceCompanyId = this.orderSearchModel.insuranceId;
      this.testNameObj = this.orderSearchModel.testName;
      this.orderFilter.TestId = this.orderSearchModel.testCodeId;
      this.orderFilter.BillingLabId = this.orderSearchModel.BillingLabId;
      this.orderFilter.ProcessingLabId = this.orderSearchModel.ProcessingLabId;
      this.orderFilter.StatusId = this.orderSearchModel.StatusId;
      this.orderFilter.PracticeId = this.orderSearchModel.PracticeId;
      this.orderFilter.PatientName = this.orderSearchModel.PatientName;
      if (this.insuranceNameObj) {
        this.getInsuranceBySearch();
      }
      if (this.testNameObj) {
        this.getTestBysearch();
      }


    }
    this.SearchOrderByFilterObject();

    //  this.moduleAccess = this.localStorageService.getModuleAccessibilty('Role');
  }

  /* call to get List of all Order array */
  public getLabDDO(): void {
    this.labService.getLabsDDO().then(res => {
      this.billingLab = res.data;
      this.billingLab.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
      this.billingLab.splice(0, 0, { label: 'Any', value: null });
    });
  }
  public isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
  public getOrderStatusDDO(): void {
    this.orderService.getOrderStatusDDO().then(res => {
      this.OrderStatusDDO = res.data;
      this.OrderStatusDDO.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
      this.OrderStatusDDO.splice(0, 0, { label: 'Any', value: null });
    });
  }

  public getPracticeDDO(): void {
    this.orderService.getPracticeDDO().then(res => {
      this.PracticeDDO = res.data;
      this.PracticeDDO.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
      this.PracticeDDO.splice(0, 0, { label: 'Any', value: null });
    });
  }

  public pdfView(orderId): void {
    this.orderService.getPdfLink(orderId).then(res => {
      let link = res.data.PdfLink;
      window.open(link);
    });
  }

  public getInsuranceBySearch(): void {
    if (this.insuranceNameObj.length > 2) {
      this.orderService.getInsuranceBySearch(this.insuranceNameObj).then(res => {
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
  public getOrderList(): void {
    this.orderService.getList(this.paginationService.getParams()).then(res => {
      this.Order = res.data.Data;
      // this.totalRecords = res.data.TotalRecords;
    });
  }

  public getTestBysearch(): void {
    this.orderService.getTestBySearch(this.testNameObj).then(res => {
      this.testSuggestions = res.data;
      if (this.testSuggestions.length === 0) {
        this.errorMsg.push({
          severity: 'error',
          summary: 'Error Message', detail: 'Not a valid Test'
        });
        this.testNameObj = '';
      }
      if (this.testSuggestions.length == 1) {
        this.testNameObj = this.testSuggestions[0];
      }
    })
  }
  public selectSearchDate() {
    let date = new Date();
    if (this.orderFilter.DateTypeSelect == 1) {
      this.orderFilter.ToDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
      this.orderFilter.FromDate = this.orderFilter.ToDate;
    }
    if (this.orderFilter.DateTypeSelect == 2) {
      // this.orderFilter.ToDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
      let yesterdayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
      this.orderFilter.FromDate = this.datePipe.transform(yesterdayDate, 'MM/dd/yyyy');
      this.orderFilter.ToDate = this.orderFilter.FromDate;
    }
    if (this.orderFilter.DateTypeSelect == 3) {
      let today = date
      let day = today.getDay() || 7; // Get current day number, converting Sun. to 7
      if (day !== 1) {                // Only manipulate the date if it isn't Mon.
        today.setHours(-24 * (day - 1));   // Set the hours to day number minus 1
      }                               //   multiplied by negative 24
      this.orderFilter.ToDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
      // let lastWeekDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
      this.orderFilter.FromDate = this.datePipe.transform(today, 'MM/dd/yyyy');
    }
    if (this.orderFilter.DateTypeSelect == 4) {
      this.orderFilter.ToDate = '';
      this.orderFilter.FromDate = '';
    }
  }

  public onSystemNetworkSelect() {
    this.orderFilter.PreferredLabId = null;
    this.insuranceNameObj = '';
    this.orderFilter.BillingLabId = null;
    this.orderFilter.ProcessingLabId = null;
    this.orderFilter.StatusId = null;
    this.testNameObj = '';
    this.orderFilter.PatientName = '';
    this.orderFilter.PracticeId = null;
  }

  public SearchOrderByFilterObject() {
    if (this.orderFilter.DateTypeSelect == 4) {
      this.orderFilter.ToDate = this.datePipe.transform(this.orderFilter.ToDate, 'MM/dd/yyyy');
      this.orderFilter.FromDate = this.datePipe.transform(this.orderFilter.FromDate, 'MM/dd/yyyy');
    }
    if (this.insuranceNameObj) {
      this.orderFilter.InsuranceCompanyId = this.insuranceNameObj.Id;
    } else {
      this.orderFilter.InsuranceCompanyId = null;
    }
    if (this.testNameObj) {
      this.orderFilter.TestId = this.testNameObj.Id;
    } else {
      this.orderFilter.TestId = null;
    }
    let insuranceName: string = '';
    let insuranceId: number;
    let testCode: string = '';
    let testCodeId: number;
    if (this.insuranceNameObj) {
      insuranceName = this.insuranceNameObj.CompanyName;
      insuranceId = this.insuranceNameObj.Id;
    }
    if (this.testNameObj) {
      testCode = this.testNameObj.Code;
      testCodeId = this.testNameObj.Id;
    }
    if (!this.isParamObjBlank) {
      this.router.navigate(['/' + this.localStorageService.getModuleName() + '/order'],
        {
          queryParams: {
            NetworkType: this.orderFilter.NetworkType, DateTypeSelect: this.orderFilter.DateTypeSelect,
            FromDate: this.orderFilter.FromDate, ToDate: this.orderFilter.ToDate, PreferredLabId: this.orderFilter.PreferredLabId,
            insuranceName: insuranceName, insuranceId: insuranceId, BillingLabId: this.orderFilter.BillingLabId,
            ProcessingLabId: this.orderFilter.ProcessingLabId, StatusId: this.orderFilter.StatusId,
            PracticeId: this.orderFilter.PracticeId, testName: testCode, testCodeId: testCodeId, PatientName: this.orderFilter.PatientName
          }

        })
    }
    this.orderService.getOrderBySearchFilter(this.orderFilter).then(res => {
      this.Orders = res.data;
      this.totalRecords = res.data.length;
      this.isParamObjBlank = false;
      this.Orders.forEach(element => {
        element.OrderTests.forEach(object => {
          element.ProcessingLabs.forEach(item => {
            if (item.ProcessingLabId == object.ProcessingLabId) {
              return item.OrderTests.push(object)
            }
          })
        })
      });
    })

  }


  public addOrder() {
    this.routeService.openRoute('order/add');
  }

  /* view the row of single row */
  private viewOrder(id: number, orderNo: string) {
    let insuranceName: string = '';
    let insuranceId: number;
    let testCode: string = '';
    let testCodeId: number;
    if (this.insuranceNameObj) {
      insuranceName = this.insuranceNameObj.CompanyName;
      insuranceId = this.insuranceNameObj.Id;
    }
    if (this.testNameObj) {
      testCode = this.testNameObj.Code;
      testCodeId = this.testNameObj.Id;
    }
    let orderno = orderNo ? orderNo : 0;
    this.router.navigate(['/' + this.localStorageService.getModuleName() + '/order/' + id + '/' + orderno + '/view'],
      {
        queryParams: {
          NetworkType: this.orderFilter.NetworkType, DateTypeSelect: this.orderFilter.DateTypeSelect,
          FromDate: this.orderFilter.FromDate, ToDate: this.orderFilter.ToDate, PreferredLabId: this.orderFilter.PreferredLabId,
          insuranceName: insuranceName, insuranceId: insuranceId, BillingLabId: this.orderFilter.BillingLabId,
          ProcessingLabId: this.orderFilter.ProcessingLabId, StatusId: this.orderFilter.StatusId,
          PracticeId: this.orderFilter.PracticeId, testName: testCode, testCodeId: testCodeId, PatientName: this.orderFilter.PatientName
        }

      });
    // this.routeService.openRoute('order/' + id + '/' + orderno + '/view');
  }

  /* delete the row of single row */
  private deleteOrderById(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete',
      accept: () => {
        this.orderService.deleteOrderById(id).then(res => {
          this.getOrderList();
          this.errorMsg.push({
            severity: 'success',
            summary: 'Success Message', detail: 'Delete Successfully'
          });
        });
      },
      reject: () => {

      }
    });
  }
  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getOrderList();
  }
  /* call to sorting the grid data */
  onSorting(event) {
  }
  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getOrderList();
  }
}
