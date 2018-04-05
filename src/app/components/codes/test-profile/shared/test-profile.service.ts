import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { BillingCodeModel , ICDCodeModel } from './index';
// import { CustomDDO } from './../../shared/models/custom-ddo.model';
import { TestProfileModel, TestProfileItemModel, TestProfileCPTICDMappingModel } from '../shared/test-profile.model'

import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from '../../../../components/shared/models/base-data.model';
import { ApiUrl } from '../../../../shared/api.service';
@Injectable()
export class TestProfileService {

  constructor(private http: Http) { }

  getTestProfiles(params): Promise<ObjectResponseModel<BaseDataModel<TestProfileModel>>> {
    let url;
    url = 'TestProfile/list';
    let promise = this.http
      .get(ApiUrl.MAIN_URI + url, { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<TestProfileModel>>>(promise);
  }

  public getTestProfileDDO(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestProfile/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }

  public getTestProfileById(id: number): Promise<ObjectResponseModel<TestProfileModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestProfile/find/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<TestProfileModel>>(promise);
  }

  saveTestProfile(data): Promise<PostObjectResponseModel<TestProfileModel>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'TestProfile', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<TestProfileModel>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'TestProfile', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<TestProfileModel>>(promise);
    }
  }

  public deleteTestProfileById(id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'TestProfile/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }


}
