import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserModel, SalesOfficeModel } from './user.model';
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
export class UserService {

  constructor(private http: Http) { }

  getUsers(params, userTypeId: number, LinkedTableId: number): Promise<ObjectResponseModel<BaseDataModel<UserModel>>> {
    let url = ApiUrl.MAIN_URI + 'SetupUser/list/' + userTypeId + '/' + LinkedTableId;
    // if (practiceId !== 0) {
    //   url = ApiUrl.MAIN_URI + 'SetupUser/list/' + userTypeId + '/' + labId + '/' + practiceId;
    // }
    let promise = this.http
      .get(url, { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<UserModel>>>(promise);
  }

  getInsuranceDDO(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  public getUserById(UserId): Promise<ObjectResponseModel<UserModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SetupUser/' + UserId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<UserModel>>(promise);
  }

  public getUserByLabId(UserId, labId): Promise<ObjectResponseModel<UserModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SetupUser/' + UserId + '/' + labId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<UserModel>>(promise);
  }

  saveUser(data): Promise<PostObjectResponseModel<UserModel>> {
    let url = ApiUrl.MAIN_URI + 'SetupUser';
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
    return new PromiseHandler<ObjectResponseModel<UserModel>>(promise);
  }

  deleteUserById(Id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'SetupUser/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  getRoleDDOs(userTypeId:number): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SetupUser/Role/' + userTypeId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }

  getSalesOffices(searchText: string, userTypeId: number): Promise<ArrayResponseModel<SalesOfficeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SalesOffice/searchSalesOfficeWithLab?codeOrName=' + searchText);
    if (userTypeId == 1) {
      promise = this.http
        .get(ApiUrl.MAIN_URI + 'SalesOffice/searchSalesOfficeForAdmin?codeOrName=' + searchText);
    }
    return new PromiseHandler<ArrayResponseModel<SalesOfficeModel>>(promise.toPromise());
  }
}
