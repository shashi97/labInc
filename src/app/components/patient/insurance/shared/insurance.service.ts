import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { InsuranceModel } from './insurance.model';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from './../../../shared/models/base-data.model';

import { ApiUrl } from '../../../../shared/api.service';


@Injectable()
export class InsuranceService {

  constructor(private http: Http) { }
  // GET /api/PatientInsurance/list/{patientId}

  getInsuranceDDO(patientId): Promise<ObjectResponseModel<InsuranceModel[]>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PatientInsurance/patientInsuranceRecords/' + patientId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<InsuranceModel[]>>(promise);
  }
  getList(params,patientId): Promise<ObjectResponseModel<BaseDataModel<InsuranceModel>>> {
    let promise = this.http
    .get(ApiUrl.MAIN_URI + 'PatientInsurance/list/' + patientId , { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<InsuranceModel>>>(promise);
  }
  // getList(params , patientId): Promise<ObjectResponseModel<InsuranceModel[]>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'PatientInsurance/list/' + patientId , { params: params })
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<InsuranceModel[]>>(promise);
  // }

  public getInsuranceById(insuranceId): Promise<ObjectResponseModel<InsuranceModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PatientInsurance/' + insuranceId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<InsuranceModel>>(promise);
  }

  public getInsuranceCompany(): Promise<ObjectResponseModel<InsuranceModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<InsuranceModel>>(promise);
  }
  public getInsuranceCompanyById(Id: number): Promise<ObjectResponseModel<InsuranceModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<InsuranceModel>>(promise);
  }

  public getInsuranceType(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceType/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  saveInsurance(data): Promise<PostObjectResponseModel<InsuranceModel>> {
    let url = ApiUrl.MAIN_URI + 'PatientInsurance';
    let promise = null;
    if (data.Id > 0) {
      promise = this.http
        .put(url, JSON.stringify(data))
        .toPromise();
    } else {
      promise = this.http
        .post(url, JSON.stringify(data))
        .toPromise();
    }
    return new PromiseHandler<PostObjectResponseModel<InsuranceModel>>(promise);
  }

  public deleteRoleById(id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'PatientInsurance/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  public checkActiveInsuranceExist(id, patientId, insuranceTypeId): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PatientInsurance/checkActiveInsuranceExist/' + id + '/' + patientId + '/' + insuranceTypeId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
}
