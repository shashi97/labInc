import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TestClass } from './test-class-type.model';
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
export class TestClassService {

  constructor(private http: Http) { }

 getTestClass(params): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestClassType/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }

  public getTestClassById(Id: number): Promise<ObjectResponseModel<TestClass>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestClassType/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<TestClass>>(promise);
  }

  // public getRelationshipList(): Promise<ObjectResponseModel<BaseDataModel<any>>> {
  //   let promise = this.http
  //     .get('http://54.209.170.251:5002/api/RelationshipList/list')
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  // }

  saveTestClass(data): Promise<PostObjectResponseModel<TestClass>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'TestClassType',  JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<TestClass>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'TestClassType', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<TestClass>>(promise);
    }
  }

  public deleteTestingMenuById(Id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'TestClassType/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
  
   addTestClassTypeFromExcel(file): Promise<PostObjectResponseModel<any>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'TestClassType/upload', JSON.stringify(file))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);
  }
}

