import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SetupModel } from './index';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from '../../../components/shared/models/base-data.model';
import { ApiUrl } from "../../../shared/api.service";
@Injectable()
export class SetupService {

  constructor(private http: Http) { }

  getSetups(params): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CompoundProfile/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }

  public getCompoundProfileById(patientId): Promise<ObjectResponseModel<SetupModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CompoundProfile/' + patientId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<SetupModel>>(promise);
  }

  // public getRelationshipList(): Promise<ObjectResponseModel<BaseDataModel<any>>> {
  //   let promise = this.http
  //     .get('http://54.209.170.251:5002/api/RelationshipList/list')
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  // }

  saveSetup(data): Promise<PostObjectResponseModel<SetupModel>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'Setup',  JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<SetupModel>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'Setup', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<SetupModel>>(promise);
    }
  }

  public deleteSetupById(Id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'CompoundProfile/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
}
