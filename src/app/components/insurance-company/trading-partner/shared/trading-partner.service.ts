import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TradingPartnerModel,TradingPartnerImportModel } from './trading-partner.model';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from '../../../shared/models/base-data.model';

import { ApiUrl } from '../../../../shared/api.service';


@Injectable()
export class TradingPartnerService {

  constructor(private http: Http) { }
  getTradingPartner(params): Promise<ObjectResponseModel<BaseDataModel<TradingPartnerModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TradingPartner/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<TradingPartnerModel>>>(promise);
  }
  getImportTradingPartner(): Promise<ArrayResponseModel<TradingPartnerImportModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TradingPartner/GetTradingPartners')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<TradingPartnerImportModel>>(promise);
  }

  // public getInsuranceById(patientId): Promise<ObjectResponseModel<PatientConditionModel>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'PatientCondition/' + patientId)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<PatientConditionModel>>(promise);
  // }
  public getInsuranceBySearch(SearchString): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/search/withouttradingpartner?codeOrName=' + SearchString)

      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  public getTradingPartnerBySearch(SearchString): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TradingPartner/search?name=' + SearchString)

      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  saveTradingPartner(data): Promise<PostObjectResponseModel<TradingPartnerModel>> {
    let url = ApiUrl.MAIN_URI + 'InsuranceCompany/updateTradingPartner';
    let promise = null; 
      promise = this.http
        .put(url, JSON.stringify(data))
        .toPromise();
    
    return new PromiseHandler<PostObjectResponseModel<TradingPartnerModel>>(promise);
  }

  saveImportedTradingPartners(data): Promise<PostObjectResponseModel<TradingPartnerModel>> {
    let url = ApiUrl.MAIN_URI + 'TradingPartner';
    let promise = null;
    promise = this.http
      .post(url, JSON.stringify(data))
      .toPromise();

    return new PromiseHandler<PostObjectResponseModel<TradingPartnerModel>>(promise);
  }
  public deleteTradingPartnerById(InsuranceCompanyId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'InsuranceCompany/unlinkTradingPartner/' + InsuranceCompanyId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
  public getTradingPartnerDDO(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TradingPartner/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }


}
