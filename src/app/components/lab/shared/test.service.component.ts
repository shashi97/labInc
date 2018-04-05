import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TestSearchModel } from '../search-test/shared/shearc-test.model';
import { TestModel } from '../test/shared/test.model'

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
export class TestService {

  constructor(private http: Http) { }

  public getTests(data: string): Promise<ArrayResponseModel<TestSearchModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CPTCode/searchByCodeOrName?codeOrName=' + data)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<TestSearchModel>>(promise);
  } 

  public getLabTests(): Promise<ArrayResponseModel<TestModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabTest/list')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<TestModel>>(promise);
  }

  saveLabTests(data): Promise<PostObjectResponseModel<TestModel>> {
    let url = ApiUrl.MAIN_URI + 'LabTest';
    let promise = null;
    promise = this.http
      .post(url, JSON.stringify(data))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<TestModel>>(promise);
}
 
  public deleteLabTestById(id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'LabTest/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

}
