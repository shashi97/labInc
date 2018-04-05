import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { OrderModel, OrderDTOModel, NeoOrder } from './order.model';
import { DashboardModel } from '../../dashboard/shared/dashboard.model';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from './../../shared/models/base-data.model';

import { ICDCodesModel } from '../../codes/icdCodes/shared/icdCodes.model';
import { ApiUrl } from '../../../shared/api.service';


@Injectable()
export class OrderService {

  constructor(private http: Http) { }

  getList(params): Promise<ObjectResponseModel<BaseDataModel<OrderModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Order/list',
      { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<OrderModel>>>(promise);
  }
  public getOrderDetail(id): Promise<ObjectResponseModel<OrderModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Order/find/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<OrderModel>>(promise);
  }
  public getOrderViwDetail(id): Promise<ObjectResponseModel<OrderModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Order/view/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<OrderModel>>(promise);
  }

  public getOrderById(insuranceId): Promise<ObjectResponseModel<OrderModel>> {
    let promise = this.http
      .get(ApiUrl + 'InsuranceDetails/' + insuranceId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<OrderModel>>(promise);
  }

  getIcdCode(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'ICD10Code/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  getPrescribedMedicine(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PrescribedMedicine/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }


  getPhysician(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Physician/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  getGroupTest(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'GroupTest/ddobylab')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  getGroupTestByLabId(labId: number): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'GroupTest/ddobylabId/' + labId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  getInsuranceType(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceType/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  GetGroupTesteById(GroupTestId): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestingMenu/getddo/' + Number(GroupTestId))
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  GetGroupTesteByIdAndLabId(GroupTestId, labId): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestingMenu/getddoByLabId/' + Number(GroupTestId) + '/' + labId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  getPatientList(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Patient/getPatientList')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  getPatientListByPractice(practiceId: number): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Patient/getPatientListByPractice?practiceId=' + practiceId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  getScientistList(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Physician/scientist')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  getCaseTypeList(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CaseType/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  getAllByLabId(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CPTCode/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  getOrderLogs(orderNumber: string): Promise<ObjectResponseModel<NeoOrder>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Order/orderlog/' + orderNumber)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<NeoOrder>>(promise);
  }
  // public getRoleById(id: number): Promise<ObjectResponseModel<RoleModel>> {
  //   let promise = this.http
  //     .get('securityservice/Role/' + id)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<RoleModel>>(promise);
  // }

  saveOrder(data): Promise<PostObjectResponseModel<OrderModel>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'Order', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<OrderModel>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'Order', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<OrderModel>>(promise);
    }
  }

  saveSimulationOrder(data): Promise<PostObjectResponseModel<any>> {

    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'Order/simulateorder', JSON.stringify(data))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);

  }

  checkEligibility(data): Promise<PostObjectResponseModel<any>> {

    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'Order/checkeligibility', JSON.stringify(data))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);

  }

  updateOrderStatusAndLabId(data): Promise<PostObjectResponseModel<any>> {

    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'Order/updatebillinglab?orderId=' + data.OrderId + '&billingLabId=' + data.billingLabId, JSON.stringify(data))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);

  }
  public deleteOrderById(roleId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'Order/' + roleId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  public getInsuranceByPatientId(patientId: Number, insuranceTypeId: Number): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PatientInsurance/findInsurances/' + patientId + '/' + insuranceTypeId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }


  public getInsuranceBySearch(SearchString): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/searchByCodeOrName?codeOrName=' + SearchString)

      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  public getTestBySearch(SearchString): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CPTCode/searchByCodeOrName?codeOrName=' + SearchString)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  public getOrderStatusDDO(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'OrderStatus/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }

  public processProcessingLabId(id): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'OrderTest/findProcessingLab/' + Number(id))
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  saveOrderProcess(orderProcess, ContractLabId): Promise<PostObjectResponseModel<any>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'OrderTest/processProcessingLabId/' + ContractLabId, JSON.stringify(orderProcess))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<OrderModel>>(promise);
  }



  public getOrderBySearchFilter(data): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Order/labordersearch', { params: data })
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }



  getOrderDTOList(params): Promise<ObjectResponseModel<BaseDataModel<OrderDTOModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Lab/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<OrderDTOModel>>>(promise);
  }

  getPdfLink(orderId): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Order/ShowPdf/' + orderId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  public getPracticeDDO(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Practice/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }

  public getLabdashboard(params): Promise<ObjectResponseModel<DashboardModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Order/labdashboard', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<DashboardModel>>(promise);
  }

}
