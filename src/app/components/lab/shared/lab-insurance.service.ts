import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { InsuranceCompanySearchModel } from '../insurance-company-search/shared/insurance-search.model';
import { LabInsuranceModel } from '../lab-insurance/shared/lab-insurance.model'
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
export class LabInsuranceService {

  constructor(private http: Http) { }

  public getInsuranceCompanyList(data: string): Promise<ArrayResponseModel<InsuranceCompanySearchModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/searchByCodeOrName?codeOrName=' + data)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<InsuranceCompanySearchModel>>(promise);
  }

  public searchInsuranceCompany(data: string): Promise<ObjectResponseModel<BaseDataModel<InsuranceCompanySearchModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabInsurance/searchInsurance?codeOrName=' + data)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<InsuranceCompanySearchModel>>>(promise);
  }

  public getLabInsuranceList(params): Promise<ObjectResponseModel<BaseDataModel<LabInsuranceModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabInsurance/list', { params: params })
      .toPromise();
    return new PromiseHandler<BaseDataModel<LabInsuranceModel>>(promise);
  }

   saveLabInsurance(data): Promise<PostObjectResponseModel<LabInsuranceModel>> {
    let url = ApiUrl.MAIN_URI + 'LabInsurance/saveList';
    let promise = null;
    promise = this.http
      .post(url, JSON.stringify(data))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<LabInsuranceModel>>(promise);
  }

  public deleteLabInsuranceById(id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'LabInsurance/delete/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
   public deleteSaleOfficeById(id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'SalesOfficeLab/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
}
