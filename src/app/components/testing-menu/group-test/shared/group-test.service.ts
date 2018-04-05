import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GroupTest, TestItem } from './group-test.model';
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
export class GroupTestService {

  constructor(private http: Http) { }

  getGroupTests(params): Promise<ObjectResponseModel<BaseDataModel<GroupTest>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'GroupTest/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<GroupTest>>>(promise);
  }

  // getGroupTestById(id): Promise<ObjectResponseModel<GroupTest>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'GroupTest/searchByLab/' + id)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<GroupTest>>(promise);
  // }

  getTestByQuery(queryString): Promise<ArrayResponseModel<TestItem>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestingMenu/searchByNameOrClass?nameOrClass=' + queryString)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<TestItem>>(promise);
  }

  getGroupTestById(id: number): Promise<ObjectResponseModel<GroupTest>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'GroupTest/find/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<GroupTest>>(promise);
  }

  saveGroupTest(data): Promise<PostObjectResponseModel<GroupTest>> {
    let url = ApiUrl.MAIN_URI + 'GroupTest';
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
    return new PromiseHandler<PostObjectResponseModel<GroupTest>>(promise);
  }

  public deleteGroupTestById(id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'GroupTest/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
}
