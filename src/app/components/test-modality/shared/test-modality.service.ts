import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TestModality } from './test-modality.model';
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
export class TestModalityService {

  constructor(private http: Http) { }

 getTestModulity(params): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestModality/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }

  public getTestModulityById(Id: number): Promise<ObjectResponseModel<TestModality>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestModality/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<TestModality>>(promise);
  }

  // public getRelationshipList(): Promise<ObjectResponseModel<BaseDataModel<any>>> {
  //   let promise = this.http
  //     .get('http://54.209.170.251:5002/api/RelationshipList/list')
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  // }

  saveTestModulity(data): Promise<PostObjectResponseModel<TestModality>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'TestModality',  JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<TestModality>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'TestModality', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<TestModality>>(promise);
    }
  }

  public deleteTestingMenuById(Id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'TestModality/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

   addTestModulityFromExcel(file): Promise<PostObjectResponseModel<any>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'TestModality/upload', JSON.stringify(file))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);
  }
}

