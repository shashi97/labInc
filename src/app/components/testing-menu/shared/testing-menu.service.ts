import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TestingMenuModel } from './index';
import {DrugFamilyModel} from '../drug-family/shared/drug-family.model'
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
export class TestingMenuService {

  constructor(private http: Http) { }

  getTestingMenu(params): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestingMenu/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }

  public getTestingMenuById(Id: number): Promise<ObjectResponseModel<TestingMenuModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestingMenu/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<TestingMenuModel>>(promise);
  }

  // public getRelationshipList(): Promise<ObjectResponseModel<BaseDataModel<any>>> {
  //   let promise = this.http
  //     .get('http://54.209.170.251:5002/api/RelationshipList/list')
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  // }

  saveTestingMenu(data): Promise<PostObjectResponseModel<TestingMenuModel>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'TestingMenu',  JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<TestingMenuModel>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'TestingMenu', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<TestingMenuModel>>(promise);
    }
  }

  public deleteTestingMenuById(Id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'TestingMenu/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  getBillingCode(params): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestCodeMapping/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }

  saveBillingCode(data): Promise<PostObjectResponseModel<TestingMenuModel>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'TestCodeMapping',  JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<TestingMenuModel>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'TestCodeMapping', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<TestingMenuModel>>(promise);
    }
  }

    public getBillingCodeById(id: number): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestCodeICDMapping/find/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  public GetTestClassTypeDDO(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestClassType/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  public GetTestModalityDDO(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'TestModality/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  getDrugFamilyDDO():Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'DrugFamily/ddo')
      .toPromise();
      return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  
  addTestingMenuFromExcel(file): Promise<PostObjectResponseModel<any>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'TestingMenu/checkPostFile', JSON.stringify(file))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);
  }
  addTestingMenuFromAfterCheckExcel(file): Promise<PostObjectResponseModel<any>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'TestingMenu/upload', JSON.stringify(file))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);
  }
  public deleteBillingCodeById(Id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'TestCodeMapping/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
}
