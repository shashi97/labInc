import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { OrderService } from '../shared';
import { OrderModel, OrderTest, ProcessingLabDetail, OrderDTOModel } from '../shared/order.model';
import { Message } from 'primeng/primeng';
import { LocalStorageService } from '../../../core/shared/services/index';
import { LabService } from '../../lab/shared/lab.service';
@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})

export class OrderViewComponent implements OnInit {
  public user;
  private isParent: boolean = true;
  public errorMsg: Message[] = [];
  public isShowUpdate: boolean = false;
  public isSimulateSave: boolean = false;
  public simulationStep: Array<any> = [];
  public order: OrderModel = new OrderModel();
  public prescribeMedicine: Array<any> = [];
  public ICDCodes: Array<any> = [];
  public icdCoodes: string;
  public prescribedMedicine: string = '';
  public icdCodeLabel: string = '';
  public tests: Array<any> = [];
  public validites: Array<any> = [];
  public isShowProcess: boolean = false;
  public isSendProcessDone: boolean = false;
  public isShowOrder: boolean = false;
  public isShowOrderSimulation: boolean = false;
  public orderSearchModel;
  public ProcessingLabDetail: ProcessingLabDetail = new ProcessingLabDetail();
  private labContractId: number = 0;
  private contractLabId: number = 0;
  private orderState: string = '';
  constructor(public breadcrumbsService: BreadcrumbsService,
    private orderService: OrderService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private labService: LabService) { }

  ngOnInit() {
    this.labContractId = Number(this.route.snapshot.params['labContractId']) || 0;
    this.contractLabId = Number(this.route.snapshot.params['contractLabId']) || 0;
    this.orderSearchModel = this.route.snapshot.queryParams;
    this.getPrescribedMedicine();
    this.user = this.localStorageService.getUserDetail();
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Order / New';
    this.order.Id = this.route.snapshot.params['id'];
    this.orderState = this.route.snapshot.params['orderState'] || '';

    if (this.order.Id) {
      this.getOrderById(Number(this.order.Id));
    } else {
      this.getOrderById(0);
    }
  }
  public getPrescribedMedicine(): void {
    this.orderService.getPrescribedMedicine().then(medicine => {
      if (medicine.data.length > 0) {
        medicine.data.map(res => {
          this.prescribeMedicine.splice(this.prescribeMedicine.length, -1, { label: res.DrugName, value: res.Id })
        })
      }
      this.getIcdCode();
    })
  }

  private getOrderById(patientId) {
    this.orderService.getOrderViwDetail(patientId).then((result) => {
      this.order = result.data;
      if (this.labContractId > 0) {
        this.getLabName();
      } else {
        if (this.order.OrderNo) {
          this.breadcrumbsService.breadcrumbs = 'Search Orders / Order No. - ' + this.order.OrderNo;
        } else {
          this.breadcrumbsService.breadcrumbs = 'Search Orders / Draft ';
        }
      }
      this.getLabId();
    });
  }


  getLabName() {
    this.labService.getLabNameById(this.contractLabId).then((lab) => {
      this.breadcrumbsService.breadcrumbs = 'Lab Contract / ' + lab.data.Name + ' / Order No. -' + this.order.OrderNo;
    });
  }

  private getLabId(): void {
    this.isShowOrder = false;
    /** UserTypeId = 2 means, if you logged in from Lab then it will show process order screen */
    if (this.user.UserTypeId === 2 && this.order.BillingLabId === this.user.LabId) {
      this.isShowOrder = true;
    }
    this.showPrescribedMedicine();
  }

  public getIcdCode(): void {
    this.orderService.getIcdCode().then(res => {
      if (res.data.length > 0) {
        res.data.map(icd => {
          this.ICDCodes.splice(this.ICDCodes.length, -1, { label: icd.Code, value: icd.Id });
        })
      }
      this.getDefaultParams();
      // this.ICDCodes = res.data;
    })
  }

  editOrder() {
    this.routeService.openRoute('order/' + this.order.Id + '/edit');
  }

  public cancel(): void {
    if (this.labContractId !== 0 && this.contractLabId !== 0) {
      this.routeService.openRoute('labContract/' + this.labContractId + '/laborder/' + this.contractLabId);
    } else {
      let orderRoute = this.orderState === 'orderReview' ? ['/' + this.localStorageService.getModuleName() + '/order/orderReview']
        : ['/' + this.localStorageService.getModuleName() + '/order'];
      this.router.navigate(orderRoute,
        {
          queryParams: {
            NetworkType: this.orderSearchModel.NetworkType, DateTypeSelect: this.orderSearchModel.DateTypeSelect,
            FromDate: this.orderSearchModel.FromDate, ToDate: this.orderSearchModel.ToDate,
            PreferredLabId: this.orderSearchModel.PreferredLabId,
            insuranceName: this.orderSearchModel.insuranceName, BillingLabId: this.orderSearchModel.BillingLabId,
            ProcessingLabId: this.orderSearchModel.ProcessingLabId, StatusId: this.orderSearchModel.StatusId,
            PracticeId: this.orderSearchModel.PracticeId, insuranceId: this.orderSearchModel.insuranceId,
            testCodeId: this.orderSearchModel.testCodeId,
            testName: this.orderSearchModel.testName, PatientName: this.orderSearchModel.PatientName
          }
        });
    }
  }

  public showPrescribedMedicine(): void {
    if (this.prescribeMedicine.length !== 0) {
      // this.prescribedMedicine = '';
      this.prescribeMedicine.map(medicine => {
        this.order.PrescribedMedicines.map((prescribeMedicine, index) => {
          let commaSeperator = (index === this.order.PrescribedMedicines.length - 1) ? '' : ',  ';
          if (medicine.value === prescribeMedicine) {
            this.prescribedMedicine = this.prescribedMedicine.concat(medicine.label + commaSeperator);
          }
        })
      })
      this.showIcdCode();
    }

  }

  public showIcdCode(): void {
    if (this.ICDCodes.length !== 0) {
      // this.prescribedMedicine = '';
      this.ICDCodes.map(icd => {

        this.order.ICDCodes.map((icdCode, index) => {
          let commaSeperator = (index === this.order.ICDCodes.length - 1) ? '' : ',  ';
          if (icd.value === icdCode) {
            this.icdCodeLabel = this.icdCodeLabel.concat(icd.label + commaSeperator);
          }
        })
      })
    }
    this.showOrderTest();
  }

  public showOrderTest(): void {
    this.tests = [];
    this.validites = [];
    this.orderService.GetGroupTesteById(this.order.GroupTestId).then(res => {
      res.data.map((res1, index) => {
        if (Number(res1.Status) === 2 && res1.TestingType === 1) {
          this.tests.splice(this.tests.length, -1, res1.ItemName);
        }
        if (Number(res1.Status) === 1 && res1.TestingType === 1) {
          this.order.Tests.map(test => {
            if (test.TestId === res1.Id) {
              this.tests.splice(this.tests.length, -1, res1.ItemName);
            }
          });
        }
        if (Number(res1.Status) === 2 && res1.TestingType === 2) {
          this.validites.splice(this.validites.length, -1, res1.ItemName);
        }
        if (Number(res1.Status) === 1 && res1.TestingType === 2) {
          this.order.ValidationTests.map(validity => {
            if (validity.TestId === res1.Id) {
              this.validites.splice(this.validites.length, -1, res1.ItemName);
            }
          });
        }
      })
    });
  }

  public onLabProcess(): void {
    this.isShowProcess = false;
    this.isSendProcessDone = true;

    this.orderService.saveOrderProcess(this.ProcessingLabDetail.OrderTests, this.ProcessingLabDetail.ContractLabId).then(res => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.getPrescribedMedicine();
    })

  }

  public onSendForProcess() {

    this.orderService.processProcessingLabId(this.order.Id).then(res => {
      this.ProcessingLabDetail = res.data;
      //   this.ProcessingLabDetail.splice(this.ProcessingLabDetail.length,-1,res.data);
      this.isShowProcess = true;
    }).catch(err => {
      if (err.status === 204) {
        this.errorMsg.push({
          severity: 'info',
          summary: '', detail: 'No Lab found to process this Test'
        });
      }
    })

  }

  public runSimulation() {
    this.isShowOrderSimulation = false;
    this.orderService.saveSimulationOrder(this.order).then(res => {
      this.isShowOrderSimulation = true;
      this.simulationStep = res.data;
      this.isShowUpdate = this.simulationStep[this.simulationStep.length - 1].Labs.length === 0 ? false : true;
    });

  }

  public updateOrderView() {
    this.isParent = false
    if (!this.order.PrimaryPhysicianId) {
      this.order.PrimaryPhysicianId = 0;
    }
    this.orderService.saveOrder(this.order).then(res => {
      this.isShowOrderSimulation = false;
    })
  }


  setColor(item) {
    let style;
    style = {
      'background-color': item.Labs.length === 0 ? 'red' : 'white'
    }

    return style;
  }

  setLabelColor(item) {
    let style;
    style = {
      'color': item.Labs.length === 0 ? 'red' : 'black'
    }
    return style;
  }


}
