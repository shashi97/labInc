import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { InsuranceCompanyModel, InsuranceCompanyTypeModel, InsuranceCompanyState } from './insurance-company.model';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from './../../shared/models/base-data.model';

import { ApiUrl } from '../../../shared/api.service';


@Injectable()
export class InsuranceCompanyService {

  constructor(private http: Http) { }

  getInsurances(params): Promise<ObjectResponseModel<BaseDataModel<InsuranceCompanyModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<InsuranceCompanyModel>>>(promise);
  }

  public getInsuranceById(patientId): Promise<ObjectResponseModel<InsuranceCompanyModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/' + patientId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<InsuranceCompanyModel>>(promise);
  }

  public getRelationshipList(): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/list')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }

  saveInsurance(data): Promise<PostObjectResponseModel<InsuranceCompanyModel>> {
    let url = ApiUrl.MAIN_URI + 'InsuranceCompany';
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
    return new PromiseHandler<PostObjectResponseModel<InsuranceCompanyModel>>(promise);
  }
  saveInsuranceCompanyType(data): Promise<PostObjectResponseModel<InsuranceCompanyTypeModel>> {
    let url = ApiUrl.MAIN_URI + 'InsuranceCompanyType';
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
    return new PromiseHandler<PostObjectResponseModel<InsuranceCompanyTypeModel>>(promise);
  }


  saveInsuranceState(data): Promise<PostObjectResponseModel<InsuranceCompanyState>> {
    let url = ApiUrl.MAIN_URI + 'InsuranceCompanyState';
    let promise = null;

    promise = this.http
      .put(url, JSON.stringify(data))
      .toPromise();

    return new PromiseHandler<PostObjectResponseModel<InsuranceCompanyState>>(promise);
  }
  getInsurancesCompanyType(params): Promise<ObjectResponseModel<BaseDataModel<InsuranceCompanyTypeModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompanyType/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<InsuranceCompanyTypeModel>>>(promise);
  }

  public deleteInsuranceById(roleId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'InsuranceCompany/' + roleId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  public deleteInsuranceCompanyTypeById(insuranceCompanyTypeId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'InsuranceCompanyType/' + insuranceCompanyTypeId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
  addInsuranceCompanyFromExcel(file): Promise<PostObjectResponseModel<any>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'InsuranceCompany/validateExcelData', JSON.stringify(file))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);
  }
  addInsuranceCompanyAfterCheckExcel(file): Promise<PostObjectResponseModel<any>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'InsuranceCompany/upload', JSON.stringify(file))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);
  }

  public getInsuranceCompanyBySearch(SearchString: string): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/searchByCodeOrName?codeOrName=' + SearchString)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }
  getStatesByInsuranceId(insuranceId: number): Promise<ArrayResponseModel<InsuranceCompanyState>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompanyState/list/' + insuranceId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<ArrayResponseModel<InsuranceCompanyState>>>(promise);
  }
  getTradingPartnerDDOs(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TradingPartner/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<ArrayResponseModel<any>>>(promise);
  }
  getInsuranceCompany(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/ddo' )
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<ArrayResponseModel<any>>>(promise);
  }

    getInsuranceSimulation(insuranceSimulation): Promise<PostObjectResponseModel<any>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'LabInsurance/searchInsuranceSimulator',  (insuranceSimulation) )
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<PostObjectResponseModel<any>>>(promise);
  }

   getUtilizationProfileDDO(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'UtilizationProfile/ddo' )
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<ArrayResponseModel<any>>>(promise);
  }

}
