import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BillingCodeModel , ICDCodeModel } from './index';
import { CustomDDO } from './../../shared/models/custom-ddo.model';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from '../../../components/shared/models/base-data.model';
import { ApiUrl } from '../../../shared/api.service';
@Injectable()
export class BillingCodeService {

  constructor(private http: Http) { }

  getBillingCode(params, testMenuType): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'BillingCode/list/' + testMenuType, { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }

  public getTestingMenuDDO(): Promise<ArrayResponseModel<CustomDDO>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestingMenu/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<CustomDDO>>(promise);
  }
  
  public getTestingFilteredMenuDDO(billingId:number): Promise<ArrayResponseModel<CustomDDO>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestingMenu/ddobybillingcode/'+billingId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<CustomDDO>>(promise);
  }

  public getFilteredTestingMenuDDO(billingCodeMappingId:number): Promise<ArrayResponseModel<CustomDDO>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestingMenu/filteredDdo/'+billingCodeMappingId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<CustomDDO>>(promise);
  }

  public getGroupTestDDO(): Promise<ArrayResponseModel<CustomDDO>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'GroupTest/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<CustomDDO>>(promise);
  }
  public getGroupTestFilteredDDO(billingId:number): Promise<ArrayResponseModel<CustomDDO>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'GroupTest/ddobybillingcode/' +billingId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<CustomDDO>>(promise);
  }

  public getFilteredGroupTestDDO(billingCodeMappingId:number): Promise<ArrayResponseModel<CustomDDO>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'GroupTest/filteredDdo/'+billingCodeMappingId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<CustomDDO>>(promise);
  }
  
  public getBillingCodeById(Id: number): Promise<ObjectResponseModel<BillingCodeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'BillingCode/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BillingCodeModel>>(promise);
  }
  public getCPTCodeBySearch(SearchString: string): Promise<ArrayResponseModel<BillingCodeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CPTCode/ddo/autocomplete/' + SearchString)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<BillingCodeModel>>(promise);
  }
  public getICDCodeBySearch(SearchString: string): Promise<ArrayResponseModel<ICDCodeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'ICD10Code/search?code='+ SearchString)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<ICDCodeModel>>(promise);
  }

  // public getRelationshipList(): Promise<ObjectResponseModel<BaseDataModel<any>>> {
  //   let promise = this.http
  //     .get('http://54.209.170.251:5002/api/RelationshipList/list')
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  // }

  saveBillingCode(data): Promise<PostObjectResponseModel<BillingCodeModel>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'BillingCode', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<BillingCodeModel>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'BillingCode', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<BillingCodeModel>>(promise);
    }
  }

  public deleteBillingCodeById(Id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'BillingCode/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
}
