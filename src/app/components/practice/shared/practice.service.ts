import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PracticeModel, PracticeTypeModel } from './practice.model';
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
export class PracticeService {

  constructor(private http: Http) { }

  getPractices(params): Promise<ObjectResponseModel<BaseDataModel<PracticeModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Practice/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<PracticeModel>>>(promise);
  }
  getPracticesByLabId(labId, searchText): Promise<ArrayResponseModel<PracticeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Practice/search?labId=' + labId + '&codeOrName=' + searchText)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<PracticeModel>>(promise);
  }
  getInsuranceDDO(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  public getPracticeById(PracticeId): Promise<ObjectResponseModel<PracticeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Practice/' + PracticeId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<PracticeModel>>(promise);
  }

  savePractice(data): Promise<PostObjectResponseModel<PracticeModel>> {
    let url = ApiUrl.MAIN_URI + 'Practice';
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
    return new PromiseHandler<PostObjectResponseModel<PracticeModel>>(promise);
  }

  public deletePracticeById(roleId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'Practice/' + roleId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  getPracticeType(params): Promise<ObjectResponseModel<BaseDataModel<PracticeTypeModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PracticeType/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<PracticeTypeModel>>>(promise);
  }

  // public getInsuranceById(patientId): Promise<ObjectResponseModel<PracticeTypeModel>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'PracticeType/' + patientId)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<PracticeTypeModel>>(promise);
  // }

  savePracticeType(data): Promise<PostObjectResponseModel<PracticeTypeModel>> {
    let url = ApiUrl.MAIN_URI + 'PracticeType';
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
    return new PromiseHandler<PostObjectResponseModel<PracticeTypeModel>>(promise);
  }
  public deletePracticeTypeById(PracticeTypeId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'PracticeType/' + PracticeTypeId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
  public getPracticeTypesDDO(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PracticeType/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }

  public getLabDDOs(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'lab/labbysalesofficeddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }
  public getSrDDOs(id: number): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SalesRepresentative/ddo/' + id)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }
  // public getSrDDOsBySaleOfficeId(id:number): Promise<ArrayResponseModel<any>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'SalesRepresentative/ddo/'+id)
  //     .toPromise();
  //   return new PromiseHandler<ArrayResponseModel<any>>(promise);
  // }
  public getSODDOs(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SalesOffice/salesofficebylabddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }
  public findNPI(npi, Id): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Practice/findByNPI/' + Id + '/' + npi)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

}
